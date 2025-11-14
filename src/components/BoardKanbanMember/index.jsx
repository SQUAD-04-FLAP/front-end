import { useEffect, useState } from 'react';
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
  // const columnsState = groupTasksByStatus(state.tasks, state.selectedBoardStatus);
  const [loading, setLoading] = useState(true);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  console.log(state);

  useEffect(() => {
    // Quando tasks ou status mudarem, recria as colunas
    if (state.tasks.length > 0 && state.selectedBoardStatus?.length > 0) {
      const grouped = groupTasksByStatus(state.tasks, state.selectedBoardStatus);
      setColumns(grouped);
      // pequeno delay para evitar flicker visual
      setTimeout(() => setLoading(false), 300);
    } else {
      setColumns([]);
      setLoading(false);
    }
  }, [state.tasks, state.selectedBoardStatus]);

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
            <FilterButton />
          </div>
        </div>

        {/* Corpo principal */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="overflow-x-auto">
            <div className="flex justify-center gap-4 min-w-max pb-4">
              
              {/* 🔹 Loading */}
              {loading ? (
                <div className="text-center text-gray-500 dark:text-gray-400 w-full py-20">
                  Carregando colunas...
                </div>
              ) : columns.length === 0 || columns.every(col => col.tasks.length === 0) ? (
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

// 🔹 Agrupa tarefas por status
function groupTasksByStatus(tasks, boardStatus) {
  if (!boardStatus || boardStatus.length === 0) return [];

  const orderedStatus = [...boardStatus].sort((a, b) => a.ordem - b.ordem);
  return orderedStatus.map((s) => ({
    // id: s.id.toString(),
    id: s?.id ? s.id.toString() : "",
    name: s.nome,
    colorDot: getStatusColor(s.nome),
    tasks: tasks
      .filter((t) => t.idStatus === s.id)
      .map((t) => ({
        id: t.idTarefa.toString(),
        title: t.titulo,
        description: t.descricao || "",
        date: t.prazo ? new Date(t.prazo).toLocaleDateString("pt-BR") : "",
        comments: t.comentarios?.length || 0,
        assigneeAvatar: t.assigneeAvatar || "img/profile-default.jpg",
        priority: "Média",
        idQuadro: t.idQuadro,
      })),
  }));
}

function getStatusColor(nome) {
  const lower = nome.toLowerCase();
  if (lower.includes("backlog")) return "bg-amber-500";
  if (lower.includes("desenvolvimento")) return "bg-sky-500";
  if (lower.includes("teste")) return "bg-fuchsia-500";
  if (lower.includes("concluído")) return "bg-emerald-500";
  return "bg-gray-400";
}
