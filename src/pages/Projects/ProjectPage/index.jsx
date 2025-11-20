import { useState } from "react";
import { Edit, Paperclip, File, Image, FileText, X, Download } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSectors } from "../../../hooks/useSectors";
import { formatDate } from "../../../utils/formatDate";

export default function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { sectors } = useSectors();
  const projeto = sectors.find((p) => p.idSetor === parseInt(id));
  
  const [attachments, setAttachments] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      url: URL.createObjectURL(file)
    }));

    setAttachments([...attachments, ...newAttachments]);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (type.includes('pdf')) return <FileText className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const removeAttachment = (id) => {
    setAttachments(attachments.filter(att => att.id !== id));
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">

      {/* Botão Voltar */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition cursor-pointer"
      >
        ← Voltar
      </button>

      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">{projeto?.nome}</h1>
      </div>

      {/* Informações gerais */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-2">
        {projeto?.descricao && (
          <p><strong>Descrição:</strong> {projeto.descricao}</p>
        )}
        <p><strong>Data de criação:</strong> {formatDate(projeto?.createdAt)}</p>
        <p><strong>Última atualização:</strong> {formatDate(projeto?.updatedAt)}</p>
        
        {/* Seção de Anexos */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Paperclip className="w-5 h-5" />
              Anexos
            </h2>
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Paperclip className="w-4 h-4" />
              Adicionar arquivo
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
            </label>
          </div>

          {attachments.length === 0 ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <Paperclip className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 mb-2">Nenhum anexo adicionado</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Clique em "Adicionar arquivo" para fazer upload de documentos e imagens
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
                >
                  <div className="text-blue-600 dark:text-blue-400 flex-shrink-0">
                    {getFileIcon(attachment.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {attachment.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{attachment.size}</p>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={attachment.url}
                      download={attachment.name}
                      className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900 rounded text-blue-600 dark:text-blue-400"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => removeAttachment(attachment.id)}
                      className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900 rounded text-red-600 dark:text-red-400"
                      title="Remover"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {attachments.length > 0 && (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {attachments.length} {attachments.length === 1 ? 'arquivo anexado' : 'arquivos anexados'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}