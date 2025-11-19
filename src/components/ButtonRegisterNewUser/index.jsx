import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ButtonRegisterNewUser() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* BOTÃO */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
      >
        + Cadastrar novo usuário
      </button>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }} // animação leve
            />

            {/* CONTEÚDO */}
            <motion.div
              className="fixed z-50 bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-6 w-[90%] max-w-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.92, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }} // animação suave
            >
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Cadastrar Usuário</h2>

              <form className="flex flex-col gap-4">

                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">Nome</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 p-2 rounded-lg dark:text-white"
                    placeholder="Digite o nome"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white dark:placeholder:text-white">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 p-2 rounded-lg dark:text-white"
                    placeholder="Digite o email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">Senha</label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 p-2 rounded-lg dark:text-white"
                    placeholder="Digite a senha"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Cadastrar
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full mt-1 text-center py-2 rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 transition dark:text-white"
                >
                  Cancelar
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
