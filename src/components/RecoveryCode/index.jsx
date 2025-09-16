import { useState } from "react";
import { recoveryPassword } from "../../services/recoveryPassword";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../RouterLinks";

export default function ResetPassword() {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await recoveryPassword.recovery(code, newPassword);

      if(result.success) {
         toast.success("Sua senha foi redefinida com sucesso.", {
               autoClose: 1000, // 1 segundo
               onClose: () => navigate("/login"), // redireciona quando o toast fecha
        });
      }
    } catch(e) {
      console.log(e);
      toast.error("Ocorreu um erro ao tentar recuperar a senha." | e)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold text-center mb-2">Redefinir sua senha</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Insira o código enviado para o seu e-mail e escolha uma nova senha.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Código de recuperação"
            className="w-full rounded-lg border border-gray-300 p-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nova senha"
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={code.length !== 6 || newPassword.length < 6 || loading}
            className="w-full py-3 cursor-pointer bg-blue-600 text-white font-semibold rounded-lg disabled:bg-gray-400 transition"
          >
            {loading ? "Alterando..." : "Alterar senha"}
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm text-blue-600">
          <button className="hover:underline">Reenviar código</button>

          <RouterLinks to={"/login"} className="hover:underline">
              Voltar para login
          </RouterLinks>
        </div>
      </div>
    </div>
  );
}
