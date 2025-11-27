import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Upload, Trash2 } from 'lucide-react';
import { CommentsTask } from '../../components/CommentsTask';
import { CreateComment } from '../CreateComment';
import { useAuth } from '../../hooks/useAuth';
import { DeleteButtonTask } from '../DeleteButtonTask';
import { useKanbanMember } from '../../hooks/useKanbanMember';
import { showMessage } from '../../adapters/showMessage';
import { SelectMultiple } from '../SelectMultiple';
import { formatDate } from '../../utils/formatDate';

export function CardModal({ isOpen, onClose, task }) {
  const [isEditing, setIsEditing] = useState(false);

  const { user, allUsers } = useAuth();
  const { deleteTask, state, editTask, dispatch } = useKanbanMember();

  // Estados editáveis
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDeadline, setEditedDeadline] = useState('');
  const [editedCreatedDate, setEditedCreatedDate] = useState('');
  const [editedEstimatedTime, setEditedEstimatedTime] = useState('');
  const [editedAssignee, setEditedAssignee] = useState('');

  const [attachments, setAttachments] = useState([
    { id: 1, name: 'mockup-filtros-v4.png', type: 'image' },
    { id: 2, name: 'especificacoes-tecnicas.pdf', type: 'pdf' }
  ]);

  const [originalValues, setOriginalValues] = useState({});
  const [editedIsActive, setEditedIsActive] = useState(false);
  const [editedPriority, setEditedPriority] = useState('Média');

    const handleAddAttachment = () => {
    // Criar input de arquivo temporário
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '*/*';
  
    
    input.click();
  };

  const handleRemoveAttachment = (id, name) => {
    if (confirm(`Deseja remover o anexo "${name}"?`)) {
      setAttachments(prev => prev.filter(att => att.id !== id));
    }
  };

  useEffect(() => {
    if (task) {
      const initialValues = {
        title: task.title || '',
        description: task.description || '',
        deadline: task.dtTermino || '',
        createdDate: task.dtCreated || '',
        estimatedTime: task.estimatedTime || '',
        assignee: task.assignee || '',
        isActive: task.ativo ?? true,
        priority: task.prioridade || '',
      };

      setEditedTitle(initialValues.title);
      setEditedDescription(initialValues.description);
      setEditedDeadline(initialValues.deadline);
      setEditedCreatedDate(initialValues.createdDate);
      setEditedEstimatedTime(initialValues.estimatedTime);
      setEditedAssignee(initialValues.assignee);
      setEditedIsActive(initialValues.isActive);
      setEditedPriority(initialValues.priority);
      setOriginalValues(initialValues);
    }
  }, [task]);

  // Fechar modal com ESC
  useEffect(() => {
    const handleEsc = (event) => { if (event.keyCode === 27) onClose(); };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Bloquear scroll do body quando modal aberto
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => (document.body.style.overflow = 'unset');
  }, [isOpen]);

  const getPriorityClasses = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'alta': return 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300';
      case 'média': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-300';
      case 'baixa': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300';
      default: return '';
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => {
    setEditedTitle(originalValues.title);
    setEditedDescription(originalValues.description);
    setEditedDeadline(originalValues.deadline);
    setEditedCreatedDate(originalValues.createdDate);
    setEditedEstimatedTime(originalValues.estimatedTime);
    setEditedAssignee(originalValues.assignee);
    setEditedIsActive(originalValues.isActive);
    setEditedPriority(originalValues.priority);
    setIsEditing(false);
  };

const handleSave = async () => {
  const dtTerminoISO = new Date(editedDeadline.split('/').reverse().join('-')).toISOString();

  dispatch({ type: "SET_LOADING_UPDATE_TASK", payload: true }); 

  try {
    const payload = {
      titulo: editedTitle,
      descricao: editedDescription,
      dtTermino: dtTerminoISO,
      ativo: editedIsActive,
      prioridade: editedPriority,
    };

    console.log("Payload enviado para editTask:", payload);

    // Chama a função de edição real
    await editTask(task.id, payload);

     dispatch({ type: "SET_LOADING_UPDATE_TASK", payload: false });


    task.isActive = editedIsActive;

    // Atualiza os valores originais localmente
    setOriginalValues({
      title: editedTitle,
      description: editedDescription,
      deadline: editedDeadline,
      createdDate: editedCreatedDate,
      estimatedTime: editedEstimatedTime,
      assignee: editedAssignee,
      isActive: editedIsActive,
      priority: editedPriority,
    });

    setIsEditing(false);
    alert("Alterações salvas com sucesso!", true);
  } catch (error) {
     dispatch({ type: "SET_LOADING_UPDATE_TASK", payload: false });

    alert("Erro ao salvar alterações");
    console.error(error);
  }
};



  if (!isOpen || !task) return null;

  return createPortal(
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-[9999] flex flex-col">
      {/* Botão fechar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Fechar modal"
      ><X className="w-6 h-6 text-gray-600 dark:text-gray-400" /></button>

      {/* Header */}
      <div className="flex-shrink-0 px-8 py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Detalhes do Card {isEditing && <span className="text-orange-500">(Editando)</span>}
          </h1>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 text-sm font-medium bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300 rounded-full">
              {task.status}
            </span>
            {task.prioridade && !isEditing && (
              <span className={`px-4 py-2 text-sm font-medium rounded-full ${getPriorityClasses(task.prioridade)}`}>
                Prioridade: {task.prioridade}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Coluna principal */}
            <div className="xl:col-span-3 space-y-8">
              {/* Título */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Título da Tarefa</h2>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  readOnly={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg text-lg ${
                    isEditing
                      ? 'bg-white dark:bg-gray-700 border-blue-500 dark:border-blue-400'
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                  } text-gray-900 dark:text-gray-100`}
                />
              </div>

              {/* Descrição */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Descrição</h3>
                {isEditing ? (
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-blue-500 dark:border-blue-400 rounded-lg text-gray-900 dark:text-gray-100 resize-none"
                    rows="6"
                  />
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{editedDescription}</p>
                )}
              </div>

              {/* Responsável */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Responsáveis</h3>

                {isEditing ? (
                  <SelectMultiple
                    options={allUsers.map(u => ({
                      value: u.idUsuario,
                      label: u.nome,
                      avatar: u.avatar || `https://ui-avatars.com/api/?name=${u.nome}&size=64`
                    }))}
                    value={editedAssignee}
                    onChange={setEditedAssignee}
                    className="w-full h-12"
                  />
                ) : task.responsaveis && task.responsaveis.length > 0 ? (
                  <div className="flex -space-x-2 rtl:space-x-reverse">
                    {task.responsaveis.map((responsavel) => (
                      <div key={responsavel.idUsuario} className="relative group">
                        <img
                          src={responsavel.avatar || `https://ui-avatars.com/api/?name=${responsavel.nome}&size=64`}
                          alt={responsavel.nome}
                          className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover transition-transform transform hover:scale-110"
                        />
                        {/* Tooltip elegante */}
                        <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {responsavel.nome}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                    Não há ninguém responsável por essa tarefa ainda
                  </p>
                )}
              </div>

              {/* <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Responsável</h3>
                {isEditing ? (
                  <SelectMultiple
                    options={allUsers.map(u => ({ value: u.idUsuario, label: u.nome, avatar: u.avatar || "https://ui-avatars.com/api/?name=" + u.nome}))}
                    value={editedAssignee}
                    onChange={setEditedAssignee}
                    className="w-full h-12"
                  />
                ) : task.nomeResponsavel ? (
                  <div className="flex items-center gap-4">
                    <img
                      src={task.assigneeAvatar || "https://ui-avatars.com/api/?name=" + task.nomeResponsavel}
                      alt="Responsável"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-xl">{task.nomeResponsavel}</p>
                  </div>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                    Não há ninguém responsável por essa tarefa ainda
                  </p>
                )}
              </div> */}

               {/* Criador */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Criador</h3>

            {task.nomeCriadoPor ? (
              <div className="flex items-center gap-4">
                <img
                  src={task.assigneeAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(task.nomeCriadoPor)}&background=0D8ABC&color=fff`}
                  alt="criador"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
                  {task.nomeCriadoPor}
                </p>
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                Não há nenhum criador
              </p>
            )}
        </div>
              {/* Toggle Ativa */}
            <div className="flex items-center gap-3">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Ativa:</span>

              <button
                type="button"
                onClick={() => isEditing && setEditedIsActive(!editedIsActive)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 
                  ${isEditing 
                      ? (editedIsActive ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600')
                      : (task.isActive ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600')
                  }
                `}
                disabled={!isEditing}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
                    ${isEditing 
                        ? (editedIsActive ? 'translate-x-6' : 'translate-x-1')
                        : (task.isActive ? 'translate-x-6' : 'translate-x-1')
                    }
                  `}
                />
              </button>
            </div>

              {/* Prioridade editável */}
              {isEditing ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full max-w-xs">
                  <label className="text-gray-700 dark:text-gray-300 font-medium mb-1 sm:mb-0">
                    Prioridade:
                  </label>
                  <select
                    value={editedPriority}
                    onChange={(e) => setEditedPriority(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer"
                  >
                    <option value="">Selecione</option>
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                  </select>
                </div>
              ) : null}

              {/* Comentários */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Comentários <span className="ml-3 text-sm text-gray-500 dark:text-gray-400 font-normal">{task.comments} comentários</span>
                </h3>

                {task.comments > 0 ? (
                  <CommentsTask taskId={task.id} onAddComment={() => {}} />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                    Nenhum comentário ainda. Seja o primeiro a comentar!
                  </p>
                )}
              </div>

              <CreateComment idTarefa={task.id} idUsuario={user.idUsuario} />
            </div>

            {/* Sidebar direita */}
            <div className="xl:col-span-1 space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Detalhes</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Criado em:</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">{formatDate(task.dtCreated)}</span>
                  </div>
                  {task.dtTermino && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Prazo:</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedDeadline}
                          onChange={(e) => setEditedDeadline(e.target.value)}
                          className="w-28 px-2 py-1 bg-white dark:bg-gray-700 border border-blue-500 dark:border-blue-400 rounded text-gray-900 dark:text-gray-100 text-sm"
                        />
                      ) : (
                        <span className="text-gray-900 dark:text-gray-100 font-medium">{editedDeadline}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

               <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Anexos
                </h3>
                <div className="space-y-3">
                  {attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition group">
                      <svg className={`w-5 h-5 flex-shrink-0 ${attachment.type === 'pdf' ? 'text-red-600' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0014.586 6L12 3.414A2 2 0 0010.586 3H6a2 2 0 00-2 1z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{attachment.name}</span>
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveAttachment(attachment.id, attachment.name)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition"
                        >
                          <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <button 
                    onClick={handleAddAttachment}
                    className="mt-4 w-full text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-dashed border-blue-300 dark:border-blue-600 rounded-lg py-3 hover:border-blue-500 transition flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Adicionar anexo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-8 py-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-end gap-4">
          <DeleteButtonTask
            onDelete={async () => {
              await deleteTask(task.id);
              showMessage.success("Tarefa excluída com sucesso!", true);
            }}
            onDeleteSuccess={onClose}
          />

          <button onClick={onClose} className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition">
            Fechar
          </button>

          {isEditing ? (
            <>

              <button
              onClick={handleCancelEdit}
              disabled={state.loadingEditTask}
              className={`
                px-6 py-3 rounded-lg font-medium transition
                ${state.loadingEditTask ? "bg-gray-400 cursor-not-allowed text-white" : "bg-gray-500 hover:bg-gray-600 text-white"}
              `}
            >
              {state.loadingEditTask ? "Aguarde..." : "Cancelar"}
            </button>

            <button
              onClick={handleSave}
              disabled={state.loadingEditTask}
              className={`
                px-6 py-3 rounded-lg font-medium transition
                ${state.loadingEditTask ? "bg-blue-300 cursor-not-allowed text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}
              `}
            >
              {state.loadingEditTask ? "Salvando..." : "Salvar Alterações"}
            </button>

            </>
          ) : (
            <button onClick={handleEdit} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition">Editar</button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
