import { useState } from "react";
import { useComments } from "../../hooks/useComments";
import { useAuth } from '../../hooks/useAuth';
import { sendTaskComment } from "../../services/tasks";

export function CreateComment({ idTarefa, idUsuario }) {
  const { dispatch } = useComments();
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const handleSendComment = async () => {
    if (!mensagem.trim()) return;

    try {
      setLoading(true);

      // envia para a API
      const newComment = await sendTaskComment(idTarefa, mensagem, idUsuario);

      dispatch({ 
      type: "ADD_COMMENT", 
      payload: { 
        ...newComment, 
        mensagem, 
        nomeUsuario: user.nome, 
        idUsuario: user.idUsuario,
        avatar: user.avatar,
        createdAt: new Date().toISOString()
      } 
    });
      
      // limpa o campo
      setMensagem("");
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
      <textarea
        placeholder="Adicione um comentário..."
        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 resize-none"
        rows="4"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        disabled={loading}
      />
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSendComment}
          disabled={loading || !mensagem.trim()}
          className={`px-6 py-3 rounded-lg font-medium transition ${
            loading || !mensagem.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Enviando..." : "Comentar"}
        </button>
      </div>
    </div>
  );
}


