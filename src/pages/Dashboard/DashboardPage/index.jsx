import {
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Star,
  AlertTriangle,
  CheckCircle,
  List
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSectors } from '../../../hooks/useSectors';
import { RouterLinks } from '../../../components/RouterLinks';
import { useEffect } from "react";

export function DashboardPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { sectors, dashboard, fetchDashboard, loading, tasksCloseDueDateBySector, fetchTasksDueDate, loadingTasksDueDate } = useSectors();
    const sector = sectors.find((p) => p.idSetor === parseInt(id));

      useEffect(() => {
        if (id) {
            fetchDashboard(Number(id));
        }
    }, [id]);

     useEffect(() => {
        if (id) {
            fetchTasksDueDate(Number(id));
        }
    }, [id]);

    const LoadingCard = ({ height }) => (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse`}
      style={{ height }}
    >
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        ))}
      </div>
      <div className="mt-auto h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mt-4"></div>
    </div>
  );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        {/* Botão Voltar */}
        <button
            onClick={() => navigate(-1)}
            className="flex ml-11 items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition cursor-pointer"
        >
            ← Voltar
        </button>

        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                Dashboard {sector.nome}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                Visão geral das tarefas da empresa
                </p>
            </div>
            </div>

            {/* Top Row Cards */}
         <div className="grid grid-cols-3 gap-6 mb-8">
            {loading ? (
                <>
                <LoadingCard height="16rem" />
                <LoadingCard height="12rem" />
                </>
            ) : (
                <>
                {/* Resumo de Tarefas */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm h-64 flex flex-col dark:border dark:border-gray-700">
                    <div className="flex justify-between items-start mb-6">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                        Resumo de Tarefas
                    </h3>
                    <MoreHorizontal size={16} className="text-gray-400" />
                    </div>

                    <div className="grid grid-cols-4 gap-6 mb-auto">
                    <div>
                        <div className="text-4xl font-bold text-blue-500 mb-2">
                        {dashboard.totalTarefas ?? 0}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 ml-1">Total</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-green-500 mb-2 -ml-2">
                        {dashboard.tarefasConcluidas ?? 0}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 -ml-5">
                        Concluídas
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-yellow-500 mb-2 ml-4">
                        {dashboard.tarefasPendentes ?? 0}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 -ml-4 whitespace-nowrap">
                        Em Progresso
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-red-500 mb-2 ml-5">
                        {dashboard.tarefasAtrasadas ?? 0}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Atrasadas</div>
                    </div>
                    </div>

                    <div className="mt-auto">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                        <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                            width: `${
                            dashboard.totalTarefas
                                ? Math.round(
                                    (dashboard.tarefasConcluidas / dashboard.totalTarefas) * 100
                                )
                                : 0
                            }%`,
                        }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {dashboard.totalTarefas
                        ? Math.round((dashboard.tarefasConcluidas / dashboard.totalTarefas) * 100)
                        : 0}
                        % das tarefas concluídas
                    </p>
                    </div>
                </div>

                {/* Documento empresa */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm h-48 flex flex-col dark:border dark:border-gray-700">
                    <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                        Anexos da empresa {sector?.nome}
                    </h3>
                    <MoreHorizontal size={16} className="text-gray-400" />
                    </div>
                    <div className="flex-grow"></div>
                    <div className="text-sm">
                    <RouterLinks
                        href={`/projects/${sector?.idSetor}`}
                        className="text-blue-500 dark:text-blue-400 hover:underline"
                    >
                        Ver detalhes
                    </RouterLinks>
                    </div>
                </div>
                </>
            )}
            </div>
            
            <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                   Tarefas próximas do vencimento
                </h2>
            </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loadingTasksDueDate ? (
            <LoadingCard height="16rem" />
        ) : tasksCloseDueDateBySector.length === 0 ? (
            <div className="col-span-3 text-center py-10 text-gray-600 dark:text-gray-400">
            Nenhuma tarefa encontrada.
            </div>
        ) : (
            tasksCloseDueDateBySector.map((task) => {
            const diasRestantes = Math.ceil(
                (new Date(task.dtTermino) - new Date()) / (1000 * 60 * 60 * 24)
            );

            return (
                <div
                key={task.idTarefa}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm dark:border dark:border-gray-700"
                >
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                    {task.titulo}
                    </h3>
                </div>

                <div className="mb-3">
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-xs rounded-full font-medium">
                    {task.nomeStatus}
                    </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {task.descricao}
                </p>

                <div className="border-b border-gray-200 dark:border-gray-700 mb-4"></div>

                {task.responsaveis?.length > 0 && (
                    <div className="flex -space-x-2 rtl:space-x-reverse mb-3">
                    {task.responsaveis.map((responsavel) => (
                        <div key={responsavel.idUsuario} className="relative group">
                        <img
                            className="w-8 h-8 border-2 border-white rounded-full shadow-sm transition-transform transform hover:scale-110"
                            src={`https://ui-avatars.com/api/?name=${responsavel.nome}&size=64`}
                            alt={responsavel.nome}
                        />
                        <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {responsavel.nome}
                        </span>
                        </div>
                    ))}
                    </div>
                )}

                <div className="flex items-center gap-4 text-sm">
                    <div className="text-gray-600 dark:text-gray-400">
                    {task.prioridade} prioridade
                    </div>

                    {diasRestantes > 0 ? (
                    <div className="text-orange-600 dark:text-orange-400">
                        {diasRestantes} dias restantes
                    </div>
                    ) : (
                    <div className="text-red-600 dark:text-red-400">Vencida</div>
                    )}
                </div>
                </div>
            );
            })
        )}
           </div>
            </div>
        </div>
        </div>
    );
}
