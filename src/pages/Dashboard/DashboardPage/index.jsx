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
    const { sectors, dashboard, fetchDashboard, loading } = useSectors();
    const sector = sectors.find((p) => p.idSetor === parseInt(id));

      useEffect(() => {
        if (id) {
            fetchDashboard(Number(id));
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
                Visão geral das tarefas e projetos da empresa
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
                    <p className="text-gray-500 dark:text-gray-400 mb-1">
                        Última atualização: hoje às 10:45
                    </p>
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
            {/* Quadros de Tarefas */}
            <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                   Tarefas próximas do vencimento
                </h2>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Campanha de Lançamento */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm dark:border dark:border-gray-700">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                        Campanha de Lançamento
                    </h3>
                    <Star size={16} className="text-yellow-500 fill-current" />
                    </div>
                </div>

                <div className="mb-3">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">
                    Ativo
                    </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Planejamento e execução da campanha de lançamento do novo
                    produto
                </p>

                <div className="border-b border-gray-200 dark:border-gray-700 mb-4"></div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center -space-x-2">
                    <div className="w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800 z-30">
                        J
                    </div>
                    <div className="w-7 h-7 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800 z-20">
                        M
                    </div>
                    <div className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800 z-10">
                        A
                    </div>
                    </div>

                    <div className="w-32 flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                        className="bg-yellow-500 dark:bg-green-500 h-2 rounded-full"
                        style={{ width: "75%" }}
                        ></div>
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
                    <h3 className="font-medium text-gray-900 dark:text-white">
                    Redes Sociais
                    </h3>
                </div>

                <div className="mb-3">
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-xs rounded-full font-medium">
                    Em progresso
                    </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Gerenciamento de conteúdo e engajamento nas redes sociais
                </p>

                <div className="border-b border-gray-200 dark:border-gray-700 mb-4"></div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center -space-x-2">
                    <div className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800 z-20">
                        M
                    </div>
                    <div className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800 z-10">
                        P
                    </div>
                    </div>

                    <div className="w-32 flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: "60%" }}
                        ></div>
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
                    <h3 className="font-medium text-gray-900 dark:text-white">
                    SEO e Analytics
                    </h3>
                </div>

                <div className="mb-3">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">
                    Planejamento
                    </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Otimização de SEO e análise de métricas do site
                </p>

                <div className="border-b border-gray-200 dark:border-gray-700 mb-4"></div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center -space-x-2">
                    <div className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800 z-20">
                        A
                    </div>
                    <div className="w-7 h-7 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-800 z-10">
                        J
                    </div>
                    </div>

                    <div className="w-32 flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "25%" }}
                        ></div>
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
                <h3 className="font-medium text-gray-900 dark:text-white">
                    Atividade Recente
                </h3>
                <a
                    href="#"
                    className="text-blue-500 dark:text-blue-400 hover:underline text-sm"
                >
                    Ver todas
                </a>
                </div>

                <div className="space-y-4">
                {/* 1 */}
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    JL
                    </div>
                    <div className="flex-1">
                    <p className="text-sm">
                        <span className="font-medium text-gray-900 dark:text-white">
                        Juliana Lima
                        </span>{" "}
                        <span className="text-gray-900 dark:text-gray-300">
                        adicionou 3 novas tarefas ao quadro
                        </span>
                    </p>
                    <p className="text-sm text-blue-500 dark:text-blue-400">
                        Redes Sociais
                    </p>
                    <p className="text-xs text-gray-500">Hoje, 11:32</p>
                    </div>
                </div>

                {/* 2 */}
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    CM
                    </div>
                    <div className="flex-1">
                    <p className="text-sm">
                        <span className="font-medium text-gray-900 dark:text-white">
                        Carlos Mendes
                        </span>{" "}
                        <span className="text-gray-900 dark:text-gray-300">
                        comentou na tarefa
                        </span>
                    </p>
                    <p className="text-sm text-blue-500 dark:text-blue-400">
                        Análise de Concorrentes
                    </p>
                    <p className="text-xs text-gray-500">Hoje, 10:45</p>
                    </div>
                </div>

                {/* 3 */}
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    MC
                    </div>
                    <div className="flex-1">
                    <p className="text-sm">
                        <span className="font-medium text-gray-900 dark:text-white">
                        Mariana Costa
                        </span>{" "}
                        <span className="text-gray-900 dark:text-gray-300">
                        concluiu a tarefa
                        </span>
                    </p>
                    <p className="text-sm text-blue-500 dark:text-blue-400">
                        Briefing da Campanha
                    </p>
                    <p className="text-xs text-gray-500">Ontem, 16:20</p>
                    </div>
                </div>

                {/* 4 */}
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    PA
                    </div>
                    <div className="flex-1">
                    <p className="text-sm">
                        <span className="font-medium text-gray-900 dark:text-white">
                        Pedro Almeida
                        </span>{" "}
                        <span className="text-gray-900 dark:text-gray-300">
                        anexou arquivos à tarefa
                        </span>
                    </p>
                    <p className="text-sm text-blue-500 dark:text-blue-400">
                        Materiais Gráficos
                    </p>
                    <p className="text-xs text-gray-500">Ontem, 14:15</p>
                    </div>
                </div>
                </div>
            </div>

            {/* Membros da Equipe */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm dark:border dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-gray-900 dark:text-white">
                    Membros da Equipe
                </h3>
                <a
                    href="#"
                    className="text-blue-500 dark:text-blue-400 hover:underline text-sm"
                >
                    Ver todos
                </a>
                </div>

                <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                        JL
                    </div>
                    <span className="text-gray-900 dark:text-gray-300">
                        Juliana Lima
                    </span>
                    </div>
                    <span className="text-sm text-green-500">Online</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                        PA
                    </div>
                    <span className="text-gray-900 dark:text-gray-300">
                        Paulo Augusto
                    </span>
                    </div>
                    <span className="text-sm text-gray-400">Offline</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                        ME
                    </div>
                    <span className="text-gray-900 dark:text-gray-300">
                        Maria Eduarda
                    </span>
                    </div>
                    <span className="text-sm text-green-500">Online</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                        LN
                    </div>
                    <span className="text-gray-900 dark:text-gray-300">
                        Lucas Nascimento
                    </span>
                    </div>
                    <span className="text-sm text-gray-400">Offline</span>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
