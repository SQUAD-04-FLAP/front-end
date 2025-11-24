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

export function CardModal({ isOpen, onClose, task }) {
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { user, allUsers } = useAuth();

  const { deleteTask } = useKanbanMember();
  
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
  const [tags, setTags] = useState([
    { id: 1, name: 'Front-end', color: 'gray' },
    { id: 2, name: 'UX/UI', color: 'blue' },
    { id: 3, name: 'Sprint 5', color: 'green' },
    { id: 4, name: 'Filtros', color: 'purple' }
  ]);
  const [activityHistory, setActivityHistory] = useState([
    { id: 1, user: 'Marina Silva', action: "alterou para 'Em Progresso'", time: 'há 2 horas', color: 'green' },
    { id: 2, user: 'Carlos Mendes', action: 'adicionou comentário', time: 'ontem às 16:43', color: 'blue' },
    { id: 3, user: 'João Santos', action: "moveu de 'A Fazer' para 'Em Progresso'", time: 'há 3 dias', color: 'yellow' }
  ]);
  
  // Estados para rastrear valores originais
  const [originalValues, setOriginalValues] = useState({});

  // Inicializar campos quando o task mudar
  useEffect(() => {
    if (task) {
      const initialValues = {
        title: task.title || '',
        description: task.description || '',
        deadline: '25/05/2023',
        createdDate: '10/05/2023',
        estimatedTime: '16',
        assignee: 'Carlos Mendes',
      };
      
      setEditedTitle(initialValues.title);
      setEditedDescription(initialValues.description);
      setEditedDeadline(initialValues.deadline);
      setEditedCreatedDate(initialValues.createdDate);
      setEditedEstimatedTime(initialValues.estimatedTime);
      setEditedAssignee(initialValues.assignee);
      setOriginalValues(initialValues);
    }
  }, [task]);

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

  const getTagClasses = (color) => {
    switch (color) {
      case 'gray':
        return 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
      case 'blue':
        return 'bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300';
      case 'green':
        return 'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-300';
      case 'purple':
        return 'bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300';
      case 'yellow':
        return 'bg-yellow-100 dark:bg-yellow-500/15 text-yellow-700 dark:text-yellow-300';
      case 'red':
        return 'bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-300';
      case 'pink':
        return 'bg-pink-100 dark:bg-pink-500/15 text-pink-700 dark:text-pink-300';
      case 'indigo':
        return 'bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300';
      default:
        return 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newActivities = [];
    
    // Verificar cada campo alterado
    if (editedTitle !== originalValues.title) {
      newActivities.push({
        id: Date.now() + Math.random(),
        user: 'Você',
        action: `alterou o título para "${editedTitle}"`,
        time: `agora às ${timeString}`,
        color: 'purple'
      });
    }
    
    if (editedDescription !== originalValues.description) {
      newActivities.push({
        id: Date.now() + Math.random(),
        user: 'Você',
        action: 'editou a descrição',
        time: `agora às ${timeString}`,
        color: 'purple'
      });
    }
    
    if (editedDeadline !== originalValues.deadline) {
      newActivities.push({
        id: Date.now() + Math.random(),
        user: 'Você',
        action: `alterou o prazo de ${originalValues.deadline} para ${editedDeadline}`,
        time: `agora às ${timeString}`,
        color: 'purple'
      });
    }
    
    if (editedEstimatedTime !== originalValues.estimatedTime) {
      newActivities.push({
        id: Date.now() + Math.random(),
        user: 'Você',
        action: `alterou o tempo estimado de ${originalValues.estimatedTime}h para ${editedEstimatedTime}h`,
        time: `agora às ${timeString}`,
        color: 'purple'
      });
    }
    
    if (editedAssignee !== originalValues.assignee) {
      newActivities.push({
        id: Date.now() + Math.random(),
        user: 'Você',
        action: `alterou o responsável de ${originalValues.assignee} para ${editedAssignee}`,
        time: `agora às ${timeString}`,
        color: 'purple'
      });
    }
  
    // Adicionar atividades ao histórico
    if (newActivities.length > 0) {
      setActivityHistory(prev => [...newActivities, ...prev]);
      
      // Atualizar valores originais
      setOriginalValues({
        title: editedTitle,
        description: editedDescription,
        deadline: editedDeadline,
        createdDate: editedCreatedDate,
        estimatedTime: editedEstimatedTime,
        assignee: editedAssignee,
      });
      
      alert(`${newActivities.length} alteração(ões) salva(s) com sucesso!`);
    } else {
      alert('Nenhuma alteração foi feita.');
    }
    
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    // Restaurar valores originais
    setEditedTitle(originalValues.title);
    setEditedDescription(originalValues.description);
    setEditedDeadline(originalValues.deadline);
    setEditedCreatedDate(originalValues.createdDate);
    setEditedEstimatedTime(originalValues.estimatedTime);
    setEditedAssignee(originalValues.assignee);
    setIsEditing(false);
  };

  const handleAddAttachment = () => {
    // Criar input de arquivo temporário
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '*/*';
    
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      
      if (files.length > 0) {
        const now = new Date();
        const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        files.forEach(file => {
          const newAttachment = {
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type.includes('pdf') ? 'pdf' : 'image'
          };
          
          setAttachments(prev => [...prev, newAttachment]);
          
          // Adicionar ao histórico
          setActivityHistory(prev => [{
            id: Date.now() + Math.random(),
            user: 'Você',
            action: `adicionou anexo "${file.name}"`,
            time: `agora às ${timeString}`,
            color: 'blue'
          }, ...prev]);
        });
      }
    };
    
    input.click();
  };

  const handleRemoveAttachment = (id, name) => {
    if (confirm(`Deseja remover o anexo "${name}"?`)) {
      setAttachments(prev => prev.filter(att => att.id !== id));
      
      // Adicionar ao histórico
      const now = new Date();
      const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      setActivityHistory(prev => [{
        id: Date.now(),
        user: 'Você',
        action: `removeu anexo "${name}"`,
        time: `agora às ${timeString}`,
        color: 'red'
      }, ...prev]);
    }
  };

  const handleAddComment = () => {
    if (comment.trim() === '') {
      alert('Por favor, escreva um comentário antes de enviar.');
      return;
    }

    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // Adicionar ao histórico de atividades
    setActivityHistory(prev => [{
      id: Date.now(),
      user: 'Você',
      action: 'adicionou comentário',
      time: `agora às ${timeString}`,
      color: 'blue'
    }, ...prev]);
    
    // Limpar campo de comentário
    setComment('');
  };

  const handleAddTag = () => {
    const tagName = prompt('Nome da etiqueta:');
    if (tagName && tagName.trim() !== '') {
      const colors = ['gray', 'blue', 'green', 'purple', 'yellow', 'red', 'pink', 'indigo'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const newTag = {
        id: Date.now(),
        name: tagName.trim(),
        color: randomColor
      };
      
      setTags(prev => [...prev, newTag]);
      
      // Adicionar ao histórico
      const now = new Date();
      const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      setActivityHistory(prev => [{
        id: Date.now(),
        user: 'Você',
        action: `adicionou etiqueta "${tagName.trim()}"`,
        time: `agora às ${timeString}`,
        color: 'green'
      }, ...prev]);
    }
  };

  const handleRemoveTag = (id, name) => {
    if (confirm(`Deseja remover a etiqueta "${name}"?`)) {
      setTags(prev => prev.filter(tag => tag.id !== id));
      
      // Adicionar ao histórico
      const now = new Date();
      const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      setActivityHistory(prev => [{
        id: Date.now(),
        user: 'Você',
        action: `removeu etiqueta "${name}"`,
        time: `agora às ${timeString}`,
        color: 'red'
      }, ...prev]);
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
            Detalhes do Card {isEditing && <span className="text-orange-500">(Editando)</span>}
          </h1>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 text-sm font-medium bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300 rounded-full">
              {task.status}
            </span>
            {task?.priority && (
              <span className={`px-4 py-2 text-sm font-medium rounded-full ${getPriorityClasses(task.priority)}`}>
                Prioridade: {task.prioridade}
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
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Descrição
                </h3>
                {isEditing ? (
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-blue-500 dark:border-blue-400 rounded-lg text-gray-900 dark:text-gray-100 resize-none"
                    rows="6"
                  />
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                    {editedDescription}
                  </p>
                )}
              </div>

              {/* Responsável */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Responsável
                </h3>
                {isEditing ? (
                  <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome
                  </label>

                <SelectMultiple
                options={allUsers.map(u => ({ value: u.idUsuario, label : u.nome, avatar: u.avatar || "https://ui-avatars.com/api/?name=" + u.nome}))}
                value={editedAssignee}
                onChange={setEditedAssignee}
                className="w-full h-12"
              />


                </div>
                ) : (
                  <div>
                    {task.nomeResponsavel ? (
                      <div className="flex items-center gap-4">
                      <img
                        src={
                          task.assigneeAvatar 
                            ? task.assigneeAvatar 
                            : "https://ui-avatars.com/api/?name=" + task.nomeResponsavel
                        }
                        alt="Responsável"
                        className="w-16 h-16 rounded-full object-cover"
                      />

                      <p className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
                        {task.nomeResponsavel}
                      </p>
                    </div>
                    ) : (
                       <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                          Não há ninguém responsável por essa tarefa ainda
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Comentários */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Comentários
                  <span className="ml-3 text-sm text-gray-500 dark:text-gray-400 font-normal">
                    {task.comments} comentários
                  </span>

                </h3>

                {task.comments > 0 ? (
                  <CommentsTask 
                    taskId={task.id}
                    onAddComment={handleAddComment} 
                  />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                        Nenhum comentário ainda. Seja o primeiro a comentar!
                  </p>
                )}
              </div>

              <CreateComment
                idTarefa={task.id}
                idUsuario={user.idUsuario}
              />

            </div>
            
            {/* Sidebar Direita (25%) */}
            <div className="xl:col-span-1 space-y-6">
              {/* Detalhes */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Detalhes
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Criado em:</span>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">{editedCreatedDate}</span>
                  </div>
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
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Tempo estimado:</span>
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={editedEstimatedTime}
                          onChange={(e) => setEditedEstimatedTime(e.target.value)}
                          className="w-16 px-2 py-1 bg-white dark:bg-gray-700 border border-blue-500 dark:border-blue-400 rounded text-gray-900 dark:text-gray-100 text-sm"
                        />
                        <span className="text-gray-900 dark:text-gray-100 text-sm">horas</span>
                      </div>
                    ) : (
                      <span className="text-gray-900 dark:text-gray-100 font-medium">{editedEstimatedTime} horas</span>
                    )}
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
                  {tags.map((tag) => (
                    <div
                      key={tag.id}
                      className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 group ${getTagClasses(tag.color)}`}
                    >
                      <span>{tag.name}</span>
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveTag(tag.id, tag.name)}
                          className="opacity-0 group-hover:opacity-100 hover:scale-110 transition"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={handleAddTag}
                  className="mt-4 w-full text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg py-3 hover:border-blue-300 transition"
                >
                  + Adicionar etiqueta
                </button>
              </div>

              {/* Anexos */}
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

              {/* Histórico de Atividades */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Histórico de Atividades
                </h3>
                <div className="space-y-3 text-sm max-h-64 overflow-y-auto">
                  {activityHistory.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-2">
                      <div className={`w-2 h-2 bg-${activity.color}-500 rounded-full mt-2 flex-shrink-0`}></div>
                      <div>
                        <p className="text-gray-900 dark:text-gray-100">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer com botões */}
      <div className="flex-shrink-0 px-8 py-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-end gap-4">

      <DeleteButtonTask
      onDelete={async () => {
        await deleteTask(task.id);
        showMessage.success("Tarefa excluída com sucesso!", true);
      }}
      onDeleteSuccess={onClose}
  />

          <button 
            onClick={onClose}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
          >
            Fechar
          </button>

          {isEditing ? (
            <>
              <button 
                onClick={handleCancelEdit}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
              >
                Salvar Alterações
              </button>
            </>
          ) : (
            <button 
              onClick={handleEdit}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
            >
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Usar Portal para renderizar fora da hierarquia DOM
  return createPortal(modalContent, document.body);
}