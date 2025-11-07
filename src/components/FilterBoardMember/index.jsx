import { useState, useEffect } from "react";
import { useKanbanMember } from "../../hooks/useKanbanMember";
import { ChevronDown } from "lucide-react";

export function FilterBoardMember({ onFilter, ...props }) {
  const { state } = useKanbanMember();
  const [quadroSelecionado, setQuadroSelecionado] = useState("");

  useEffect(() => {
    const savedBoard = localStorage.getItem("selectedBoard");
    if (savedBoard) {
      setQuadroSelecionado(savedBoard);
      onFilter(savedBoard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuadroSelecionado(value);
    localStorage.setItem("selectedBoard", value);
    onFilter(value);
  };

  return (
    <div className="relative inline-block">
      <select
        value={quadroSelecionado}
        onChange={handleChange}
        className="appearance-none px-4 py-2 pr-10 rounded-xl text-sm font-medium 
                   bg-white dark:bg-gray-800 
                   text-gray-700 dark:text-gray-200 
                   border border-gray-300 dark:border-gray-700 
                   shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   hover:border-blue-400 dark:hover:border-blue-400
                   transition duration-200 ease-in-out cursor-pointer"
        {...props}
      >
        <option value="">Selecionar quadro</option>
        {state.boards.map((quadro) => (
          <option key={quadro.idQuadro} value={quadro.idQuadro}>
            {quadro.nome}
          </option>
        ))}
      </select>

      {/* Ícone de seta */}
      <ChevronDown
        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 
                   text-gray-500 dark:text-gray-400 pointer-events-none"
      />
    </div>
  );
}
