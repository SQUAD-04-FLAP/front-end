import { useState } from 'react';
import { Column } from '../../components/Column';
import { CardModal } from '../../components/CardModal';
import { DragDropContext } from '@hello-pangea/dnd';
import { boardData } from './data/mockData';

export default function BoardV2() {
  const [columns, setColumns] = useState(boardData.columns);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // Nada mudou
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    setColumns((prevColumns) => {
      // Cria cópias das colunas para manter imutabilidade
      const newColumns = prevColumns.map(col => ({
        ...col,
        tasks: [...col.tasks],
      }));

      const sourceCol = newColumns.find(c => c.id === source.droppableId);
      const destCol = newColumns.find(c => c.id === destination.droppableId);

      // Remove o card da coluna de origem
      const [movedCard] = sourceCol.tasks.splice(source.index, 1);
      // Insere na coluna de destino
      destCol.tasks.splice(destination.index, 0, movedCard);

      return newColumns;
    });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <main className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Quadro Kanban
          </h1>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-gray-700 transition">
              Filtrar
            </button>
            <button className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-gray-700 transition">
              Ordenar
            </button>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="overflow-x-auto">
            <div className="flex gap-4 min-w-max pb-4">
              {columns.map((column) => (
                <Column key={column.id} data={column} onCardClick={handleCardClick} />
              ))}
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
