import { useState } from "react";

export function CommentsSection({ comments = [], onAddComment }) {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (comment.trim() === "") return;
    onAddComment(comment);
    setComment("");
  };

  return (
    <div className="space-y-6">
      {/* Lista de comentários */}
      <div className="space-y-4 mb-6">
        {comments.map((commentItem) => (
          <div
            key={commentItem.id}
            className="flex gap-4 p-4 bg-white dark:bg-gray-700 rounded-xl"
          >
            <img
              src={commentItem.avatar}
              alt={commentItem.user}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {commentItem.user}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {commentItem.time}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {commentItem.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário de comentário */}
      <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Adicione um comentário..."
          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 resize-none"
          rows="4"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
          >
            Comentar
          </button>
        </div>
      </div>
    </div>
  );
}
