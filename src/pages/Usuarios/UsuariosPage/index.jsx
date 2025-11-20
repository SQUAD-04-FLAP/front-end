import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export default function UsuariosPage() {
    const { allUsers } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const usuario = allUsers.find((user) => user.idUsuario === parseInt(id));

    return(
        <div>
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition cursor-pointer"
            >
                ← Voltar
            </button>

            <h1>{usuario.nome}</h1>
        </div>
    );
}