import { useState, useEffect, useRef } from "react";
import { User, Settings, LogOut } from "lucide-react";

export default function AvatarDropdown() {
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
      <img
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full cursor-pointer transition"
        src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
        alt="User dropdown"
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 z-10 bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 rounded-lg shadow-lg w-48 animate-fadeIn">
            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
      <div>João Buscapé</div>
        <div class="font-medium truncate">joao@email.com</div>
      </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 hover:bg-purple-50 dark:hover:bg-purple-600 rounded-md transition"
              >
                <User className="w-4 h-4 text-blue-600" />
                Perfil
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 hover:bg-purple-50 dark:hover:bg-purple-600 rounded-md transition"
              >
                <Settings className="w-4 h-4 text-blue-600" />
                Configurações
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 hover:bg-purple-50 dark:hover:bg-purple-600 rounded-md transition"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                Sair
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
