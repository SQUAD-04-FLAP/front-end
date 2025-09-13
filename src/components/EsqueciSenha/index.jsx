import { RouterLinks } from "../RouterLinks";

export default function EsqueciSenha() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
          Esqueci a senha
        </h1>
        <p className="text-sm text-gray-600 text-center mt-8 mb-6">
          Digite seu email para recuperar sua senha
        </p>

        <form>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-4"
          >
            Enviar
          </button>
        </form>

       <div className="text-center mt-4">
          <RouterLinks
            href="/login"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            ← Voltar ao login
          </RouterLinks>
      </div>

      </div>
    </div>
  );
}

