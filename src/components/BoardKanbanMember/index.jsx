import { useEffect, useState } from 'react';
import { Column } from '../../components/Column';
import { CardModal } from '../../components/CardModal';
import { DragDropContext } from '@hello-pangea/dnd';
import { FilterSectorMember } from '../../components/FilterSectorMember';
import { FilterBoardMember } from '../../components/FilterBoardMember';
import { useKanbanMember } from '../../hooks/useKanbanMember';

export function BoardKanbanMember() {
  const { state, dispatch } = useKanbanMember();
  const [columns, setColumns] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(state);

  // Atualiza colunas quando tasks mudarem
  useEffect(() => {
    if (state.tasks.length > 0) {
      const grouped = groupTasksByStatus(state.tasks);
      setColumns(grouped);
    }
  }, [state.tasks]);

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

  // 1 Buscar tarefa localmente
  const task = state.tasks.find(t => t.idTarefa === taskId);
  if (!task) return;

  if (!task || task.idQuadro.toString() !== state.selectedBoard) {
    console.warn('Tentativa de mover tarefa para outro quadro — bloqueado.');
    return;
  }

  // 3️⃣ Atualizar localmente
  setColumns((prevColumns) => {
    const newColumns = prevColumns.map(c => ({ ...c, tasks: [...c.tasks] }));
    const sourceCol = newColumns.find(c => c.id === source.droppableId);
    const destCol = newColumns.find(c => c.id === destination.droppableId);
    const [movedCard] = sourceCol.tasks.splice(source.index, 1);
    destCol.tasks.splice(destination.index, 0, movedCard);
    return newColumns;
  });

  // Essa parte está comentada, mas será trabalhada melhor ainda

  // const statusIdMap = {
  //   todo: 1,
  //   doing: 2,
  //   review: 3,
  //   done: 4,
  // };

  // const newStatusId = statusIdMap[destination.droppableId];

  // try {
  //   await moveTask(taskId, newStatusId, user.idUsuario);
  //   dispatch({
  //     type: 'UPDATE_TASK_STATUS',
  //     payload: { id: taskId, status: destination.droppableId },
  //   });
  // } catch (error) {
  //   console.error('Falha ao mover tarefa:', error);
  // }
};


  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <main className="px-6 py-6">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 md:gap-0 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Quadro Kanban
          </h1>
          <div className="flex items-center gap-2">
            <FilterSectorMember
              onFilter={(value) =>
                dispatch({ type: "SET_SETOR_FILTER", payload: value })
              }
            />
            <FilterBoardMember
              onFilter={(value) =>
                dispatch({ type: "SET_QUADRO_FILTER", payload: value })
              }
            />
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

// 🔸 Função auxiliar para agrupar tarefas por status
function groupTasksByStatus(tasks) {
  const statusMap = {
    'A Fazer': 'todo',
    'Em Andamento': 'doing',
    'Em Revisão': 'review',
    'Concluído': 'done',
  };

  const statusColumns = [
    { id: 'todo', name: 'Fazer', colorDot: 'bg-amber-500' },
    { id: 'doing', name: 'Em Andamento', colorDot: 'bg-sky-500' },
    { id: 'review', name: 'Revisão', colorDot: 'bg-fuchsia-500' },
    { id: 'done', name: 'Concluído', colorDot: 'bg-emerald-500' },
  ];

  return statusColumns.map((col) => ({
    ...col,
    tasks: tasks
      .filter((t) => statusMap[t.nomeStatus] === col.id)
      .map((t) => ({
        id: t.idTarefa.toString(),
        title: t.titulo,
        description: t.descricao || '',
        date: t.prazo ? new Date(t.prazo).toLocaleDateString('pt-BR') : '',
        comments: t.comentarios?.length || 0,
        assigneeAvatar: t.assigneeAvatar || "img/profile-default.jpg",
        priority: 'Média',
        idQuadro: t.idQuadro, // importante p/ validação
      })),
  }));
}
