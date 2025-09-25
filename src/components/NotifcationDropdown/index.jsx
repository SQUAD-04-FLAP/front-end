import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

export default function DropdownNotificacoes() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão de notificações */}
      <button
        onClick={toggleDropdown}
        className="relative inline-flex items-center p-2 text-black hover:text-gray-900 dark:text-white dark:hover:text-white focus:outline-none cursor-pointer"
        type="button"
      >
        <Bell className="w-6 h-6" />
        {/* Badge de nova notificação */}
        <div className="absolute w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 right-0 dark:border-gray-900" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 z-20 w-96 bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-lg shadow-lg animate-fadeIn">
          {/* Cabeçalho */}
          <div className="px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
            Notificações
          </div>

          {/* Lista de notificações */}
          <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-80 overflow-y-auto">
            {[
              {
                nome: "Jese Leos",
                mensagem: 'Oi, tudo certo? Preparado para a apresentação?',
                tempo: "há alguns instantes",
                imagem: "https://randomuser.me/api/portraits/men/32.jpg",
                corBadge: "bg-blue-600",
              },
              {
                nome: "Joseph Mcfall",
                mensagem: "e mais 5 pessoas começaram a te seguir.",
                tempo: "há 10 minutos",
                imagem: "https://randomuser.me/api/portraits/men/45.jpg",
                corBadge: "bg-gray-900",
              },
              {
                nome: "Bonnie Green",
                mensagem: "e mais 141 pessoas curtiram sua história.",
                tempo: "há 44 minutos",
                imagem: "https://randomuser.me/api/portraits/women/68.jpg",
                corBadge: "bg-red-600",
              },
              {
                nome: "Leslie Livingston",
                mensagem: "te mencionou em um comentário: @bonnie.green",
                tempo: "há 1 hora",
                imagem: "https://randomuser.me/api/portraits/women/15.jpg",
                corBadge: "bg-green-400",
              },
              {
                nome: "Robert Brown",
                mensagem:
                  "postou um novo vídeo: Glassmorphism - aprenda a implementar a nova tendência de design.",
                tempo: "há 3 horas",
                imagem: "https://randomuser.me/api/portraits/men/78.jpg",
                corBadge: "bg-purple-500",
              },
            ].map((notif, index) => (
              <a
                key={index}
                href="#"
                className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <div className="relative shrink-0">
                  <img
                    className="rounded-full w-11 h-11"
                    src={notif.imagem}
                    alt={`${notif.nome} imagem`}
                  />
                  <div
                    className={`absolute flex items-center justify-center w-5 h-5 -top-1.5 -right-1.5 border border-white rounded-full dark:border-gray-800 ${notif.corBadge}`}
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
                <div className="w-full ps-3">
                  <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">{notif.nome}</span>{" "}
                    {notif.mensagem}
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-500">{notif.tempo}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Link ver todas */}
          <a
            href="#"
            className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
          >
            Ver todas
          </a>
        </div>
      )}
    </div>
  );
}
