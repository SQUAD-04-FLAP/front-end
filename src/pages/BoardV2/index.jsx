import { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Column } from '../../components/Column';
import { CardModal } from '../../components/CardModal';
import { boardData } from './data/mockData';

export default function BoardV2() {
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

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="ml-0 md:ml-60">
        {/* Conteúdo Principal */}
        <main className="px-6 py-6">
          {/* Cabeçalho da Página */}
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

          {/* Grid de Colunas do Kanban */}
          <div className="overflow-x-auto">
            <div className="flex gap-4 min-w-max pb-4">
              {boardData.columns.map((column) => (
                <Column key={column.id} data={column} onCardClick={handleCardClick} />
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      <CardModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
      />
    </section>
  );
}
