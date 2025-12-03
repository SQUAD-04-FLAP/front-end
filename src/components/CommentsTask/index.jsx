import { useEffect } from "react";
import { fetchTaskById } from "../../services/tasks";
import { useAuth } from "../../hooks/useAuth";
import { useComments } from "../../hooks/useComments";
import { formatDate } from "../../utils/formatDate";
import { getUserPhoto } from "../../utils/getUserPhoto";

export function CommentsTask({ taskId }) {
  const { state, dispatch } = useComments();
  const { comments, loading } = state;
  const { user } = useAuth();

  useEffect(() => {
    if (!taskId) return;

    const loadComments = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const task = await fetchTaskById(taskId);
        dispatch({
          type: "SET_COMMENTS",
          payload: task.comentarios || [],
        });
      } catch (error) {
        console.error("Erro ao carregar comentários:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadComments();
  }, [taskId, dispatch]);

  if (loading) return <p className="text-white">Carregando comentários...</p>;
  if (comments.length === 0) return <p>Nenhum comentário ainda!</p>;

  return (
    <div className="space-y-6">
      {comments.map((c) => (
        <div
          key={c.idComentario}
          className="flex gap-4 p-4 bg-white dark:bg-gray-700 rounded-xl text-white"
        >
          <img
            src={getUserPhoto({ fotoUrl: c.fotoUrlUsuario, nome: c.nomeUsuario }) || "https://ui-avatars.com/api/?name=" + c.nomeUsuario}
            alt={c.nomeUsuario}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-semibold">
                {c.idUsuario === user.idUsuario ? "Você" : c.nomeUsuario}
              </span>
              <span className="text-sm text-gray-500">
                {formatDate(c.createdAt)}
              </span>
            </div>
            <p>{c.mensagem}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
