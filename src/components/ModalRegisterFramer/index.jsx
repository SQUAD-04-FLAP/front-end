import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFramer } from '../../hooks/useFramer';
import { showMessage } from '../../adapters/showMessage';

export function ModalRegisterFramer({ isOpen, onClose }) {
  const [nomeQuadro, setNomeQuadro] = useState("");

  const [statusPadroes, setStatusPadroes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { createFramer } = useFramer();

  const handleClose = () => {
    setNomeQuadro("");
    setStatusPadroes([]);
    onClose(); // fecha o modal original
  };

    const statusOptions = [
    "A Fazer",
    "Em Progresso",
    "Concluído",
    "Planejamento",
    "Em Desenvolvimento",
    "Em Revisão",
    "Aguardando Aprovação",
    "Aprovado",
    "Finalizado"
  ];


  const handleAddStatus = (e) => {
    const value = e.target.value;
    if (!value) return;

    if (!statusPadroes.includes(value)) {
      setStatusPadroes(prev => [...prev, value]);
    }

    // reseta para permitir novas seleções
    e.target.value = "";
  };

  const removeStatus = (status) => {
    setStatusPadroes(prev => prev.filter(item => item !== status));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!nomeQuadro) return;

    try {
      await createFramer({
        nome: nomeQuadro,
        statusPadroes: statusPadroes
      });

      setNomeQuadro("");
      setStatusPadroes([]);

      showMessage.success("Quadro criado com sucesso!", true);
      onClose();
    } catch (e) {
      showMessage.error("Ocorreu um erro ao criar o quadro.");
      console.error("Erro ao criar quadro:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex justify-center items-center bg-[rgba(0,0,0,0.5)]"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white w-full max-w-lg rounded-lg p-8 shadow-lg relative"
          >
            <h3 className="text-blue-600 text-xl font-semibold mb-4">
              Adicionar Quadro
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              
              {/* Nome */}
              <input
                type="text"
                placeholder="Nome do quadro"
                value={nomeQuadro}
                onChange={(e) => setNomeQuadro(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-blue-600"
              />

              {/* Status (Múltiplos) */}
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Status do quadro</label>

                <select
                  onChange={handleAddStatus}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-blue-600"
                >
                  <option value="">Adicionar status...</option>
                  {statusOptions.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                {/* Tags de status */}
                {statusPadroes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {statusPadroes.map((status, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2 text-sm"
                      >
                        {status}
                        <button
                          type="button"
                          onClick={() => removeStatus(status)}
                          className="text-blue-900 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Botões */}
              <div className="flex justify-end gap-4 mt-4">
                <button type="button" className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-900" onClick={handleClose}>Cancelar</button>
                <button
                  type="submit"
                  disabled={!nomeQuadro.trim() || isLoading}
                  className={`px-6 py-3 rounded-lg text-white ${
                    !nomeQuadro.trim() || isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isLoading ? (
                    <>
                      Adicionando...
                    </>
                  ) : (
                    "Adicionar quadro"
                  )}
                </button>
              </div>

            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
