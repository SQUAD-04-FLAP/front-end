import { useFilter } from '../../hooks/useFilter';

export function BreadcrumbFramer() {
  const { state, dispatch } = useFilter();
  const { framers, isLoading, selectedFramerId } = state;

  const handleSelectFramer = (idQuadro) => {
    dispatch({ type: "SET_SELECTED_FRAMER", payload: idQuadro });
  };

  return (
    <ul className="flex space-x-4 p-4 items-center">
      {isLoading ? (
        <li className="text-slate-500 dark:text-slate-400 text-base font-medium">Carregando quadros...</li>
      ) : framers.length === 0 ? (
        <li className="text-slate-500 dark:text-slate-400 text-base font-medium">Nenhum quadro encontrado</li>
      ) : (
        framers.map((quadro, index) => (
          <li
            key={quadro.idQuadro}
            className={`flex items-center space-x-2 cursor-pointer ${
              selectedFramerId === quadro.idQuadro
                ? "font-semibold text-blue-600 dark:text-blue-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
            onClick={() => handleSelectFramer(quadro.idQuadro)}
          >
            <span>{quadro.nome}</span>
            {index < framers.length - 1 && (
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">/</span>
            )}
          </li>
        ))
      )}
    </ul>
  );
}


