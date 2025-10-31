import { Edit } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSectors } from "../../../hooks/useSectors";
import { useKanbanMember } from "../../../hooks/useKanbanMember";
import { useEffect } from "react";
import { formatDate } from "../../../utils/formatDate";
import { DeleteFramerButton } from "../../../components/DeleteFramerButton";

export default function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { sectors } = useSectors();
  const projeto = sectors.find((p) => p.idSetor === parseInt(id));

  const { state, dispatch } = useKanbanMember();
  
  useEffect(() => {
    if (id) {
      dispatch({ type: "SET_SETOR_FILTER", payload: id });
    }
  }, [id, dispatch]);

  const { boards, loading, error } = state;

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
      </div>

      {/* Quadros associados */}
      <div>
  <h2 className="text-2xl font-semibold mb-4">Quadros Associados</h2>

  {loading ? (
    <div className="flex justify-center items-center py-10">
      <p className="text-gray-500">Carregando quadros...</p>
    </div>
  ) : error ? (
    <p className="text-red-500">Erro: {error}</p>
  ) : boards.length === 0 ? (
    <p>Nenhum quadro encontrado para este projeto.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {boards.map((board) => (
        <div
          key={board.id}
          className="relative bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
        >
          {/* Botões */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button className="p-1 text-blue-500 hover:text-blue-400">
              <Edit size={18} />
            </button>
            <DeleteFramerButton id={board.idQuadro} />
          </div>

          <h3 className="font-bold text-lg mb-1">{board.nome}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">{board.descricao}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Criado em: {formatDate(board.createdAt)}
          </p>
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  );
}

