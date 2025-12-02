import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useTask } from "../../../hooks/useTask";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getUserPhoto } from "../../../utils/getUserPhoto";

export default function UsuariosPage() {
  const { allUsers } = useAuth();
  const { state, loadTasksByUser } = useTask();
  const { tasks, loading } = state;

  const navigate = useNavigate();
  const { id } = useParams();

  const usuario = allUsers.find(
    (user) => user.idUsuario === parseInt(id)
  );

  // ─────────────────────────
  // carregamento das tarefas
  // ─────────────────────────
  useEffect(() => {
    if (id) {
      loadTasksByUser(id);
    }
  }, [id]);

  if (!usuario) {
    return (
      <div className="p-6 text-center text-gray-700 dark:text-gray-300">
        Usuário não encontrado.
      </div>
    );
  }

  const formattedDate = usuario.createdAt
    ? format(new Date(usuario.createdAt), "dd/MM/yyyy", {
        locale: ptBR,
      })
    : "Sem registro";

  return (
    <div className="min-h-screen w-full px-6 py-10 bg-gray-100 dark:bg-gray-900 transition">

      {/* BOTÃO VOLTAR */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 px-4 py-2 bg-gray-200 dark:bg-gray-800 
        text-gray-800 dark:text-gray-200 rounded-lg shadow hover:bg-gray-300 
        dark:hover:bg-gray-700 transition cursor-pointer"
      >
        ← Voltar
      </button>

      {/* CARD PRINCIPAL */}
      <div className="mx-auto max-w-3xl rounded-2xl bg-white dark:bg-gray-800 shadow-xl p-10 transition">

        {/* FOTO + NOME */}
        <div className="flex flex-col items-center text-center mb-10">

          <img
            src={
              getUserPhoto(usuario) ||
              "https://ui-avatars.com/api/?name=" + usuario.nome
            }
            alt="Foto do usuário"
            className="w-32 h-32 rounded-full shadow-lg border-4 border-gray-200 dark:border-gray-700 object-cover"
          />

          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
            {usuario.nome}
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {usuario.email}
          </p>

          {/* STATUS */}
          <div className="flex gap-3 mt-4">

            <span
              className={`px-4 py-1 text-sm rounded-full font-medium ${
                usuario.ativo
                  ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200"
                  : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200"
              }`}
            >
              {usuario.ativo ? "Ativo" : "Inativo"}
            </span>

            <span
              className={`px-4 py-1 text-sm rounded-full font-medium ${
                usuario.permissao === "ADMIN"
                  ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200"
                  : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
              }`}
            >
              {usuario.permissao === "ADMIN"
                ? "Administrador"
                : "Membro"}
            </span>

          </div>
        </div>

        {/* INFORMAÇÕES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Provedor
            </span>
            <span className="text-lg font-medium text-gray-900 dark:text-gray-200">
              {usuario.provedor}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Criado em
            </span>
            <span className="text-lg font-medium text-gray-900 dark:text-gray-200">
              {formattedDate}
            </span>
          </div>

        </div>

        {/* TAREFAS */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Tarefas do Usuário
          </h2>

          {/* LOADING */}
          {loading && (
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
              Carregando tarefas...
            </div>
          )}

          {/* SEM RESULTADOS */}
          {!loading && tasks.length === 0 && (
            <p className="text-gray-600 dark:text-gray-400">
              Nenhuma tarefa atribuída.
            </p>
          )}

          {/* LISTA */}
          {!loading && tasks.length > 0 && (
            <ul className="space-y-3">
              {tasks.map((tarefa) => (
                <li
                  key={tarefa.idTarefa}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg 
                  bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{tarefa.titulo}</span>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        tarefa.nomeStatus === "Concluída"
                          ? "bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100"
                          : tarefa.nomeStatus === "Em Andamento"
                          ? "bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100"
                          : "bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100"
                      }`}
                    >
                      {tarefa.nomeStatus}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}
