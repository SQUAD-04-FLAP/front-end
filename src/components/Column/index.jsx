import { Card } from '../Card';

export function Column({ data, onCardClick }) {
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

      <div className="mt-3 space-y-3">
        {data.tasks.map((task) => (
          <Card key={task.id} task={task} onClick={onCardClick} />
        ))}
      </div>

      <button className="mt-4 w-full text-center text-sm font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition">
        Novo Card
      </button>
    </section>
  );
}
