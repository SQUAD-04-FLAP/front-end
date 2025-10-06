// import { useState } from "react";
// import { MessageCircle, Plus, Paperclip } from "lucide-react";
// import { useFilter } from "../../hooks/useFilter";
// import { useTask } from "../../hooks/useTask";

// export function BoardKanbanAdm() {
//   const { state } = useFilter();
//   const { selectedFramerId } = state;

//   const { state: taskState, loadTasks } = useTask();

//   console.log(selectedFramerId);


//      const [tarefas] = useState([
//       {
//         id: 1,
//         titulo: 'Criar campanha para lançamento',
//         descricao: 'Desenvolver estratégia para novo produto',
//         responsavel: 'Lucas Mendes',
//         coluna: 'A Fazer',
//         comentarios: 3,
//         anexos: 2
//       },
//       {
//         id: 2,
//         titulo: 'Análise de métricas de redes sociais',
//         descricao: 'Avaliar desempenho das últimas campanhas',
//         responsavel: 'Carla Sousa',
//         coluna: 'A Fazer',
//         comentarios: 0,
//         anexos: 1
//       },
//       {
//         id: 3,
//         titulo: 'Planejamento de conteúdo',
//         descricao: 'Definir calendário editorial do próximo mês',
//         responsavel: 'Rafael Costa',
//         coluna: 'A Fazer',
//         comentarios: 2,
//         anexos: 0
//       },
//       {
//         id: 4,
//         titulo: 'Briefing para agência',
//         descricao: 'Preparar documento com diretrizes',
//         responsavel: 'Marina Oliveira',
//         coluna: 'A Fazer',
//         comentarios: 1,
//         anexos: 3
//       },
//       {
//         id: 5,
//         titulo: 'Produção de vídeo institucional',
//         descricao: 'Acompanhar gravações e edição',
//         responsavel: 'Pedro Almeida',
//         coluna: 'Em Andamento',
//         comentarios: 7,
//         anexos: 1
//       },
//       {
//         id: 6,
//         titulo: 'Apresentação para cliente',
//         descricao: 'Revisar slides e conteúdo',
//         responsavel: 'Fernanda Lima',
//         coluna: 'Revisão',
//         comentarios: 2,
//         anexos: 0
//       },
//       {
//         id: 7,
//         titulo: 'Otimização de SEO',
//         descricao: 'Implementar melhorias no site',
//         responsavel: 'Juliana Santos',
//         coluna: 'Revisão',
//         comentarios: 1,
//         anexos: 2
//       },
//       {
//         id: 8,
//         titulo: 'Material gráfico para evento',
//         descricao: 'Aprovar artes finais',
//         responsavel: 'Gustavo Martins',
//         coluna: 'Revisão',
//         comentarios: 4,
//         anexos: 3
//       },
//       {
//         id: 9,
//         titulo: 'Relatório de performance',
//         descricao: 'Compilar dados do último trimestre',
//         responsavel: 'André Ferreira',
//         coluna: 'Revisão',
//         comentarios: 5,
//         anexos: 2
//       },
//       {
//         id: 10,
//         titulo: 'Pesquisa de mercado',
//         descricao: 'Análise de concorrentes',
//         responsavel: 'Rodrigo Silva',
//         coluna: 'Concluído',
//         comentarios: 0,
//         anexos: 1
//       },
//       {
//         id: 11,
//         titulo: 'Criação de landing page',
//         descricao: 'Desenvolvimento e publicação',
//         responsavel: 'Beatriz Campos',
//         coluna: 'Concluído',
//         comentarios: 3,
//         anexos: 0
//       },
//       {
//         id: 12,
//         titulo: 'Estratégia de email marketing',
//         descricao: 'Validar fluxo e conteúdo',
//         responsavel: 'Camila Rocha',
//         coluna: 'Concluído',
//         comentarios: 1,
//         anexos: 2
//       },
//       {
//         id: 13,
//         titulo: 'Treinamento da equipe',
//         descricao: 'Capacitação em novas ferramentas',
//         responsavel: 'Marcelo Dias',
//         coluna: 'Concluído',
//         comentarios: 2,
//         anexos: 1
//       },
//       {
//         id: 14,
//         titulo: 'Atualização de portfólio',
//         descricao: 'Inclusão de novos cases',
//         responsavel: 'Luciana Vieira',
//         coluna: 'Concluído',
//         comentarios: 0,
//         anexos: 3
//       }
//     ]);

//     const getAvatar = (nome) => {
//     return `https://ui-avatars.com/api/?name=${nome}&background=random&color=fff&size=32`;
//   };

// const colunas = [
//     { nome: 'A Fazer', cor: 'bg-gray-100', contadorCor: 'bg-gray-500' },
//     { nome: 'Em Andamento', cor: 'bg-blue-100', contadorCor: 'bg-blue-500' },
//     { nome: 'Revisão', cor: 'bg-yellow-100', contadorCor: 'bg-yellow-500' },
//     { nome: 'Concluído', cor: 'bg-green-100', contadorCor: 'bg-green-500' }
//   ];
//     return(
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//             {colunas.map((coluna) => {
//               const tarefasColuna = tarefas.filter(tarefa => tarefa.coluna === coluna.nome);
              
//               return (
//                 <div key={coluna.nome} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
//                   {/* Header da Coluna */}
//                   <div className={`${coluna.cor} dark:bg-gray-700 p-4 rounded-t-xl`}>
//                     <div className="flex items-center justify-between">
//                       <h3 className="font-semibold text-gray-900 dark:text-gray-100">
//                         {coluna.nome}
//                       </h3>
//                       <span className={`${coluna.contadorCor} text-white text-xs px-2 py-1 rounded-full font-medium`}>
//                         {tarefasColuna.length}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Cards das Tarefas */}
//                   <div className="p-4 space-y-4 min-h-[600px]">
//                     {tarefasColuna.map((tarefa) => (
//                       <div 
//                         key={tarefa.id} 
//                         className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition cursor-pointer"
//                       >
//                         {/* Título */}
//                         <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2">
//                           {tarefa.titulo}
//                         </h4>

//                         {/* Descrição */}
//                         <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
//                           {tarefa.descricao}
//                         </p>

//                         {/* Responsável */}
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-2">
//                             <img
//                               src={getAvatar(tarefa.responsavel)}
//                               alt={tarefa.responsavel}
//                               className="w-6 h-6 rounded-full"
//                             />
//                             <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
//                               {tarefa.responsavel}
//                             </span>
//                           </div>

//                           {/* Estatísticas */}
//                           <div className="flex items-center gap-2">
//                             {tarefa.comentarios > 0 && (
//                               <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
//                                 <MessageCircle className="w-3 h-3" />
//                                 <span>{tarefa.comentarios}</span>
//                               </div>
//                             )}
//                             {tarefa.anexos > 0 && (
//                               <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
//                                 <Paperclip className="w-3 h-3" />
//                                 <span>{tarefa.anexos}</span>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}

//                     {/* Botão Novo Card */}
//                     <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition">
//                       <Plus className="w-4 h-4 mx-auto mb-1" />
//                       <span className="text-sm">Novo Card</span>
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//     );
// }

import { useEffect } from "react";
import { useFilter } from "../../hooks/useFilter";
import { useTask } from "../../hooks/useTask";

export function BoardKanbanAdm() {
  const { state: filterState } = useFilter();
  const { selectedFramerId } = filterState;

  const { state: taskState, loadTasks } = useTask();
  const { tasks, loading, error } = taskState;

  useEffect(() => {
    if (selectedFramerId) {
      loadTasks(selectedFramerId);
    }
  }, [selectedFramerId]);

  console.log(selectedFramerId);
  console.log(tasks);

  if (!selectedFramerId) {
    return <p className="text-slate-500 dark:text-slate-400">Selecione um quadro para ver as tarefas</p>;
  }

  if (loading) {
    return <p className="text-slate-500 dark:text-slate-400">Carregando tarefas...</p>;
  }

  if (error) {
    return <p className="text-red-500">Erro ao carregar tarefas: {error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Tarefas do Quadro #{selectedFramerId}</h2>
      {tasks.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">Nenhuma tarefa cadastrada</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map(task => (
            <li
              key={task.id}
              className="p-3 rounded-xl shadow-sm bg-white dark:bg-slate-800"
            >
              {task.nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
