import { AdminSidebar } from '../../../components/AdminSidebar';
import { Plus, Filter, MessageCircle, Paperclip } from 'lucide-react';
import { ListSectors } from '../../../components/ListSectors';
import { FilterSectors } from '../../../components/FilterSectors';
import { BreadcrumbFramer } from '../../../components/BreadcrumbFramer';
import { BoardKanbanAdm } from '../../../components/BoardKanbanAdm';

export default function AdminKanban() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <AdminSidebar />
      
      {/* CONTEÚDO PRINCIPAL COM FUNDO FORÇADO */}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative z-0">
        <div className="p-6 bg-gray-50 dark:bg-gray-900">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Quadro Kanban
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gerencie as tarefas do seu time de forma visual
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FilterSectors />
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition">
                Ordenar
              </button>
            </div>
          </div>

          {/* Setores */}
          <ListSectors />

          {/* Nome dos quadros */}
          <BreadcrumbFramer />

          {/* Kanban Board */}
          <BoardKanbanAdm />
        </div>
      </div>
    </div>
  );
}
