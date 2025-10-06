import { useFilter } from '../../hooks/useFilter';

export function BreadcrumbFramer() {
  const { state } = useFilter();
  const { framers, isLoading } = state;

  return (
    <ul className="flex space-x-4 p-4 items-center">
      {isLoading ? (
        // Estado de carregamento
        <li className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-base font-medium">
          <svg
            className="animate-spin h-5 w-5 text-slate-500 dark:text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span>Buscando quadro...</span>
        </li>
      ) : framers.length === 0 ? (
        <li className="text-slate-500 dark:text-slate-400 text-base font-medium">
          Nenhum quadro encontrado
        </li>
      ) : (
        // Exibição normal
        framers.map((quadro, index) => (
          <li key={quadro.id} className="flex items-center space-x-2">
            <span className="text-slate-500 dark:text-slate-400 text-base font-medium cursor-pointer">
              {quadro.nome}
            </span>
            {index < framers.length - 1 && (
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">/</span>
            )}
          </li>
        ))
      )}
    </ul>
  );
}
