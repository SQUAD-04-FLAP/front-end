import { getUserPhoto } from "../../utils/getUserPhoto";

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

      {task.nomeSetor && (
      <span
        className="text-[11px] font-medium px-2 py-1 rounded-md bg-indigo-100 
                  text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300
                  inline-block mb-3"
      >
        {task.nomeSetor}
      </span>
    )}

      {/* Criador da tarefa */}
      {task.nomeCriadoPor && (
        <div className="flex items-center gap-3 mb-4">
          <img
            src={
              getUserPhoto({nome: task.nomeCriadoPor, fotoUrl: task.fotoCriadoPor}) ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(task.nomeCriadoPor)}&background=0D8ABC&color=fff`
            }
            alt="creator"
            className="w-9 h-9 rounded-full object-cover shadow-sm ring-2 ring-gray-200 dark:ring-gray-700"
          />

          <div className="flex flex-col leading-tight">
            <span className="text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Criado por
            </span>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {task.nomeCriadoPor.split(' ')[0]}
            </span>
          </div>
        </div>
      )}   

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        {task.description}
      </p>

      {/* Responsáveis */}
      {task.responsaveis && task.responsaveis.length > 0 && (
        <div className="flex -space-x-2 rtl:space-x-reverse">
          {task.responsaveis.map((responsavel) => (
            <div key={responsavel.idUsuario} className="relative group">
              <img
                className="w-8 h-8 object-cover border-2 border-white rounded-full shadow-sm transition-transform transform hover:scale-110"
                src={getUserPhoto(responsavel) || `https://ui-avatars.com/api/?name=${responsavel.nome}&size=64`}
                alt={responsavel.nome}
              />
              {/* Tooltip */}
              <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {responsavel.nome}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex items-center gap-2">
          {task.assigneeAvatar && (
            <img
              src={getUserPhoto({ nome: task.nomeCriadoPor, photoUrl: task.fotoCriadoPor })}
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
