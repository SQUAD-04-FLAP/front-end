import { Activity, BadgeCheck, Calendar, CircleDot, Edit, Eye, Mail, MoreHorizontal, MoreVertical, Shield, ShieldCheck, Trash, User } from 'lucide-react';
import { Loader2 } from "lucide-react";
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/formatDate';
import { toast } from 'react-toastify';
import { Dialog } from '../../components/Dialog';
import { showMessage } from '../../adapters/showMessage';
import { useNavigate } from 'react-router-dom';
import { ButtonEditUser } from '../ButtonEditUser';

export function TableUsers() {
  const navigate = useNavigate();
  
    const { 
      allUsers,
      loadingAllUser, 
      errorAllUser,

      deleteUserById,
      loadingDeleteUserById,
      errorDeleteUserById,

      updateRoleUserById
    } = useAuth();

    if (errorDeleteUserById) {
      showMessage.error(`${errorDeleteUserById}`, true);
  }
  
    console.log(allUsers);
  
    return(
      <div className="overflow-x-auto p-8">
        

      {/* LOADING */}
      {loadingAllUser && (
        <div className="flex items-center justify-center py-10 text-gray-600 dark:text-gray-300">
          <Loader2 className="animate-spin w-6 h-6 mr-3" />
          Carregando usuários...
        </div>
      )}

      {/* ERRO */}
      {errorAllUser && (
        <div className="text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 px-4 py-3 rounded-md">
          Erro ao carregar usuários: {errorAllUser}
        </div>
      )}

      {/* TABELA */}
      {!loadingAllUser && !errorAllUser && (
        <table className="min-w-full bg-white dark:bg-slate-900">
          <thead className="bg-gray-100 dark:bg-slate-800 whitespace-nowrap">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-300">
                <div className="flex items-center">
                  <User className='w-4 h-4 mr-2' />
                  Nome
                </div>
              </th>

              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-300">
                <div className="flex items-center">
                  <Mail className='w-4 h-4 mr-2' />
                  E-mail
                </div>
              </th>

              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-300">
                <div className="flex items-center">
                  <ShieldCheck className='w-4 h-4 mr-2' />
                  Permissão
                </div>
              </th>

              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-300">
                <div className="flex items-center">
                  <BadgeCheck className='w-4 h-4 mr-2' />
                  Status
                </div>
              </th>

              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-300">
                <div className="flex items-center">
                  <Calendar className='w-4 h-4 mr-2' />
                  Data de registro
                </div>
              </th>

              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-300">
                <div className="flex items-center">
                  <Calendar className='w-4 h-4 mr-2' />
                  Data de Nascimento
                </div>
              </th>

              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600 dark:text-slate-300">
                <div className="flex items-center">
                  <MoreHorizontal className='h-4 w-4 mr-2' />
                  Ações
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap divide-y divide-gray-200 dark:divide-slate-700">
            {allUsers.map((user) =>(
              <tr>

                {/* NOME */}
                <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-200 font-medium">
                  <div className="flex items-center cursor-pointer w-max">
                    <img 
                      src={user.avatar || "https://ui-avatars.com/api/?name=" + user.nome} 
                      alt={user.nome} 
                      className="w-9 h-9 rounded-full shrink-0" 
                    />
                    <div className="ml-2">
                      <p>{user.nome}</p>
                    </div>
                  </div>
                </td>

                {/* EMAIL */}
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
                  <a className="underline">
                    {user.email}
                  </a>
                </td>

                {/* PERMISSÃO */}
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {user.permissao === "ADMIN" ? "Administrador" : "Membro"}
                </td>

                {/* STATUS */}
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
                  <span className="inline-flex items-center border border-gray-200 dark:border-slate-600 gap-2 px-2 py-1 rounded-lg">
                    <span className={`w-2 h-2 rounded-full ${user.ativo ? "bg-green-600" : "bg-red-600"}`}></span>
                    {user.ativo ? "Ativo" : "Inativo"}
                  </span>
                </td>

                {/* DATA */}
                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {user.createdAt ? formatDate(user.createdAt) : "N/A"}
                </td>

                <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {user.dtNascimento ? formatDate(user.dtNascimento) : "N/A"}
                </td>

                {/* AÇÕES */}
                <td className="flex gap-3 px-4 py-3 text-sm font-medium">

                   <button
                      onClick={() => navigate(`/users/${user.idUsuario}`)}
                      type="button" 
                      className="flex items-center gap-2 rounded-lg text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 border border-gray-200 dark:border-slate-600 px-3 py-1 cursor-pointer"
                    >
                      <Eye className="h-4 w-4" />
                      Visualizar
                    </button>

                    <ButtonEditUser user={user} />

                  <button
                    type="button" 
                    className="flex items-center gap-2 rounded-lg text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-gray-200 dark:border-slate-600 px-3 py-1 cursor-pointer"
                    onClick={() => {
                      toast.dismiss();
                      toast(Dialog, {
                        data: "Tem certeza que deseja excluir este usuário?",
                        autoClose: false,
                        closeOnClick: false,
                        closeButton: false,
                        draggable: false,
                        onClose: (confirmation) => {
                        if (confirmation) {
                          deleteUserById(user.idUsuario);
                        }
                  },
                  })
                    }}
                    title="Excluir Usuário"
                  >
                    {loadingDeleteUserById ? (
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin disabled:cursor-not-allowed"></div>
                    ) : (
                      <Trash className='h-4 w-4' />
                    )}
                    
                    Excluir
                  </button>

                  <button 
                    onClick={() => {
                      toast.dismiss();
                      toast(Dialog, {
                        data: `Tem certeza que deseja conceder permissão de ${
                          user.permissao === "ADMIN" ? "Membro" : "Administrador"
                        } a este usuário?`,
                        autoClose: false,
                        closeOnClick: false,
                        closeButton: false,
                        draggable: false,
                        onClose: async (confirmation) => {
                          if (confirmation) {
                            try {
                              const novaRole = user.permissao === "ADMIN" ? "USER" : "ADMIN";
                              await updateRoleUserById(user.idUsuario, { permissao: novaRole });
                            } catch (err) {
                              showMessage.error(err.message, false);
                            }
                          }
                        },
                      })
                    }}
                    type="button"
                    title='Mudar permissão'
                    className="flex items-center gap-2 rounded-lg text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border border-gray-200 dark:border-slate-600 px-3 py-1 cursor-pointer"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Permissão
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
