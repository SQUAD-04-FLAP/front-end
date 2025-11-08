import { Plus, BarChart3, Eye, Edit, Trash2, Folder } from 'lucide-react';
import { useSectors } from '../../hooks/useSectors';
import { toast } from 'react-toastify';
import { Dialog } from '../../components/Dialog';
import { showMessage } from '../../adapters/showMessage';
import {delete_sector} from '../../services/sectorsService'
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BtnNewProject } from '../../components/BtnNewProject';
import { ButtonEditProject } from '../../components/ButtonEditProject';
import { useAuth } from '../../hooks/useAuth';

export function Projects() {
    const { sectors, dispatch, state } = useSectors();
    const {user} = useAuth();

    const navigate = useNavigate();

    const previousSectorsLength = useRef(state.sectors.length);

    useEffect(() => {
      if (state.error) {
        showMessage.error(state.error, true);

        // Reseta o erro para permitir futuras mensagens
        dispatch({ type: "RESET_SECTOR_ERROR" });
      }
    }, [state.error]);


// Observa mudanças de setores para detectar exclusão
useEffect(() => {
  if (state.sectors.length < previousSectorsLength.current) {
    showMessage.success("Projeto excluído com sucesso!", true);
  }
  previousSectorsLength.current = state.sectors.length;
}, [state.sectors]);

    return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div>
        <main className="px-6 py-6">
          {/* Header da Página */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Gestão de Empresas
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gerencie todos as empresas cadastradas no sistema
              </p>
            </div>

            {user.permissao === "ADMIN" && (
               <BtnNewProject className="flex items-center gap-2 px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-blue-900 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer" />
            )}
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
                      </div>
                    </div>
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

                  {/* Ações */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/projects/${projeto.idSetor}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg transition text-sm font-medium cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      Visualizar
                    </button>

                    {user.permissao === "ADMIN" && (
                       <ButtonEditProject project={projeto} />
                    )}

                    {user.permissao === "ADMIN" && (
                        <button
                        onClick={() => {
                          toast.dismiss();

                          toast(Dialog, {
                            data: "Tem certeza disso?",
                            autoClose: false,
                            closeOnClick: false,
                            closeButton: false,
                            draggable: false,
                            onClose: async (confirmation) => {
                              if (confirmation) {
                                try {

                                  // chama a API
                                  await delete_sector(projeto.idSetor);
                                  
                                  // dispara ação de sucesso para o reducer
                                  dispatch({ type: "DELETE_SECTOR_SUCCESS", payload: projeto.idSetor });

                                } catch (error) {
                                  // dispara ação de erro para o reducer
                                  dispatch({ type: "DELETE_SECTOR_FAILURE", payload: error.message });
                                }
                              }
                            },
                      });
                      }}
                      className="flex items-center justify-center px-3 py-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      </button>
                    )}



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
                <p className="text-gray-600 dark:text-gray-400">
                  {sectors.length} empresas cadastradas
                </p>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {sectors.filter(p => p.status === 'Ativo').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Ativos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {sectors.filter(p => p.status === 'Em análise').length}
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