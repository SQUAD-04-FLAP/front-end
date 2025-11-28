import { ButtonRegisterNewUser } from '../../components/ButtonRegisterNewUser';
import { TableUsers } from '../../components/TableUsers';

export function Usuarios() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          Gerenciamento de Usuários
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Gerencie todos os usuários do sistema
        </p>

        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-4">
          <ButtonRegisterNewUser />
        </div>
      </main>
      <TableUsers />
    </div>
  );
}