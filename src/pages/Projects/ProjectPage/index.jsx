import { Edit } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSectors } from "../../../hooks/useSectors";
import { formatDate } from "../../../utils/formatDate";

export default function ProjectDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { sectors } = useSectors();
  const projeto = sectors.find((p) => p.idSetor === parseInt(id));


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
    </div>
  );
}

