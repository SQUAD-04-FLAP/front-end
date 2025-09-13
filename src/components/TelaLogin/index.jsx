import axios from "axios";
import React, {useState} from "react"
import GoogleButton from "../GoogleButton";
import { RouterLinks } from "../RouterLinks";

export function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    
    try{
      const response = await axios.post('ENDERECO',{
        email,
        senha,
      });

      const {token} = response.data;

      localStorage.setItem('token', token);

      alert('Login realizado com sucesso!');
      console.log('token', token);

    } catch (err){
      console.error(err);
      setErro('Email ou senha inválidos');
    } finally{
      setLoading(false);
    }
  }

    return(
    <div className="flex h-screen items-center justify-center p-4">
      <div className="max-w-sm w-full rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">FLAP</h2>

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
              placeholder="Seuemail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
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

            <RouterLinks href={"/forget-password"} className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
              Esqueceu a senha?
            </RouterLinks>
          </div>
          
          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          <div className="mt-0 text-center text-sm text-gray-600">ou</div>
          <div className="flex justify-center">
            <GoogleButton />
          </div>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Ainda não tem uma conta?
          <a href="#" onSubmit={handleLogin} className="ml-1 text-indigo-600 hover:text-indigo-500 font-medium cursor-pointer">
            Cadastre-se
          </a>
        </div>
      </div>
    </div>
  );
}