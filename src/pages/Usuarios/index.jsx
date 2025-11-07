import { useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { Pencil, Trash } from 'lucide-react';

const usuariosMock = [
  { nome: 'Ana Silva', email: 'ana.silva@exemplo.com', permissao: 'Administrador' },
  { nome: 'Carlos Santos', email: 'carlos.santos@exemplo.com', permissao: 'Editor' },
  { nome: 'Maria Oliveira', email: 'maria.oliveira@exemplo.com', permissao: 'Visitante' },
  { nome: 'João Costa', email: 'joao.costa@exemplo.com', permissao: 'Editor' },
  { nome: 'Paula Ferreira', email: 'paula.ferreira@exemplo.com', permissao: 'Administrador' },
  { nome: 'Ricardo Alves', email: 'ricardo.alves@exemplo.com', permissao: 'Visitante' },
  { nome: 'Beatriz Lima', email: 'beatriz.lima@exemplo.com', permissao: 'Editor' },
  { nome: 'Fernando Rocha', email: 'fernando.rocha@exemplo.com', permissao: 'Visitante' },
];

const badgeClasses = {
  Administrador: 'bg-black text-white',
  Editor: 'bg-gray-100 text-gray-700',
  Visitante: 'bg-gray-100 text-gray-700',
};

const permissoesOpcoes = ['Administrador', 'Editor', 'Visitante'];

export function Usuarios() {
  const [usuarios, setUsuarios] = useState(usuariosMock);
  const [busca, setBusca] = useState('');

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({ nome: '', email: '', permissao: permissoesOpcoes[0] });
  const [editIndex, setEditIndex] = useState(-1);

  const [success, setSuccess] = useState('');

  const usuariosFiltrados = usuarios.filter(({ nome, email }) =>
    nome.toLowerCase().includes(busca.toLowerCase()) ||
    email.toLowerCase().includes(busca.toLowerCase())
  );

  function abrirCriar() {
    setForm({ nome: '', email: '', permissao: permissoesOpcoes[0] });
    setShowCreate(true);
  }

  function abrirEditar(idx) {
    setEditIndex(idx);
    setForm(usuariosFiltrados[idx]);
    setShowEdit(true);
  }

  function criarUsuario(e) {
    e.preventDefault();
    setUsuarios([...usuarios, form]);
    setShowCreate(false);
    setSuccess('Novo usuário criado com sucesso!');
    setTimeout(() => setSuccess(''), 3000);
  }

  function editarUsuario(e) {
    e.preventDefault();
    const originalIdx = usuarios.findIndex(u => u.email === usuariosFiltrados[editIndex].email);
    setUsuarios(usuarios.map((u, i) => i === originalIdx ? form : u));
    setShowEdit(false);
    setSuccess('Usuário atualizado com sucesso!');
    setTimeout(() => setSuccess(''), 3000);
  }

  function closePopup() {
    setShowCreate(false);
    setShowEdit(false);
  }

  function SuccessToast() {
    if (!success) return null;
    return (
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 transition">
        {success}
      </div>
    );
  }

  function Popup({ title, onClose, onSubmit }) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-40">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl w-full max-w-md relative">
          <button
            className="absolute top-2 right-3 text-gray-400 hover:text-black dark:hover:text-white text-xl"
            onClick={onClose}
            aria-label="Fechar"
          >
            ×
          </button>
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <label>
              Nome:
              <input
                required
                type="text"
                className="mt-1 block w-full p-2 border rounded text-black"
                value={form.nome}
                onChange={e => setForm({ ...form, nome: e.target.value })}
              />
            </label>
            <label>
              E-mail:
              <input
                required
                type="email"
                className="mt-1 block w-full p-2 border rounded text-black"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label>
              Permissão:
              <select
                className="mt-1 block w-full p-2 border rounded text-black"
                value={form.permissao}
                onChange={e => setForm({ ...form, permissao: e.target.value })}
              >
                {permissoesOpcoes.map(p => (
                  <option value={p} key={p}>{p}</option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <main className="flex-1 p-10">
        <SuccessToast />

        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          Gerenciamento de Usuários
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Gerencie todos os usuários do sistema
        </p>

        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-4">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            onClick={abrirCriar}
          >
            + Cadastrar novo usuário
          </button>
          
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            className="w-full max-w-md p-2 rounded-lg border border-gray-300 focus:border-black focus:ring-black"
            value={busca}
            onChange={({ target }) => setBusca(target.value)}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-6 py-3 text-gray-800 dark:text-gray-100 font-semibold">Nome</th>
                <th className="text-left px-6 py-3 text-gray-800 dark:text-gray-100 font-semibold">E-mail</th>
                <th className="text-left px-6 py-3 text-gray-800 dark:text-gray-100 font-semibold">Permissão</th>
                <th className="px-6 py-3 text-gray-800 dark:text-gray-100 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((user, idx) => (
                <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="px-6 py-2 text-gray-900 dark:text-gray-100">{user.nome}</td>
                  <td className="px-6 py-2 text-gray-700 dark:text-gray-300">{user.email}</td>
                  <td className="px-6 py-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${badgeClasses[user.permissao]}`}>
                      {user.permissao}
                    </span>
                  </td>
                  <td className="px-6 py-2 flex gap-4 items-center">
                    <button className="flex items-center gap-1 text-pink-700 hover:underline"
                      onClick={() => abrirEditar(idx)}>
                      <Pencil className="w-4 h-4" /> Editar
                    </button>
                    <button className="flex items-center gap-1 text-pink-700 hover:underline">
                      <Trash className="w-4 h-4" /> Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 text-sm text-gray-600 dark:text-gray-400">
            Mostrando {usuariosFiltrados.length} de {usuarios.length} usuários
          </div>
        </div>
      </main>

      {showCreate && (
        <Popup
          title="Cadastrar novo usuário"
          onClose={closePopup}
          onSubmit={criarUsuario}
        />
      )}

      {showEdit && (
        <Popup
          title="Editar usuário"
          onClose={closePopup}
          onSubmit={editarUsuario}
        />
      )}
    </div>
  );
}
