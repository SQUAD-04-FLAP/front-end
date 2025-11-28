import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, X } from "lucide-react";
import { useFramer } from '../../hooks/useFramer';
import { showMessage } from '../../adapters/showMessage';

export function ButtonEditFramer({ framer }) {
  const {updateFramerHandler, loading} = useFramer();
  const [isOpen, setIsOpen] = useState(false);
  const [nome, setNome] = useState(framer.nome || "");
  const [ativo, setAtivo] = useState(framer.ativo ?? true);

  // Atualiza os campos quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      setNome(framer.nome || "");
      setAtivo(framer.ativo ?? true);
    }
  }, [isOpen, framer]);

  const handleSubmit = async () => {
    try {
      await updateFramerHandler(framer.idQuadro, { nome, ativo });
      setIsOpen(false);
      showMessage.success("Quadro atualizado com sucesso!", true);
    } catch (e) {
      showMessage.error("Não foi possível atualizar o quadro.", true);
      console.error("Erro ao atualizar quadro:", e);
    }
  };

  return (
    <>
      <button
        title="Editar"
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Edit className="w-4 h-4 text-blue-500" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-md relative">
                <button
                  className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                >
                  <X className="w-4 h-4" />
                </button>

                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                  Editar Quadro
                </h2>

                {/* Nome */}
                <div className="mb-4">
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                  />
                </div>

                {/* Ativo */}
                <div className="mb-6 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="ativo"
                    checked={ativo}
                    onChange={(e) => setAtivo(e.target.checked)}
                    className="w-4 h-4 accent-blue-500"
                    disabled={loading}
                  />
                  <label htmlFor="ativo" className="text-gray-700 dark:text-gray-300">
                    Ativo
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  className={`w-full py-2 rounded-lg text-white font-semibold transition ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
