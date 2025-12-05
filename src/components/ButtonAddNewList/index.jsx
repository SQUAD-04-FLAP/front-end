import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKanbanMember } from "../../hooks/useKanbanMember";
import { showMessage } from "../../adapters/showMessage";

export function ButtonAddNewList() {
  const [isOpen, setIsOpen] = useState(false);
  const [listName, setListName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { state, create_status, dispatch } = useKanbanMember();

  const handleCreate = async () => {
  if (!listName.trim()) return showMessage.warn("Digite um nome para a lista!", true);
  if (!state.selectedBoard) return alert("Nenhum quadro selecionado!");

  try {
    setIsLoading(true);

    const newStatus = await create_status(state.selectedBoard, listName);

    dispatch({
      type: "CREATE_STATUS_SUCCESS",
      payload: newStatus,
    });

    showMessage.success("Nova lista criada com sucesso!", true);

    setListName("");
    setIsOpen(false);
  } catch (err) {
    showMessage.error("Aconteceu um problema ao criar uma nova lista.", true);
    console.error("Erro ao criar status:", err);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      {/* Botão principal */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center justify-center min-w-[250px] h-[200px]
          border-2 border-dashed border-gray-400 dark:border-gray-600
          rounded-2xl text-gray-500 dark:text-gray-300
          hover:border-indigo-500 hover:text-indigo-500
          transition-all duration-200"
      >
        <span className="text-2xl font-bold">+</span>
        <span className="text-sm">Adicionar nova lista</span>
      </button>

      {/* Modal com transição suave */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Fundo escuro */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed z-50 inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-[90%] max-w-md">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Criar nova lista
                </h2>

                <input
                  type="text"
                  placeholder="Nome"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 mb-4
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    disabled={isLoading}
                    className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 transition disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={!listName.trim() || isLoading} // bloqueia se input vazio ou carregando
                    className={`px-4 py-2 rounded-xl text-white transition
                      ${!listName.trim() || isLoading
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Criando...
                      </div>
                    ) : (
                      "Criar"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
