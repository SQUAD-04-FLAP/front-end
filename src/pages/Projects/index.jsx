import { useState } from 'react';
import { Plus, BarChart3, Eye, Edit, Trash2, Folder } from 'lucide-react';
import { useSectors } from '../../hooks/useSectors';

export function Projects() {

    const { sectors } = useSectors();
    console.log(sectors);

    const [projetos] = useState([
    {
      id: 1,
      nome: 'Projeto Impulso Digital',
      cliente: 'Agência Impulso',
      descricao: 'Desenvolvimento de campanha de marketing digital com foco em redes sociais.',
      status: 'Ativo',
      progresso: 75
    },
    {
      id: 2,
      nome: 'Construção Horizonte',
      cliente: 'Construtora Horizonte',
      descricao: 'Gerenciamento de obras residenciais e comerciais de alto padrão.',
      status: 'Ativo',
      progresso: 50
    },
    {
      id: 3,
      nome: 'Tech Solutions App',
      cliente: 'Tech Solutions Brasil',
      descricao: 'Desenvolvimento de aplicativo financeiro para o setor bancário.',
      status: 'Em análise',
      progresso: 20
    },
    {
      id: 4,
      nome: 'Supermercados Sistema',
      cliente: 'Supermercados Economia',
      descricao: 'Implementação de sistema interno de estoque e vendas.',
      status: 'Ativo',
      progresso: 90
    }
  ]);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Ativo':
//         return 'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-300';
//       case 'Em análise':
//         return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-300';
//       default:
//         return 'bg-gray-100 text-gray-800 dark:bg-gray-500/15 dark:text-gray-300';
//     }
//   };

    return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div>
        <main className="px-6 py-6">
          {/* Header da Página */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Gestão de Projetos
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gerencie todos os projetos cadastrados no sistema
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-blue-900 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
              <Plus className="w-5 h-5" />
              Novo Projeto
            </button>
          </div>

          {/* Grid de Projetos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {sectors.map((projeto) => (
              <div key={projeto.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
                {/* Header do Card */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">
                        <Folder className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {projeto.nome}
                        </h3>
                        {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                          Cliente: {projeto.cliente}
                        </p> */}
                      </div>
                    </div>
                    {/* <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(projeto.status)}`}>
                      {projeto.status}
                    </span> */}
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6">
                  <p 
                    className="text-gray-600 dark:text-gray-400 text-sm mb-4 overflow-hidden"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: '1.4em',
                      maxHeight: '4.2em'
                    }}
                  >
                    {projeto.descricao}
                  </p>

                  {/* Estatísticas */}
                  {/* <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <BarChart3 className="w-4 h-4" />
                      <span>{projeto.progresso}% concluído</span>
                    </div>
                  </div> */}

                  {/* Ações */}
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg transition text-sm font-medium">
                      <Eye className="w-4 h-4" />
                      Visualizar
                    </button>
                    <button className="flex items-center justify-center px-3 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-lg transition">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="flex items-center justify-center px-3 py-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer/Resumo */}
          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  📊 Resumo Geral
                </h3>
                {/* <p className="text-gray-600 dark:text-gray-400">
                  {sectors.length} projetos cadastrados • {projetos.reduce((total, projeto) => total + projeto.progresso, 0)}% de progresso total
                </p> */}
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {projetos.filter(p => p.status === 'Ativo').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Ativos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {projetos.filter(p => p.status === 'Em análise').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Em análise</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}