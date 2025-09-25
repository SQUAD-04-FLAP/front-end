import { useState } from 'react';
import { AdminSidebar } from '../../../components/AdminSidebar';
import { Plus, BarChart3, Eye, Edit, Trash2 } from 'lucide-react';

export default function AdminEmpresas() {
  const [empresas] = useState([
    {
      id: 1,
      nome: 'Agência Impulso Digital',
      cnpj: '12.345.678/0001-90',
      descricao: 'Agência especializada em marketing digital para pequenas e médias empresas, com foco em estratégias de crescimento online.',
      projetosAtivos: 15,
      status: 'Ativo',
      logo: '🚀'
    },
    {
      id: 2,
      nome: 'Construtora Horizonte',
      cnpj: '23.456.789/0001-12',
      descricao: 'Empresa de construção civil com mais de 20 anos de mercado, especializada em empreendimentos residenciais e comerciais de alto padrão.',
      projetosAtivos: 8,
      status: 'Ativo',
      logo: '🏗️'
    },
    {
      id: 3,
      nome: 'Tech Solutions Brasil',
      cnpj: '34.567.890/0001-34',
      descricao: 'Empresa de tecnologia focada em desenvolvimento de software e soluções de TI para o setor financeiro e de saúde.',
      projetosAtivos: 12,
      status: 'Ativo',
      logo: '💻'
    },
    {
      id: 4,
      nome: 'Supermercados Economia',
      cnpj: '45.678.901/0001-56',
      descricao: 'Rede de supermercados com 12 lojas na região sudeste, conhecida por preços competitivos e variedade de produtos.',
      projetosAtivos: 5,
      status: 'Ativo',
      logo: '🛒'
    },
    {
      id: 5,
      nome: 'Clínica Saúde Total',
      cnpj: '56.789.012/0001-78',
      descricao: 'Rede de clínicas médicas multidisciplinares com atendimento em diversas especialidades e exames laboratoriais.',
      projetosAtivos: 3,
      status: 'Em análise',
      logo: '🏥'
    },
    {
      id: 6,
      nome: 'Restaurante Sabor Brasileiro',
      cnpj: '67.890.123/0001-90',
      descricao: 'Rede de restaurantes de comida típica brasileira com 6 unidades em São Paulo, conhecida pela qualidade e ambiente acolhedor.',
      projetosAtivos: 2,
      status: 'Ativo',
      logo: '🍽️'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-300';
      case 'Em análise':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-500/15 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <AdminSidebar />
      
      <div>
        {/* Conteúdo Principal */}
        <main className="px-6 py-6">
          {/* Header da Página */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Gestão de Empresas
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gerencie todas as empresas cadastradas no sistema
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-blue-900 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
              <Plus className="w-5 h-5" />
              Nova Empresa
            </button>
          </div>

          {/* Grid de Empresas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {empresas.map((empresa) => (
              <div key={empresa.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
                {/* Header do Card */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">
                        {empresa.logo}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {empresa.nome}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          CNPJ: {empresa.cnpj}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(empresa.status)}`}>
                      {empresa.status}
                    </span>
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6">
                  {/* Descrição limitada a 3 linhas */}
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
                    {empresa.descricao}
                  </p>

                  {/* Estatísticas */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <BarChart3 className="w-4 h-4" />
                      <span>{empresa.projetosAtivos} projetos ativos</span>
                    </div>
                  </div>

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

          {/* Footer/Estatística */}
          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  📊 Resumo Geral
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {empresas.length} empresas cadastradas • {empresas.reduce((total, empresa) => total + empresa.projetosAtivos, 0)} projetos ativos
                </p>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {empresas.filter(e => e.status === 'Ativo').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Ativas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {empresas.filter(e => e.status === 'Em análise').length}
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
