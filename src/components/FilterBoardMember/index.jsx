import { useState } from "react";
import { useKanbanMember } from '../../hooks/useKanbanMember';

export function FilterBoardMember({ onFilter }) {
  const [quadroSelecionado, setQuadroSelecionado] = useState("");
  const { state } = useKanbanMember();

  const handleChange = (e) => {
    setQuadroSelecionado(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="inline-block">
      <select
        value={quadroSelecionado}
        onChange={handleChange}
        className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-gray-700 transition"
      >
        <option value="">Filtrar por quadro</option>
        {state.boards.map((quadro) => (
          <option key={quadro.id} value={quadro.id}>
            {quadro.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
