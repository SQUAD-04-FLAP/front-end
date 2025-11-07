import { Plus, Eye, LayoutDashboard, Edit, Trash2 } from 'lucide-react';
import { useFramer } from '../../hooks/useFramer';
import { BtnNewProject } from '../../components/BtnNewProject';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { DeleteFramerButton } from '../../components/DeleteFramerButton';

export function Framers() {
  const { framers } = useFramer();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [framers]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <main className="px-6 py-6">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Gestão de Quadros
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gerencie todos os quadros Kanban criados no sistema.
            </p>
          </div>
          {user?.permissao === "ADMIN" && <BtnNewProject />}
        </div>

        {/* Grid de Quadros */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                  <div className="flex flex-col gap-2 w-3/4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))
          ) : framers.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500 dark:text-gray-400">
              Nenhum quadro encontrado.
              {user.permissao === "ADMIN" && (
                <p className="mt-2 text-sm">Clique em “Adicionar Quadro” para criar um.</p>
              )}
            </div>
          ) : (
            framers.map((quadro) => (
              <div
                key={quadro.idQuadro}
                className="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
              >
                {/* Ícones de ação no topo */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    title="Editar"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    onClick={() => console.log('Editar quadro', quadro.idQuadro)}
                  >
                    <Edit className="w-4 h-4 text-blue-500" />
                  </button>

                  <DeleteFramerButton id={framers.idQuadro} />
                  {/* <button
                    title="Excluir"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    onClick={() => console.log('Excluir quadro', quadro.idQuadro)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button> */}
                </div>

                {/* Header do card */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-cyan-100 dark:from-indigo-500/20 dark:to-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">
                        <LayoutDashboard className="w-6 h-6 text-indigo-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {quadro.nome}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {!loading && framers.length > 0 && (
          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  📊 Resumo Geral
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {framers.length} quadros cadastrados
                </p>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {framers.filter((f) => f.ativo).length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Ativos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {framers.filter((f) => !f.ativo).length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Inativos</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
