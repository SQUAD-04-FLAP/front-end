import { useNavigate } from "react-router-dom";
import { useSectors } from "../../hooks/useSectors";
import { Building2, ChevronRight } from "lucide-react";

export default function Dashboard() {
  const { sectors } = useSectors();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100 dark:bg-gray-900">
     <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
      Acesse um Dashboard
    </h1>

    <p className="text-gray-600 dark:text-gray-300 mb-6">
      Acesse rapidamente os painéis de cada empresa. Escolha um dos dashboards abaixo para visualizar métricas, relatórios e informações essenciais para a gestão do seu time.
    </p>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector) => (
          <button
            key={sector.idSetor}
            onClick={() => navigate(`/dashboard/${sector.idSetor}`)}
            className="
              group relative w-full p-6 rounded-2xl shadow-md
              bg-white dark:bg-gray-800 border border-gray-200 
              dark:border-gray-700 transition-all 
              hover:shadow-xl hover:-translate-y-1 cursor-pointer
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  p-4 rounded-xl bg-blue-100 dark:bg-blue-500/20 
                  text-blue-600 dark:text-blue-400
                "
              >
                <Building2 size={32} />
              </div>

              <div className="flex-1 text-left">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {sector.nome}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Clique para acessar o painel
                </p>
              </div>

              <ChevronRight
                size={24}
                className="text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
