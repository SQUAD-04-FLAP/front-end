import { useState } from "react";

export function FilterBoardMember() {
  const [quadroSelecionado, setQuadroSelecionado] = useState("");

  // Lista de quadros estática dentro do componente
  const quadros = [
    { id: 1, nome: "Quadro de Marketing" },
    { id: 2, nome: "Quadro de Vendas" },
    { id: 3, nome: "Quadro de TI" },
    { id: 4, nome: "Quadro Financeiro" },
  ];

  const handleChange = (e) => {
    setQuadroSelecionado(e.target.value);
    // Aqui você pode filtrar tarefas ou logs no futuro
    console.log("Quadro selecionado:", e.target.value);
  };

  return (
    <div className="inline-block">
      <select
        value={quadroSelecionado}
        onChange={handleChange}
        className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-gray-700 transition"
      >
        <option value="">Filtrar por quadro</option>
        {quadros.map((quadro) => (
          <option key={quadro.id} value={quadro.id}>
            {quadro.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
