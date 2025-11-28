import { Card } from '../Card';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { X, Pencil } from 'lucide-react';
import { useKanbanMember } from '../../hooks/useKanbanMember';
import { toast } from 'react-toastify';
import { Dialog } from '../Dialog';
import { showMessage } from '../../adapters/showMessage';
import { ButtonEditStatusFramer } from '../ButtonEditStatusFramer';
import { RouterLinks } from '../RouterLinks';

export function Column({ data, onCardClick }) {
  const { delete_status } = useKanbanMember();

   const handleDeleteStatus = async (id) => {
    toast(Dialog, {
      data: "Tem certeza que deseja excluir este status?",
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      onClose: async (confirmation) => {
        if (confirmation) {
          try {
            await delete_status(id);
            showMessage.success("Status excluído com sucesso!", true);
          } catch (error) {
            console.error("[QuadroService] Erro ao excluir status:", error);
            showMessage.error("Não foi possível fazer a exclusão. Verifique se há tarefas associadas.");
          }
        }
      },
    });
  };

  return (
    <section className="w-80 flex-shrink-0">
      <header className="flex justify-between items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
        <div className='flex items-center gap-2'>
        <span className={`w-2 h-2 rounded-full ${data.colorDot}`} />
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {data.name}
        </h3>
        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
          {/* {data.count} */}
          {data.tasks.length}
        </span>
      </div>

       <div>

       <ButtonEditStatusFramer status={data} />
      
        <button
        onClick={() => handleDeleteStatus(data.id)}
        className="p-2 rounded-full text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer shadow-sm"
        title="Excluir lista"
      >
        <X size={15} strokeWidth={2.2} />
      </button>
       </div>


      </header>

      <Droppable droppableId={data.id}>
        {(provided, ) => (
          <div
            className="mt-3 space-y-3 min-h-[50px]"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? 0.8 : 1,
                      transition: "opacity 0.2s",
                    }}
                  >
                    <Card task={task} onClick={onCardClick} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <RouterLinks
          href="/nova-tarefa"
          className="mt-4 w-full block text-center text-sm font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition"
        >
          Nova tarefa
      </RouterLinks>
    </section>
  );
}
