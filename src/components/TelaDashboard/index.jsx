import { 
  Filter, 
  ArrowUpDown, 
  Plus, 
  MoreHorizontal,
  Star,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  List
} from 'lucide-react';

export function TelaDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard de Marketing</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Visão geral das tarefas e projetos do setor</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-900 dark:text-gray-300">
              <Filter size={14} />
              Filtrar
            </button>
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-900 dark:text-gray-300">
              <ArrowUpDown size={14} />
              Ordenar
            </button>
          </div>
        </div>

        {/* Top Row Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Documento empresa z */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm h-48 flex flex-col dark:border dark:border-gray-700">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900 dark:text-white">Documento empresa z</h3>
              <MoreHorizontal size={16} className="text-gray-400" />
            </div>
            <div className="flex-grow"></div>
            <div className="text-sm">
              <p className="text-gray-500 dark:text-gray-400 mb-1">Última atualização: hoje às 10:45</p>
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:underline">Ver detalhes</a>
            </div>
          </div>

          {/* Documento empresa x */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm h-48 flex flex-col dark:border dark:border-gray-700">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900 dark:text-white">Documento empresa x</h3>
              <MoreHorizontal size={16} className="text-gray-400" />
            </div>
            <div className="flex-grow"></div>
            <div className="text-sm">
              <p className="text-gray-500 dark:text-gray-400 mb-1">Última atualização: hoje às 10:45</p>
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:underline">Ver detalhes</a>
            </div>
          </div>

          {/* Próximos Prazos */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm dark:border dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white">Próximos Prazos</h3>
              <MoreHorizontal size={16} className="text-gray-400" />
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-gray-300">Campanha de Redes Sociais</p>
                </div>
                <span className="text-xs text-red-600 dark:text-red-400 font-medium">Hoje</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-gray-300">Relatório de Métricas</p>
                </div>
                <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Amanhã</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-gray-300">Planejamento de Conteúdo</p>
                </div>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Em 3 dias</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-gray-300">Análise de Concorrentes</p>
                </div>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Em 5 dias</span>
              </div>
            </div>
            <a href="#" className="text-blue-500 dark:text-blue-400 hover:underline text-sm">Ver todos os prazos</a>
          </div>
        </div>

        {/* Quadros de Tarefas Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quadros de Tarefas</h2>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 dark:text-gray-400">Visualizar:</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-100 dark:bg-blue-600 text-blue-700 dark:text-white rounded text-sm">Button</button>
                <button className="px-3 py-1 text-gray-600 dark:text-gray-400 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800">Button</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Campanha de Lançamento */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm dark:border dark:border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">Campanha de Lançamento</h3>
                  <Star size={16} className="text-yellow-500 fill-current" />
                </div>
              </div>
              <div className="mb-3">
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">Ativo</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Planejamento e execução da campanha de lançamento do novo produto</p>

              <div className="border-b border-gray-200 dark:border-gray-700 mb-4"></div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center -space-x-2">
                  <div className="w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800 z-30">J</div>
                  <div className="w-7 h-7 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800 z-20">M</div>
                  <div className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800 z-10">A</div>
                </div>

                <div className="w-32 flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 dark:bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <List size={14} />
                  <span>12 tarefas</span>
                </div>
                <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                  <AlertTriangle size={14} />
                  <span>5 dias restantes</span>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm dark:border dark:border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">Redes Sociais</h3>
              </div>
              <div className="mb-3">
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-xs rounded-full font-medium">Em progresso</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Gerenciamento de conteúdo e engajamento nas redes sociais</p>

              <div className="border-b border-gray-200 dark:border-gray-700 mb-4"></div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center -space-x-2">
                  <div className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800 z-20">M</div>
                  <div className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800 z-10">P</div>
                </div>

                <div className="w-32 flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <List size={14} />
                  <span>8 tarefas</span>
                </div>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <CheckCircle size={14} />
                  <span>Contínuo</span>
                </div>
              </div>
            </div>

            {/* SEO e Analytics */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm dark:border dark:border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">SEO e Analytics</h3>
              </div>
              <div className="mb-3">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">Planejamento</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Otimização de SEO e análise de métricas do site</p>

              <div className="border-b border-gray-200 dark:border-gray-700 mb-4"></div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center -space-x-2">
                  <div className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800 z-20">A</div>
                  <div className="w-7 h-7 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800 z-10">J</div>
                </div>

                <div className="w-32 flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <List size={14} />
                  <span>6 tarefas</span>
                </div>
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <div className="w-3 h-3 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                  <span>15 dias restantes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Atividade Recente */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm dark:border dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-gray-900 dark:text-white">Atividade Recente</h3>
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:underline text-sm">Ver todas</a>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-medium">JL</div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">Juliana Lima</span> <span className="text-gray-900 dark:text-gray-300">adicionou 3 novas tarefas ao quadro</span>
                  </p>
                  <p className="text-sm text-blue-500 dark:text-blue-400">Redes Sociais</p>
                  <p className="text-xs text-gray-500">Hoje, 11:32</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-medium">CM</div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">Carlos Mendes</span> <span className="text-gray-900 dark:text-gray-300">comentou na tarefa</span>
                  </p>
                  <p className="text-sm text-blue-500 dark:text-blue-400">Análise de Concorrentes</p>
                  <p className="text-xs text-gray-500">Hoje, 10:45</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-medium">MC</div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">Mariana Costa</span> <span className="text-gray-900 dark:text-gray-300">concluiu a tarefa</span>
                  </p>
                  <p className="text-sm text-blue-500 dark:text-blue-400">Briefing da Campanha</p>
                  <p className="text-xs text-gray-500">Ontem, 16:20</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">PA</div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">Pedro Almeida</span> <span className="text-gray-900 dark:text-gray-300">anexou arquivos à tarefa</span>
                  </p>
                  <p className="text-sm text-blue-500 dark:text-blue-400">Materiais Gráficos</p>
                  <p className="text-xs text-gray-500">Ontem, 14:15</p>
                </div>
              </div>
            </div>
          </div>

          {/* Membros da Equipe */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm dark:border dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-gray-900 dark:text-white">Membros da Equipe</h3>
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:underline text-sm">Ver todos</a>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">MC</div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Mariana Costa</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Gerente de Marketing</p>
                  </div>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-medium">AS</div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Ana Souza</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Marketing Digital</p>
                  </div>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-medium">JL</div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-400 dark:bg-gray-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Juliana Lima</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Social Media</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Ausente</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">PA</div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Pedro Almeida</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Designer</p>
                  </div>
                </div>
                <span className="text-sm text-red-600 dark:text-red-400">Ocupado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}