import { useEffect, useState } from 'react';
import { Column } from '../../components/Column';
import { CardModal } from '../../components/CardModal';
import { DragDropContext } from '@hello-pangea/dnd';
import { FilterSectorMember } from '../../components/FilterSectorMember';
import { FilterBoardMember } from '../../components/FilterBoardMember';
import { useKanbanMember } from '../../hooks/useKanbanMember';
import { FilterButton } from '../FilterButton';
import {moveTask} from '../../services/tasks';
import { useAuth } from '../../hooks/useAuth';

export function BoardKanbanMember() {
  const { state, dispatch } = useKanbanMember();
  const [columns, setColumns] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
  if (state.tasks.length > 0 && state.selectedBoardStatus?.length > 0) {
    const grouped = groupTasksByStatus(state.tasks, state.selectedBoardStatus);
    setColumns(grouped);
  } else {
    setColumns([]);
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

  // Busca tarefa localmente
  const task = state.tasks.find((t) => t.idTarefa === taskId);
  if (!task) return;

  // Impede mover tarefa entre quadros diferentes
  if (task.idQuadro.toString() !== state.selectedBoard) {
    console.warn("Tentativa de mover tarefa para outro quadro — bloqueado.");
    return;
  }

  // Atualiza localmente para feedback instantâneo
  setColumns((prevColumns) => {
    const newColumns = prevColumns.map((c) => ({ ...c, tasks: [...c.tasks] }));
    const sourceCol = newColumns.find((c) => c.id === source.droppableId);
    const destCol = newColumns.find((c) => c.id === destination.droppableId);
    if (!sourceCol || !destCol) return prevColumns;

    const [movedCard] = sourceCol.tasks.splice(source.index, 1);
    destCol.tasks.splice(destination.index, 0, movedCard);
    return newColumns;
  });

  // 🔹 Pega o status real do backend com base no droppableId
  const destinationStatus = state.selectedBoardStatus.find(
    (s) => s.id.toString() === destination.droppableId
  );

  if (!destinationStatus) {
    console.error("Status de destino não encontrado:", destination.droppableId);
    return;
  }

  const newStatusId = destinationStatus.id;

  try {
    // Atualiza no backend
    await moveTask(taskId, newStatusId, user.idUsuario);

    // Atualiza no estado global
    dispatch({
      type: "UPDATE_TASK_STATUS",
      payload: {
        id: taskId,
        statusId: newStatusId,
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
        <div className="flex flex-wrap items-center justify-center md:justify-around gap-4 md:gap-0 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {state.selectedBoardName
              ? `${state.selectedBoardName}`
              : "Quadro Kanban"}
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

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="overflow-x-auto">
            <div className="flex justify-center gap-4 min-w-max pb-4">
              {columns.length === 0 || columns.every(col => col.tasks.length === 0) ? (
                <div className="text-center text-gray-500 dark:text-gray-400 w-full py-20">
                  Selecione um quadro ou setor para exibir as tarefas.
                </div>
              ) : (
                columns.map((column) => (
                  <Column
                    key={column.id}
                    data={column}
                    onCardClick={handleCardClick}
                  />
                ))
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

function groupTasksByStatus(tasks, boardStatus) {
  if (!boardStatus || boardStatus.length === 0) return [];

  // Ordena os status pela ordem definida no backend
  const orderedStatus = [...boardStatus].sort((a, b) => a.ordem - b.ordem);

  // Cria colunas dinamicamente com base nos status
  return orderedStatus.map((s) => ({
    id: s.id.toString(),
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

// Mapeamento opcional de cor por nome de status
function getStatusColor(nome) {
  const lower = nome.toLowerCase();
  if (lower.includes("backlog")) return "bg-amber-500";
  if (lower.includes("desenvolvimento")) return "bg-sky-500";
  if (lower.includes("teste")) return "bg-fuchsia-500";
  if (lower.includes("concluído")) return "bg-emerald-500";
  return "bg-gray-400";
}
