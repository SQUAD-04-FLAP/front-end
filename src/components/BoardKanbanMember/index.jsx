import { useEffect, useState, useMemo } from 'react';
import { Column } from '../../components/Column';
import { CardModal } from '../../components/CardModal';
import { DragDropContext } from '@hello-pangea/dnd';
import { FilterBoardMember } from '../../components/FilterBoardMember';
import { useKanbanMember } from '../../hooks/useKanbanMember';
import { FilterButton } from '../FilterButton';
import { moveTask } from '../../services/tasks';
import { useAuth } from '../../hooks/useAuth';
import { ButtonAddNewList } from '../ButtonAddNewList';

export function BoardKanbanMember() {
  const { state, dispatch } = useKanbanMember();
  const [columns, setColumns] = useState([]);
  const [taskFilters, setTaskFilters] = useState(null);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const loading = state.loading;

  // Aplica os filtros antes de agrupar
  const filteredTasks = useMemo(() => {
    if (!state.tasks || state.tasks.length === 0) return [];
    if (!taskFilters) return state.tasks;
    return applyFilters(state.tasks, taskFilters);
  }, [state.tasks, taskFilters]);

  useEffect(() => {
    // Quando tasks ou status mudarem, recria as colunas com as tarefas filtradas
    if (filteredTasks.length > 0 && state.selectedBoardStatus?.length > 0) {
      const grouped = groupTasksByStatus(filteredTasks, state.selectedBoardStatus);
      setColumns(grouped);
    } else {
      setColumns([]);
    }
  }, [filteredTasks, state.selectedBoardStatus]);

  const handleCardClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const taskId = parseInt(draggableId);
    const task = state.tasks.find((t) => t.idTarefa === taskId);
    if (!task) return;

    if (task.idQuadro.toString() !== state.selectedBoard) {
      console.warn("Tentativa de mover tarefa para outro quadro — bloqueado.");
      return;
    }

    // Atualiza localmente para feedback rápido
    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((c) => ({ ...c, tasks: [...c.tasks] }));
      const sourceCol = newColumns.find((c) => c.id === source.droppableId);
      const destCol = newColumns.find((c) => c.id === destination.droppableId);
      if (!sourceCol || !destCol) return prevColumns;

      const [movedCard] = sourceCol.tasks.splice(source.index, 1);
      destCol.tasks.splice(destination.index, 0, movedCard);
      return newColumns;
    });

    const destinationStatus = state.selectedBoardStatus.find(
      (s) => s.id.toString() === destination.droppableId
    );
    if (!destinationStatus) return;

    try {
      await moveTask(taskId, destinationStatus.id, user.idUsuario);
      dispatch({
        type: "UPDATE_TASK_STATUS",
        payload: {
          id: taskId,
          statusId: destinationStatus.id,
          statusName: destinationStatus.nome,
        },
      });
    } catch (error) {
      console.error("Falha ao mover tarefa:", error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <main className="px-6 py-6">
        {/* Header e filtros */}
        <div className="flex flex-wrap items-center justify-center md:justify-around gap-4 md:gap-0 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {state.selectedBoardName || "Quadro Kanban"}
          </h1>
          <div className='flex gap-4'>
            <FilterBoardMember
              onFilter={(value) =>
                dispatch({ type: "SET_QUADRO_FILTER", payload: value })
              }
            />
            <FilterButton
              onApplyFilters={(filters) => setTaskFilters(filters)}
              onClearFilters={() => setTaskFilters(null)}
            />
          </div>
        </div>

        {/* Corpo principal */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="overflow-x-auto">
            <div className="flex justify-center gap-4 min-w-max pb-4">
              
              {/* 🔹 Loading */}
              {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : columns.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 w-full py-20">
                  Não foi encontrada nenhuma tarefa.
                </div>
              ) : (
                <>
                  {columns.map((column) => (
                    <Column
                      key={column.id}
                      data={column}
                      onCardClick={handleCardClick}
                    />
                  ))}
                  <ButtonAddNewList />
                </>
              )}
            </div>
          </div>
        </DragDropContext>
      </main>

      <CardModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
      />
    </section>
  );
}

function applyFilters(tasks = [], filters = {}) {
  if (!filters || Object.keys(filters).length === 0) return tasks;

  const now = new Date();
  const normalize = (str = "") => String(str || "").toLowerCase();

  return tasks.filter((t) => {
    // fields normalization
    const title = normalize(t.titulo);
    const description = normalize(t.descricao);
    const status = normalize(t.nomeStatus);
    // const createdAt = parseDateSafe(t.dtCreated || t.createdAt);
    const dtTermino = parseDateSafe(t.dtTermino);
    // last activity fallback (some tasks may not have last update; use created/updated/term)
    const lastActivity = parseDateSafe(t.dtUpdated || t.updatedAt || t.dtTermino || t.createdAt);

    // 1) keyword/search
    if (filters.search && filters.search.trim() !== "") {
      const q = normalize(filters.search.trim());
      if (!(title.includes(q) || description.includes(q) || (t.nomeCriadoPor && normalize(t.nomeCriadoPor).includes(q)))) {
        return false;
      }
    }

    // 2) members: noMembers or selectedUsers
    const responsaveis = Array.isArray(t.responsaveis) ? t.responsaveis : (t.responsaveis ? [t.responsaveis] : []);
    // try to extract user ids or names from responsaveis entries
    const responsaveisIds = responsaveis.map(r => {
      if (!r) return null;
      if (typeof r === "number" || typeof r === "string") return String(r);
      if (r.idUsuario) return String(r.idUsuario);
      if (r.id) return String(r.id);
      return null;
    }).filter(Boolean);
    const responsaveisNames = responsaveis.map(r => {
      if (!r) return "";
      if (typeof r === "string") return r;
      return (r.nome || r.name || "").toString().toLowerCase();
    });

    if (filters.noMembers) {
      if (responsaveis && responsaveis.length > 0) return false;
    }

    if (filters.selectedUsers && filters.selectedUsers.length > 0) {
      // match if any selectedUser is present in task responsaveis (by id or name)
      const found = filters.selectedUsers.some(su => {
        const suStr = String(su);
        if (responsaveisIds.includes(suStr)) return true;
        // also check names
        return responsaveisNames.some(n => n.includes(suStr.toLowerCase()));
      });
      if (!found) return false;
    }

  // 2.5) company / setor filter
  if (filters.company && filters.company.trim() !== "") {
    const taskCompany = normalize(t.nomeSetor);
    const filterCompany = normalize(filters.company);
    if (taskCompany !== filterCompany) return false;
  }
    // 3) status complete / not complete
    if (filters.isReady) {
      // consider completed if nomeStatus contains 'conclu' or 'complet'
      if (!(status.includes("conclu") || status.includes("complet"))) return false;
    }
    if (filters.noReady) {
      if (status.includes("conclu") || status.includes("complet")) return false;
    }

    // 4) date filters
    if (filters.noDate) {
      if (dtTermino) return false;
    }
    if (filters.overdue) {
      if (!dtTermino) return false;
      if (!(dtTermino < startOfDay(now))) return false;
    }
    if (filters.deliveryDay) {
      if (!dtTermino) return false;
      if (!withinDays(now, dtTermino, 1)) return false;
    }
    if (filters.deliveryWeek) {
      if (!dtTermino) return false;
      if (!withinDays(now, dtTermino, 7)) return false;
    }
    if (filters.deliveryMonth) {
      if (!dtTermino) return false;
      if (!withinDays(now, dtTermino, 30)) return false;
    }

    // 5) activity filters (usa lastActivity fallback)
    if (filters.activeLastWeek) {
      if (!lastActivity) return false;
      if (!withinDays(now, lastActivity, 7)) return false;
    }
    if (filters.activeLastTwoWeeks) {
      if (!lastActivity) return false;
      if (!withinDays(now, lastActivity, 14)) return false;
    }
    if (filters.activeLastFourWeeks) {
      if (!lastActivity) return false;
      if (!withinDays(now, lastActivity, 28)) return false;
    }
    if (filters.noActiveLastFourWeeks) {
      if (!lastActivity) return true; // if no activity at all, it matches "no activity"
      if (withinDays(now, lastActivity, 28)) return false; // has activity within 4 weeks => exclude
    }

    // se passou por todas as checagens, inclui
    return true;
  });
}

/* helpers */
function parseDateSafe(value) {
  if (!value) return null;
  // se já é Date
  if (value instanceof Date && !isNaN(value)) return value;
  // tenta parse em diversos formatos
  const d = new Date(value);
  if (!isNaN(d)) return d;
  // tenta trocar barras (dd/mm/yyyy)
  if (typeof value === "string" && value.includes("/")) {
    const parts = value.split("/");
    if (parts.length === 3) {
      const [dd, mm, yyyy] = parts;
      const out = new Date(`${yyyy}-${mm}-${dd}T00:00:00`);
      if (!isNaN(out)) return out;
    }
  }
  return null;
}
function startOfDay(d = new Date()) {
  const x = new Date(d);
  x.setHours(0,0,0,0);
  return x;
}
function withinDays(now, date, days) {
  if (!date) return false;
  const diff = date.getTime() - startOfDay(now).getTime();
  const ms = days * 24 * 60 * 60 * 1000;
  return diff >= 0 && diff <= ms;
}

/* ------------------------- agrupamento (mantido) ------------------------- */

// 🔹 Agrupa tarefas por status
function groupTasksByStatus(tasks, boardStatus) {
  if (!boardStatus || boardStatus.length === 0) return [];

  const orderedStatus = [...boardStatus].sort((a, b) => a.ordem - b.ordem);
  return orderedStatus.map((s) => ({
    id: s?.id ? s.id.toString() : "",
    name: s.nome,
    colorDot: getStatusColor(s.nome),
    tasks: tasks
      .filter((t) => t.idStatus === s.id)
      .map((t) => ({
        id: t.idTarefa?.toString(),
        title: t.titulo,
        description: t.descricao || "",
        dtTermino: t.dtTermino ? new Date(t.dtTermino).toLocaleDateString("pt-BR") : "",
        comments: t.comentarios?.length || 0,
        assigneeAvatar: t.nomeResponsavel,
        prioridade: t.prioridade || "",
        status: t.nomeStatus,
        idQuadro: t.idQuadro,
        dtCreated: t.createdAt,
        isActive: t.ativo,
        nomeCriadoPor: t.nomeCriadoPor,
        responsaveis: t.responsaveis,
        nomeSetor: t.nomeSetor,
      })),
  }));
}

function getStatusColor(nome) {
  const lower = (nome || "").toLowerCase();
  if (lower.includes("a fazer")) return "bg-amber-500";
  if (lower.includes("em progresso")) return "bg-sky-500";
  if (lower.includes("concluído") || lower.includes("conclu")) return "bg-emerald-500";
  return "bg-gray-400";
}
