import { Image, Mail, ShieldCheck, User, Calendar, PartyPopper } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { formatDate } from '../../utils/formatDate';
import { format } from "date-fns";

export default function Configuracoes() {
  const { user, updateUserById, loadingUpdateUserById, errorUpdateUserById } = useAuth();

  const [formData, setFormData] = useState({
    nome: user.nome || "",
    avatar: user?.avatar || "",
    dtNascimento: user.dtNascimento
    ? format(new Date(user.dtNascimento), "yyyy-MM-dd")
    : ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserById(user.idUsuario, formData);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10">
      <div className="w-[96%] md:w-[90%] lg:w-[85%] mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Configurações do Sistema
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gerencie todos os detalhes da sua conta
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Visualizar Perfil */}
          <div className="flex-1 shadow-2xl p-6 rounded-2xl bg-white dark:bg-gray-800/40 backdrop-blur-md">
            <h2 className="text-3xl font-bold mb-4 dark:text-white flex items-center gap-2">
              Meu Perfil
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex justify-center md:block">
                <img 
                  src={user.avatar || "https://ui-avatars.com/api/?name=" + user.nome}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                />
              </div>

              <div className="flex-1 grid gap-4">
                {/* Nome */}
                <div className="flex items-center gap-3 p-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
                  <User className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  <div>
                    <p className="text-gray-500 text-sm dark:text-gray-400">Nome</p>
                    <p className="font-semibold dark:text-gray-200">{user.nome}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 p-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
                  <Mail className="w-6 h-6 text-green-600 dark:text-green-300" />
                  <div>
                    <p className="text-gray-500 text-sm dark:text-gray-400">Email</p>
                    <p className="font-semibold dark:text-gray-200">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
                <PartyPopper className="w-6 h-6 text-pink-600 dark:text-pink-300" />
                <div>
                  <p className="text-gray-500 text-sm dark:text-gray-400">Aniversário</p>
                  <p className="font-semibold dark:text-gray-200">
                    {user.dtNascimento ? formatDate(user.dtNascimento) : "Não informado"}
                  </p>
                </div>
              </div>

                {/* Permissão */}
                <div className="flex items-center gap-3 p-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
                  <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                  <div>
                    <p className="text-gray-500 text-sm dark:text-gray-400">Permissão</p>
                    <p className="font-semibold dark:text-gray-200">
                      {user.permissao === "ADMIN" ? "Administrador" : "Membro"}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Editar Perfil */}
          <div className="flex-1 shadow-2xl p-6 rounded-2xl bg-white dark:bg-gray-800/40 backdrop-blur-md">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Editar Perfil</h2>

            {errorUpdateUserById && (
              <p className="text-red-500 mb-4">{errorUpdateUserById}</p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              {/* Foto de perfil */}
              <div className="flex justify-center">
                <div className="relative">
                  <img 
                    src={formData.avatar || "https://ui-avatars.com/api/?name=" + user.nome}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                  />

                  <label
                    htmlFor="upload_profile"
                    className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer dark:bg-gray-700"
                  >
                    <Image className="w-6 h-6 text-blue-600" />
                  </label>
                  <input 
                    type="file" 
                    id="upload_profile" 
                    hidden 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setFormData({ ...formData, avatar: reader.result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Nome */}
              <div>
                <label className="dark:text-gray-200 font-medium">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="mt-2 p-4 w-full border rounded-lg dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                />
              </div>       

              {/* Data de Nascimento */}
              <div>
                <label className="dark:text-gray-200 font-medium">Data de Nascimento</label>
                <input
                  type="date"
                  name="dtNascimento"
                  value={formData.dtNascimento}
                  onChange={handleChange}
                  className="mt-2 p-4 w-full border rounded-lg dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                />
              </div>

              <button 
                type="submit"
                disabled={loadingUpdateUserById}
                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg"
              >
                {loadingUpdateUserById ? "Salvando..." : "Salvar Alterações"}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
