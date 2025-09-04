import React, {useState} from "react";
import axios from "axios";
import GoogleButton from "../assets/google-button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("token", {
        email,
        password,
      });

      console.log("Resposta do servidor:", response.data);
    } catch (err) {
      console.error(err);
      setError("Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">FLAP</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                         outline-none transition-all"
              placeholder="Seuemail@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                         outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Lembrar senha</span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
              Esqueceu a senha?
            </a>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <p className="mb-2 text-center text-sm text-gray-600">ou</p>
          <GoogleButton />
        </form>
        <div className="text-center text-sm text-gray-600">
          Ainda não tem uma conta?
          <a href="#" className="ml-1 text-indigo-600 hover:text-indigo-500 font-medium">
            Cadastre-se
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
