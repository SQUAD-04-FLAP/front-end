import { useState, useEffect } from "react";
import { useKanbanMember } from '../../hooks/useKanbanMember';

export function FilterBoardMember({ onFilter, ...props }) {
  const { state } = useKanbanMember();
  const [quadroSelecionado, setQuadroSelecionado] = useState("");

  // Ao montar, busca o último valor salvo
  useEffect(() => {
  const savedBoard = localStorage.getItem('selectedBoard');
  if (savedBoard) {
    setQuadroSelecionado(savedBoard);
    onFilter(savedBoard);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


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
        {...props}
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

// import { useState, useEffect } from "react";
// import { useKanbanMember } from "../../hooks/useKanbanMember";
// import { Filter, Grid } from "lucide-react";

// export function FilterBoardMember({ onFilter, ...props }) {
//   const { state } = useKanbanMember();
//   const [quadroSelecionado, setQuadroSelecionado] = useState("");
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const savedBoard = localStorage.getItem("selectedBoard");
//     if (savedBoard) {
//       setQuadroSelecionado(savedBoard);
//       onFilter(savedBoard);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleChange = (value) => {
//     setQuadroSelecionado(value);
//     localStorage.setItem("selectedBoard", value);
//     onFilter(value);
//     setOpen(false);
//   };

//   return (
//     <div className="relative inline-block" {...props}>
//       {/* Botão com ícone */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//         title="Filtrar por quadro"
//       >
//         <Grid className="w-5 h-5 text-gray-700 dark:text-gray-200" />
//       </button>

//       {/* Menu suspenso */}
//       {open && (
//         <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
//           <button
//             className={`block w-full text-left px-4 py-2 text-sm ${
//               quadroSelecionado === ""
//                 ? "bg-gray-200 dark:bg-gray-700"
//                 : "hover:bg-gray-100 dark:hover:bg-gray-700"
//             }`}
//             onClick={() => handleChange("")}
//           >
//             Todos os quadros
//           </button>
//           {state.boards.map((quadro) => (
//             <button
//               key={quadro.idQuadro}
//               className={`block w-full text-left px-4 py-2 text-sm ${
//                 quadroSelecionado === quadro.idQuadro
//                   ? "bg-gray-200 dark:bg-gray-700"
//                   : "hover:bg-gray-100 dark:hover:bg-gray-700"
//               }`}
//               onClick={() => handleChange(quadro.idQuadro)}
//             >
//               {quadro.nome}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
