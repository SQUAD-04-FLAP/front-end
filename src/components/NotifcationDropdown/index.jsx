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
        {/* <div className="absolute w-3 h-3 border-2 border-white rounded-full -top-0.5 right-0 dark:border-gray-900" /> */}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 z-20 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-fadeIn">

          {/* Cabeçalho */}
          <div className="px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
            Notificações
          </div>

          {/* Mensagem quando não há notificações */}
          <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
            Nenhuma notificação no momento
          </div>
        </div>
      )}
    </div>
  );
}
