import { Card } from '../Card';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { useTask } from '../../hooks/useTask';

export function Column({ data, onCardClick }) {
  // const { state } = useTask();
  // console.log(state);

  return (
    <section className="w-80 flex-shrink-0">
      <header className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
        <span className={`w-2 h-2 rounded-full ${data.colorDot}`} />
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {data.name}
        </h3>
        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
          {data.count}
        </span>
      </header>

      <Droppable droppableId={data.id}>
        {(provided, ) => (
          <div
            className="mt-3 space-y-3 min-h-[50px]" // garante espaço para placeholder
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

      <button className="mt-4 w-full text-center text-sm font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition">
        Novo Card
      </button>
    </section>
  );
}
