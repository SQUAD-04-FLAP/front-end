import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export function CardModal({ isOpen, onClose, task }) {
  const [comment, setComment] = useState('');

  // Fechar modal com ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Bloquear scroll do body quando modal aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => (document.body.style.overflow = 'unset');
  }, [isOpen]);

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

  if (!isOpen || !task) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 bg-white dark:bg-gray-900 z- flex flex-col"
      style={{ zIndex: 9999 }}
    >
      {/* Botão X - Canto Superior Direito */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z- p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Fechar modal"
      >
        <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
      </button>

      {/* Header com título e badges */}
      <div className="flex-shrink-0 px-8 py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Detalhes do Card
          </h1>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 text-sm font-medium bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300 rounded-full">
              Em Progresso
            </span>
            {task?.priority && (
              <span className={`px-4 py-2 text-sm font-medium rounded-full ${getPriorityClasses(task.priority)}`}>
                Prioridade: {task.priority}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo Principal - Scrollável */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            
            {/* Coluna Principal (75%) */}
            <div className="xl:col-span-3 space-y-8">
              
              {/* Título da Tarefa */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Título da Tarefa
                </h2>
                <input
                  type="text"
                  value={task.title}
                  readOnly
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 text-lg"
                />
              </div>

              {/* Descrição */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Descrição
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                  {task.description}
                </p>
              </div>

              {/* Responsável */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Responsável
                </h3>
                <div className="flex items-center gap-4">
                  <img
                    src={task.assigneeAvatar || 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'}
                    alt="Responsável"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
                      Carlos Mendes
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      Desenvolvedor Frontend
                    </p>
                  </div>
                </div>
              </div>

              {/* Comentários */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Comentários
                  <span className="ml-3 text-sm text-gray-500 dark:text-gray-400 font-normal">
                    {task.comments} comentários
                  </span>
                </h3>

                {/* Lista de Comentários */}
                <div className="space-y-4 mb-6">
                  <div className="flex gap-4 p-4 bg-white dark:bg-gray-700 rounded-xl">
                    <img
                      src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                      alt="Marina Silva"
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">Marina Silva</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Hoje, 14:57</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Precisamos garantir que os filtros sejam intuitivos. Vamos agendar uma reunião com o time de UX para discutir a melhor abordagem.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white dark:bg-gray-700 rounded-xl">
                    <img
                      src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                      alt="Carlos Mendes"
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">Carlos Mendes</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Ontem, 16:43</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Já comecei a implementação dos filtros básicos. Vou precisar de mais detalhes sobre como os filtros avançados devem funcionar.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Novo Comentário */}
                <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Adicione um comentário..."
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 resize-none"
                    rows="4"
                  />
                  <div className="flex justify-end mt-4">
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                      Comentar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Direita (25%) */}
            <div className="xl:col-span-1 space-y-6">
              {/* Detalhes */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Detalhes
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Criado em:</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">10/05/2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Prazo:</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">25/05/2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tempo estimado:</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">16 horas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tempo registrado:</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">8 horas</span>
                  </div>
                </div>
              </div>

              {/* Etiquetas */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Etiquetas
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm">
                    Front-end
                  </span>
                  <span className="px-3 py-2 bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 rounded-lg text-sm">
                    UX/UI
                  </span>
                  <span className="px-3 py-2 bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-300 rounded-lg text-sm">
                    Sprint 5
                  </span>
                  <span className="px-3 py-2 bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 rounded-lg text-sm">
                    Filtros
                  </span>
                </div>
                <button className="mt-4 w-full text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg py-3 hover:border-blue-300 transition">
                  + Adicionar etiqueta
                </button>
              </div>

              {/* Anexos */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Anexos
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg cursor-pointer transition">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0014.586 6L12 3.414A2 2 0 0010.586 3H6a2 2 0 00-2 1z" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 truncate">mockup-filtros-v4.png</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg cursor-pointer transition">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0014.586 6L12 3.414A2 2 0 0010.586 3H6a2 2 0 00-2 1z" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 truncate">especificacoes-tecnicas.pdf</span>
                  </div>
                </div>
                <button className="mt-4 w-full text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg py-3 hover:border-blue-300 transition">
                  + Adicionar anexo
                </button>
              </div>

              {/* Histórico de Atividades */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
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
            </div>
          </div>
        </div>
      </div>

      {/* Footer com botões */}
      <div className="flex-shrink-0 px-8 py-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition order-last sm:order-none"
          >
            Excluir
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
          >
            Fechar
          </button>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );

  // Usar Portal para renderizar fora da hierarquia DOM
  return createPortal(modalContent, document.body);
}
