import { motion, AnimatePresence } from "framer-motion";

export function ModalRegisterFramer({ isOpen, onClose }) {
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
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nome do quadro"
                className="w-full px-4 py-3 border rounded-lg focus:outline-blue-600"
              />
              <textarea
                placeholder="Descrição (opcional)"
                className="w-full px-4 py-3 border rounded-lg focus:outline-blue-600"
              />
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-900"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}