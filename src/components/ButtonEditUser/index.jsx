import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export function ButtonEditUser({ user }) {
  const { updateUserById, loadingUpdateUserById, errorUpdateUserById } = useAuth();

  const [open, setOpen] = useState(false);
  const [ativo, setAtivo] = useState(user.ativo);
  const [nome, setNome] = useState(user.nome || "");
  const [dtNascimento, setdtNascimento] = useState(user.dtNascimento || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nome,
      ativo,
      dtNascimento,
    };

    // console.log("PAYLOAD ENVIADO:", payload);
    // console.log("ID ENVIADO:", user.idUsuario);

    try {
      await updateUserById(user.idUsuario, payload);

      setOpen(false);
    } catch (e) {
        console.log(e);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-gray-200 dark:border-slate-600 px-3 py-1 cursor-pointer"
      >
        <Edit className="h-4 w-4" />
        Editar
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-xl border dark:border-slate-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Editar Usuário</h2>
                <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nome</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="border dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                    required
                  />
                </div>

                 <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Data de Nascimento</label>
                  <input
                    type="date"
                    value={dtNascimento}
                    onChange={(e) => setdtNascimento(e.target.value)}
                    className="border dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={ativo}
                    onChange={(e) => setAtivo(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">Usuário Ativo</span>
                </div>

                {errorUpdateUserById && (
                  <p className="text-red-600 text-sm">{errorUpdateUserById}</p>
                )}

                <button
                  type="submit"
                  disabled={loadingUpdateUserById}
                  className="bg-blue-600 text-white rounded-lg py-2 mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loadingUpdateUserById && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  Salvar
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}