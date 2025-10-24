import { useState } from "react";

const usuariosDisponiveis = [
  { id: 11, nome: "Bonnie Green" },
  { id: 12, nome: "Jese Leos" },
  { id: 13, nome: "Michael Gough" },
  { id: 14, nome: "Robert Wall" },
  { id: 15, nome: "Joseph Mcfall" },
  { id: 16, nome: "Leslie Livingston" },
  { id: 17, nome: "Roberta Casas" },
];

export function DropdownUsers() {
  const [usuariosSelecionados, setUsuariosSelecionados] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleUsuario = (id) => {
    setUsuariosSelecionados(prev =>
      prev.includes(id)
        ? prev.filter(u => u !== id)
        : [...prev, id]
    );
  };

  const usuariosFiltrados = usuariosDisponiveis.filter(u =>
    u.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
            className="text-white bg-[#141C2D] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
      >
        Escolher participantes
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-60 z-10 bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="p-3">
            <label htmlFor="search-usuarios" className="sr-only">
              Pesquisar
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                id="search-usuarios"
                type="text"
                placeholder="Pesquisar usuário"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
            {usuariosFiltrados.map((usuario) => (
              <li key={usuario.id}>
                <div className="flex items-center ps-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    type="checkbox"
                    checked={usuariosSelecionados.includes(usuario.id)}
                    onChange={() => toggleUsuario(usuario.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label className="w-full py-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {usuario.nome}
                  </label>
                </div>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setUsuariosSelecionados([])}
            className="flex items-center justify-center w-full p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline"
          >
            Limpar seleção
          </button>
        </div>
      )}
    </div>
  );
}
