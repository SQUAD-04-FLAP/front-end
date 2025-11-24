export function Card({ task, onClick }) {
  const getPriorityClasses = (prioridade) => {
    switch (prioridade) {
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
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700 p-5 hover:shadow-xl transition-transform cursor-pointer hover:scale-[1.03]"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-gray-900 dark:text-gray-100 font-semibold text-lg leading-snug">
          {task.title}
        </h4>
        {task.prioridade && (
        <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getPriorityClasses(task.prioridade)}`}>
          {task.prioridade}
        </span>
      )}

      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        {task.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex items-center gap-2">
          {task.assigneeAvatar && (
            <img
              src={task.assigneeAvatar}
              alt="avatar"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-200 dark:ring-gray-700"
            />
          )}
          <span className="text-gray-700 dark:text-gray-200">{task.date}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 17a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/>
            </svg>
            <span>{task.comments}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 2H8a2 2 0 0 0-2 2v3H5a1 1 0 0 0-1 1v11.586A2 2 0 0 0 5.414 21L8 18.414V19a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
            </svg>
            <span>{task.attachments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
