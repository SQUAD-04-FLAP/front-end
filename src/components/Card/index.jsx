export function Card({ task, onClick }) {
  const getPriorityClasses = (priority) => {
    switch (priority) {
      case 'Alta':
        return 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300';
      case 'Média':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-300';
      case 'Baixa':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300';
      default:
        return '';
    }
  };

  return (
    <div 
      onClick={() => onClick(task)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/70 dark:border-gray-700 p-4 hover:shadow-md transition cursor-pointer hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between">
        <h4 className="text-gray-800 dark:text-gray-100 font-semibold leading-snug">
          {task.title}
        </h4>
        {task.priority && (
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${getPriorityClasses(task.priority)}`}>
            {task.priority}
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {task.description}
      </p>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          {task.assigneeAvatar && (
            <img
              src={task.assigneeAvatar}
              alt="avatar"
              className="w-6 h-6 rounded-full object-cover ring-1 ring-gray-200 dark:ring-gray-700"
            />
          )}
          <span>{task.date}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 17a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/>
            </svg>
            <span>{task.comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 2H8a2 2 0 0 0-2 2v3H5a1 1 0 0 0-1 1v11.586A2 2 0 0 0 5.414 21L8 18.414V19a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
            </svg>
            <span>{task.attachments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
