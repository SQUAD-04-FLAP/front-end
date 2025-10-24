// import { Edit, Trash2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useSectors } from "../../../hooks/useSectors";
// import { useParams } from "react-router-dom";
// import { formatDate } from "../../../utils/formatDate";
// import { useKanbanMember } from '../../../hooks/useKanbanMember';

// export default function ProjectDetails() {
//   const navigate = useNavigate();
  
//   const { id } = useParams(); // pega o ID da URL
//   const { sectors } = useSectors();

//   const projeto = sectors.find((p) => p.idSetor === parseInt(id));

//   const { state, diapatch } = useKanbanMember();

//   const project = {
//     id: 1,
//     nome: "Projeto Apollo",
//     descricao: "Projeto para desenvolvimento de nova plataforma web.",
//     status: "Em andamento",
//     dataInicio: "2025-01-10",
//     dataFim: "2025-12-31",
//     boards: [
//       { id: 1, nome: "Backlog", descricao: "Tarefas pendentes", responsavel: "Lucas" },
//       { id: 2, nome: "Em Progresso", descricao: "Tarefas em andamento", responsavel: "Mariana" },
//       { id: 3, nome: "Concluído", descricao: "Tarefas finalizadas", responsavel: "Icaro" },
//     ],
//     membros: [
//       { id: 1, nome: "Lucas Silva", cargo: "Desenvolvedor Front-end" },
//       { id: 2, nome: "Mariana Costa", cargo: "Desenvolvedor Back-end" },
//       { id: 3, nome: "Icaro Nardelli", cargo: "Product Owner" },
//     ],
//     tarefas: [
//       { id: 1, titulo: "Criar layout inicial", status: "Concluída" },
//       { id: 2, titulo: "Implementar API", status: "Em andamento" },
//       { id: 3, titulo: "Testes unitários", status: "Pendente" },
//     ],
//   };

//   return (
//     <div className="p-6 space-y-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">

//        {/* Botão Voltar */}
//       <button
//         onClick={() => navigate(-1)} // volta uma página
//         className="flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition cursor-pointer"
//       >
//         ← Voltar
//       </button>
      
//       {/* Cabeçalho */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//         <h1 className="text-3xl font-bold">{projeto.nome}</h1>
//         <div className="flex gap-2">
//           <button className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg shadow-md transition transform hover:scale-105 cursor-pointer">
//             <Edit size={18} /> Editar
//           </button>
//           <button className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow-md transition transform hover:scale-105 cursor-pointer">
//             <Trash2 size={18} /> Excluir
//           </button>
//         </div>
//       </div>

//       {/* Informações gerais */}
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-2">
//         <p><strong>Descrição:</strong> {projeto.descricao}</p>
//         <p><strong>Data de criação:</strong> {formatDate(projeto.createdAt)}</p>
//         <p><strong>Última atualização:</strong> {formatDate(projeto.updatedAt)}</p>
//       </div>

//       {/* Quadros associados */}
//       <div>
//   <h2 className="text-2xl font-semibold mb-4">Quadros Associados</h2>
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//     {project.boards.map((proj) => (
//       <div
//         key={proj.idSetor}
//         className="relative bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
//       >
//         {/* Botões de ação */}
//         <div className="absolute top-3 right-3 flex gap-2">
//           <button className="p-1 text-blue-500 hover:text-blue-400 transition cursor-pointer">
//             <Edit size={18} />
//           </button>
//           <button className="p-1 text-red-500 hover:text-red-400 transition cursor-pointer">
//             <Trash2 size={18} />
//           </button>
//         </div>

//         <h3 className="font-bold text-lg mb-1">{proj.nome}</h3>
//         <p className="text-gray-700 dark:text-gray-300 mb-2">{proj.descricao}</p>
//       </div>
//     ))}
//   </div>
// </div>

//       {/* Membros do projeto */}
//       <div>
//         <h2 className="text-2xl font-semibold mb-4">Membros</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {project.membros.map((m) => (
//             <div key={m.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
//               <h3 className="font-bold text-lg">{m.nome}</h3>
//               <p className="text-gray-700 dark:text-gray-300">{m.cargo}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Tarefas do projeto */}
//       <div>
//         <h2 className="text-2xl font-semibold mb-4">Tarefas</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {project.tarefas.map((t) => (
//             <div key={t.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
//               <h3 className="font-bold text-lg mb-2">{t.titulo}</h3>
//               <p className={`font-semibold ${
//                 t.status === "Concluída" ? "text-green-500" :
//                 t.status === "Em andamento" ? "text-yellow-400" : "text-red-500"
//               }`}>{t.status}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }

import { Edit, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSectors } from "../../../hooks/useSectors";
import { useKanbanMember } from "../../../hooks/useKanbanMember";
import { useEffect } from "react";
import { formatDate } from "../../../utils/formatDate";

export default function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { sectors } = useSectors();
  const projeto = sectors.find((p) => p.idSetor === parseInt(id));

  const { state, dispatch } = useKanbanMember();

  // Quando a página for aberta, define o setor selecionado no contexto global
  useEffect(() => {
    if (id) {
      dispatch({ type: "SET_SETOR_FILTER", payload: id });
    }
  }, [id, dispatch]);

  const { boards, loading, error } = state;

  return (
    <div className="p-6 space-y-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">

      {/* Botão Voltar */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition cursor-pointer"
      >
        ← Voltar
      </button>

      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">{projeto?.nome}</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <Edit size={18} /> Editar
          </button>
          <button className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            <Trash2 size={18} /> Excluir
          </button>
        </div>
      </div>

      {/* Informações gerais */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-2">
        <p><strong>Descrição:</strong> {projeto?.descricao}</p>
        <p><strong>Data de criação:</strong> {formatDate(projeto?.createdAt)}</p>
        <p><strong>Última atualização:</strong> {formatDate(projeto?.updatedAt)}</p>
      </div>

      {/* Quadros associados */}
      <div>
  <h2 className="text-2xl font-semibold mb-4">Quadros Associados</h2>

  {loading ? (
    <div className="flex justify-center items-center py-10">
      <p className="text-gray-500">Carregando quadros...</p>
    </div>
  ) : error ? (
    <p className="text-red-500">Erro: {error}</p>
  ) : boards.length === 0 ? (
    <p>Nenhum quadro encontrado para este projeto.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {boards.map((board) => (
        <div
          key={board.id}
          className="relative bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
        >
          {/* Botões */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button className="p-1 text-blue-500 hover:text-blue-400">
              <Edit size={18} />
            </button>
            <button className="p-1 text-red-500 hover:text-red-400">
              <Trash2 size={18} />
            </button>
          </div>

          <h3 className="font-bold text-lg mb-1">{board.nome}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">{board.descricao}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Criado em: {formatDate(board.createdAt)}
          </p>
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
}

