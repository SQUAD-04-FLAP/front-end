import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { boardData } from '../BoardV2/data/mockData';

export default function CardDetails() {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Buscar a task pelo ID em todas as colunas
    let foundTask = null;
    boardData.columns.forEach(column => {
      const taskInColumn = column.tasks.find(t => t.id === cardId);
      if (taskInColumn) {
        foundTask = taskInColumn;
      }
    });
    setTask(foundTask);
  }, [cardId]);

  const getPriorityClasses = (priority) => {
    switch (priority) {
      case 'Alta':
        return 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300';
      case 'Média':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-300';
      case 'Baixa':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300';
      default:
        return '';
    }
  };

  const getStatusBadge = () => {
    return (
      <div className="flex items-center gap-2">
        <span className="px-2 py-1 text-xs font-medium bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300 rounded-full">
          Em Progresso
        </span>
        {task?.priority && (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityClasses(task.priority)}`}>
            Prioridade: {task.priority}
          </span>
        )}
      </div>
    );
  };

  if (!task) {
    return (
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Sidebar />
        <div className="ml-0 md:ml-60 flex items-center justify-center h-screen">
          <div className="text-gray-600 dark:text-gray-400">Carregando...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="ml-0 md:ml-60">
        {/* Conteúdo Principal */}
        <main className="px-6 py-6">
          {/* Cabeçalho da Página */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Detalhes do Card
            </h1>
            {getStatusBadge()}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Título da Tarefa */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Título da Tarefa
                </h2>
                <input
                  type="text"
                  value={task.title}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Descrição */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Descrição
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {task.description}
                </p>
              </div>

              {/* Responsável */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Responsável
                </h3>
                <div className="flex items-center gap-3">
                  <img
                    src={task.assigneeAvatar || 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'}
                    alt="Responsável"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Carlos Mendes (Desenvolvedor Frontend)
                    </p>
                  </div>
                </div>
              </div>

              {/* Comentários */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Comentários
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {task.comments} comentários
                  </span>
                </h3>

                {/* Lista de Comentários */}
                <div className="space-y-4 mb-6">
                  <div className="flex gap-3">
                    <img
                      src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                      alt="Marina Silva"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 dark:text-gray-100">Marina Silva</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Hoje, 14:57</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Precisamos garantir que os filtros sejam intuitivos. Vamos agendar uma reunião com o time de UX para discutir a melhor abordagem.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <img
                      src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                      alt="Carlos Mendes"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 dark:text-gray-100">Carlos Mendes</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Ontem, 16:43</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Já comecei a implementação dos filtros básicos. Vou precisar de mais detalhes sobre como os filtros avançados devem funcionar.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Novo Comentário */}
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Adicione um comentário..."
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 resize-none"
                    rows="3"
                  />
                  <div className="flex justify-end mt-3">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
                      Comentar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Direita */}
            <div className="space-y-6">
              {/* Detalhes */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Detalhes
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Criado em:</span>
                    <span className="text-gray-900 dark:text-gray-100">10/05/2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Prazo:</span>
                    <span className="text-gray-900 dark:text-gray-100">25/05/2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tempo estimado:</span>
                    <span className="text-gray-900 dark:text-gray-100">16 horas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tempo registrado:</span>
                    <span className="text-gray-900 dark:text-gray-100">8 horas</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                    Frontend
                  </span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 rounded text-xs">
                    UX/UI
                  </span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-300 rounded text-xs">
                    Sprint 5
                  </span>
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 rounded text-xs">
                    Filtros
                  </span>
                </div>
                <button className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                  + Adicionar
                </button>
              </div>

              {/* Histórico de Atividades */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Histórico de Atividades
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-900 dark:text-gray-100">
                        <span className="font-medium">Marina Silva</span> alterou para 'Em Progresso'
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">há 2 horas</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-900 dark:text-gray-100">
                        <span className="font-medium">Carlos Mendes</span> adicionou comentário
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">ontem às 16:43</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-900 dark:text-gray-100">
                        <span className="font-medium">João Santos</span> moveu de 'A Fazer' para 'Em Progresso'
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">há 3 dias</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Anexos */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Anexos
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0014.586 6L12 3.414A2 2 0 0010.586 3H6a2 2 0 00-2 1z" />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300">mockup-filtros-v4.png</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0014.586 6L12 3.414A2 2 0 0010.586 3H6a2 2 0 00-2 1z" />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300">especificacoes-tecnicas.pdf</span>
                  </div>
                </div>
                <button className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                  + Adicionar anexo
                </button>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-3 mt-8">
            <button 
              onClick={() => navigate('/board-v2')}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
            >
              Excluir
            </button>
            <button 
              onClick={() => navigate('/board-v2')}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
            >
              Fechar
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
              Salvar
            </button>
          </div>
        </main>
      </div>
    </section>
  );
}
