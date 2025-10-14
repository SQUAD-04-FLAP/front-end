import { useState } from "react";
import { sendTaskComment } from "../../services/tasks";

export function CreateComment({ idTarefa, idUsuario, onCommentAdded }) {
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendComment = async () => {
    if (!mensagem.trim()) return; // evita enviar vazio

    setLoading(true);
    try {
      const newComment = await sendTaskComment(idTarefa, mensagem, idUsuario);
      setMensagem(""); // limpa textarea
      if (onCommentAdded) onCommentAdded(newComment); // callback para atualizar lista
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
      alert("Erro ao enviar comentário. Tente novamente.");
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
