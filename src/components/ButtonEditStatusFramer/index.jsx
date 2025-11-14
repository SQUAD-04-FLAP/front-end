import { useState } from "react";
import { Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {useKanbanMember} from '../../hooks/useKanbanMember';
import { showMessage } from '../../adapters/showMessage';

export function ButtonEditStatusFramer({ status }) {
  const { update_status } = useKanbanMember();
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState(status.name);
  const [loading, setLoading] = useState(false);

   const handleSave = async () => {
    showMessage.dismiss();

     setLoading(true);

    try {
      await update_status(status.id, nome);
      showMessage.success("Status atualizado com sucesso!", true);
      setOpen(false); // fecha modal
    } catch (e) {
      console.error("Erro ao atualizar status:", e);
      showMessage.error("Não foi possível atualizar o status do quadro.", true);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botão */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-full text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800
                  hover:text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700
                  transition-all duration-200 cursor-pointer shadow-sm"
        title="Editar tarefa"
      >
        <Pencil size={15} strokeWidth={2.2} />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Fundo escuro */}
            <motion.div
              className="absolute inset-0 bg-black/30 dark:bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Conteúdo do modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative dark:text-white bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-80 z-10"
            >
              <h2 className="text-lg font-semibold mb-4">Editar</h2>

              <label className="text-sm text-gray-500 dark:text-gray-400">Nome</label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                type="text"
                placeholder="Digite o novo nome"
                className="w-full mt-1 mb-4 p-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancelar
                </button>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className={`px-4 py-2 text-sm rounded-lg transition text-white 
                                ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                    {loading ? "Salvando..." : "Salvar"}
                </button>

                {/* <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Salvar
                </button> */}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
