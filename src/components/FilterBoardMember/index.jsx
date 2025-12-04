import { useState, useEffect } from "react";
import { useFramer } from "../../hooks/useFramer";
import { ChevronDown, Loader2, Inbox, Columns } from "lucide-react";
import { useKanbanMember } from "../../hooks/useKanbanMember";

export function FilterBoardMember({ ...props }) {
  const { framers, isLoading } = useFramer();
  const { dispatch } = useKanbanMember();

  const [quadroSelecionado, setQuadroSelecionado] = useState("");
  const [status, setStatus] = useState("loading");

  // Atualiza o status do carregamento
  useEffect(() => {
    if (isLoading) {
      setStatus("loading");
    } else if (framers && framers.length > 0) {
      setStatus("loaded");
    } else {
      setStatus("empty");
    }
  }, [framers, isLoading]);

  // Seleciona quadro salvo no localStorage
  
  // useEffect(() => {
  //   if (status === "loaded" && framers.length > 0) {
  //     const savedBoard = localStorage.getItem("selectedBoard");
  //     const savedBoardName = localStorage.getItem("selectedBoardName");
  //     const savedBoardStatus = localStorage.getItem("selectedBoardStatus");

  //     if (savedBoard) {
  //       const quadro = framers.find(f => f.idQuadro === parseInt(savedBoard));
  //       const name = quadro?.nome || savedBoardName;
  //       const statusList = quadro?.status || JSON.parse(savedBoardStatus || "[]");

  //       setQuadroSelecionado(savedBoard);

  //       dispatch({
  //         type: "SET_QUADRO_FILTER",
  //         payload: { id: savedBoard, name, statusList },
  //       });
  //     }
  //   }
  // }, [framers, status, dispatch]);

  // Quando usuário muda o select
  const handleChange = (e) => {
  const id = e.target.value;
  const quadro = framers.find(f => f.idQuadro === parseInt(id));
  const name = quadro?.nome || "";
  const statusList = quadro?.status || [];

  setQuadroSelecionado(id);
  localStorage.setItem("selectedBoard", id);
  localStorage.setItem("selectedBoardName", name);
  localStorage.setItem("selectedBoardStatus", JSON.stringify(statusList));

  // Atualiza filtro
  dispatch({
    type: "SET_QUADRO_FILTER",
    payload: { id, name, statusList },
  });

  // Adiciona o board ao estado boards
  dispatch({
    type: "SET_BOARDS",
    payload: [quadro], // ou [...state.boards, quadro] se quiser acumular
  });
};

  // const handleChange = (e) => {
  //   const id = e.target.value;
  //   const quadro = framers.find(f => f.idQuadro === parseInt(id));
  //   const name = quadro?.nome || "";
  //   const statusList = quadro?.status || [];

  //   setQuadroSelecionado(id);
  //   localStorage.setItem("selectedBoard", id);
  //   localStorage.setItem("selectedBoardName", name);
  //   localStorage.setItem("selectedBoardStatus", JSON.stringify(statusList));

  //   dispatch({
  //     type: "SET_QUADRO_FILTER",
  //     payload: { id, name, statusList },
  //   });
  // };

  return (
    <div className="relative inline-block">
      {status === "loading" ? (
        <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
          <Loader2 className="animate-spin w-4 h-4" />
          Carregando quadros...
        </div>
      ) : status === "empty" ? (
        <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
          <Columns className="w-4 h-4" />
          Nenhum quadro disponível
        </div>
      ) : (
        <>
          <select
            value={quadroSelecionado}
            onChange={handleChange}
            className="appearance-none px-4 py-2 pr-10 rounded-xl text-sm font-medium 
                       bg-white dark:bg-gray-800 
                       text-gray-700 dark:text-gray-200 
                       border border-gray-300 dark:border-gray-700 
                       shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       hover:border-blue-400 dark:hover:border-blue-400
                       transition duration-200 ease-in-out cursor-pointer"
            {...props}
          >
            <option value="">Selecionar quadro</option>
            {framers.map((quadro) => (
              <option key={quadro.idQuadro} value={quadro.idQuadro}>
                {quadro.nome}
              </option>
            ))}
          </select>

          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 
                       text-gray-500 dark:text-gray-400 pointer-events-none"
          />
        </>
      )}
    </div>
  );
}
