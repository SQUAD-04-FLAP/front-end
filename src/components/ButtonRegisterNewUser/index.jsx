import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '../../hooks/useAuth';
import { showMessage } from '../../adapters/showMessage';

export function ButtonRegisterNewUser() {
  const { register, loadingRegister, errorRegister } = useAuth();

  const [open, setOpen] = useState(false);

  // estados dos inputs
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dtNascimento, setdtNascimento] = useState("");

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await register(nome, email, senha, dtNascimento);

    if (result) {
      setOpen(false);
      showMessage.success("Usuário registrado com sucesso", true);
      setNome("");
      setEmail("");
      setSenha("");
      setdtNascimento("");
    }
  };

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
              transition={{ duration: 0.15 }}
            />

            {/* CONTEÚDO */}
            <motion.div
              className="fixed z-50 bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-6 w-[90%] max-w-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.92, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Cadastrar Usuário
              </h2>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                
                {/* Nome */}
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 p-2 rounded-lg dark:text-white"
                    placeholder="Digite o nome"
                    required
                  />
                </div>

                 {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 p-2 rounded-lg dark:text-white"
                    placeholder="Digite o email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    value={dtNascimento}
                    onChange={(e) => setdtNascimento(e.target.value)}
                    className="w-full border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 p-2 rounded-lg dark:text-white"
                  />
              </div>

                {/* Senha */}
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 p-2 rounded-lg dark:text-white"
                    placeholder="Digite a senha"
                    required
                  />
                </div>

                {/* ERROR MESSAGE */}
                {errorRegister && (
                  <div className="text-red-600 text-sm text-center">
                    {errorRegister}
                  </div>
                )}

                {/* BOTÃO CADASTRAR */}
                <button
                  type="submit"
                  disabled={loadingRegister}
                  className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loadingRegister ? "Cadastrando..." : "Cadastrar"}
                </button>

                {/* CANCELAR */}
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
