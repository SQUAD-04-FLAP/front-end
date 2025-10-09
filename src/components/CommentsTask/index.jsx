import { useEffect, useState } from "react";
import { fetchTaskById } from "../../services/tasks";

export function CommentsTask({ taskId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId) return;

    const loadComments = async () => {
      try {
        setLoading(true);
        const task = await fetchTaskById(taskId);
        setComments(task.comentarios || []);
      } catch (error) {
        console.error("Erro ao carregar comentários:", error);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [taskId]);

  if (loading) return <p className="text-white">Carregando comentários...</p>;
  if (comments.length === 0) return <p>Nenhum comentário ainda!</p>;

  return (
    <div className="space-y-6">
      {comments.map((c) => (
        <div key={c.idComentario} className="flex gap-4 p-4 bg-white dark:bg-gray-700 rounded-xl text-white">
          <img src={c.avatar || "img/profile-default.jpg"} alt={c.nomeUsuario} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-semibold">{c.nomeUsuario}</span>
              <span className="text-sm text-gray-500">{new Date(c.createdAt).toLocaleString("pt-BR")}</span>
            </div>
            <p>{c.mensagem}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

