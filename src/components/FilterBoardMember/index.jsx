import { useState, useEffect } from "react";
import { useKanbanMember } from '../../hooks/useKanbanMember';

export function FilterBoardMember({ onFilter }) {
  const { state } = useKanbanMember();
  const [quadroSelecionado, setQuadroSelecionado] = useState("");

  // Ao montar, busca o último valor salvo
  useEffect(() => {
    const savedBoard = localStorage.getItem('selectedBoard');
    if (savedBoard) {
      setQuadroSelecionado(savedBoard);
      onFilter(savedBoard);
    }
  }, [onFilter]);

  //  Quando mudar, salva no localStorage e propaga para o reducer
  const handleChange = (e) => {
    const value = e.target.value;
    setQuadroSelecionado(value);
    localStorage.setItem('selectedBoard', value);
    onFilter(value);
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
          <option key={quadro.idQuadro} value={quadro.idQuadro}>
            {quadro.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
