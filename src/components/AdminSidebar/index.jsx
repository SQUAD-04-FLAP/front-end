import { useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  Building2, 
  Columns,
  Plus,
  Bell,
  Search,
  Sun,
  Moon,
  Users,
  Layers,
  Settings
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { ContainerLinks } from "../ContainerLinks";
import { AdicionarSetorModal } from "../AdicionarSetorModal";
import { BorderSidebar } from "../../components/BorderSidebar";
import { SectionSidebar } from "../../components/SectionSidebar";
import { IconSidebar } from "../../components/IconSidebar";
import { ModalRegisterFramer } from "../ModalRegisterFramer";

export function AdminSidebar() {
  const [sideBar, setSideBar] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [modalSetorOpen, setModalSetorOpen] = useState(false);
  const [modalQuadroOpen, setModalQuadroOpen] = useState(false);


  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/admin/kanban', icon: Columns, label: 'Quadro Kanban', color: 'text-cyan-400' },
    { path: '/admin/empresas', icon: Building2, label: 'Empresas', color: 'text-cyan-400' }
  ];

  return (
    <>
      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 z-20 h-full pb-10 overflow-x-hidden overflow-y-auto transition origin-left transform bg-gradient-to-b from-blue-900 to-blue-800 text-white w-60 ${
          sideBar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="px-4 py-6">
          <h1 className="text-lg font-bold text-white">
            FLAP Live Marketing
          </h1>
        </div>

        {/* Menu Items */}
        <nav className="text-sm font-medium" aria-label="Admin Navigation">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-200 hover:bg-white/10 ${
                  isActive(item.path) 
                    ? 'bg-white/20 text-white shadow-lg' 
                    : 'text-cyan-100 hover:text-white'
                }`}
              >
                <IconComponent className={`w-5 h-5 mr-3 ${item.color}`} />
                <span className="font-medium">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <BorderSidebar />

        <SectionSidebar>Gerenciamento</SectionSidebar>

        <IconSidebar href="#">
              <ContainerLinks bgColor="bg-transparent" textColor="text-white" hoverColor="hover:bg-[#334E9E] hover:text-gray-100">
                <Users />
                <span>Gerenciar usuários</span>
              </ContainerLinks>
        </IconSidebar>

        <IconSidebar href="#">
              <ContainerLinks bgColor="bg-transparent" textColor="text-white" hoverColor="hover:bg-[#334E9E] hover:text-gray-100">
                <Layers />
                <span>Gerenciar setores</span>
              </ContainerLinks>
        </IconSidebar>

        <IconSidebar href="#">
              <ContainerLinks bgColor="bg-transparent" textColor="text-white" hoverColor="hover:bg-[#334E9E] hover:text-gray-100">
                <Columns />
                <span>Gerenciar quadros</span>
              </ContainerLinks>
        </IconSidebar>

         <IconSidebar href="#">
              <ContainerLinks bgColor="bg-transparent" textColor="text-white" hoverColor="hover:bg-[#334E9E] hover:text-gray-100">
                <Settings />
                <span>Configurações</span>
              </ContainerLinks>
        </IconSidebar>

        <BorderSidebar />

         {/* Botão Adicionar Setor */}
            <button 
              onClick={() => setModalSetorOpen(true)}
              className="flex items-center w-full py-2 text-left rounded-lg mx-2 transition-colors"
            >
               <ContainerLinks bgColor="bg-[#324D9F]" textColor="text-white">
                <Plus />
                <span>Adicionar Setor</span>
              </ContainerLinks>
            </button>

        {/* Botão Adicionar Quadro */}
        <button 
          onClick={() => setModalQuadroOpen(true)}
          className="flex items-center w-full py-2 text-left rounded-lg mx-2 transition-colors"
        >
          <ContainerLinks bgColor="bg-[#324D9F]" textColor="text-white">
            <Plus />
            <span>Adicionar Quadro</span>
          </ContainerLinks>
        </button>

            <BorderSidebar />

        {/* Botão Nova Tarefa */}
        <div className="px-4 mt-8">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-cyan-400 hover:bg-cyan-300 text-blue-900 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
            <Plus className="w-4 h-4" />
            Nova Tarefa
          </button>
        </div>
      </nav>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 ml-0 md:ml-60 h-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
        <div className="flex items-center justify-between w-full px-6 h-full">
          {/* Botão Menu Mobile */}
          <button
            className="block md:hidden p-2 rounded-lg hover:bg-white/10 transition"
            onClick={(e) => { e.stopPropagation(); setSideBar(true); }}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Campo de busca */}
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="text"
                placeholder="Buscar tarefas, projetos ou empresas..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Ícones do Header */}
            <div className="relative">
              <button className="p-2 hover:bg-white/10 rounded-lg transition">
                <Bell className="w-5 h-5" />
              </button>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-blue-900">3</span>
              </div>
            </div>

            {/* Botão Dark Mode */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-white/10 rounded-lg transition"
              title={theme === "dark" ? "Modo Claro" : "Modo Escuro"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Avatar do Admin */}
            <div className="flex items-center gap-3">
              <img
                src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                alt="Marina Oliveira"
                className="w-8 h-8 rounded-full border-2 border-cyan-400 object-cover"
              />
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-white">Marina Oliveira</p>
                <p className="text-xs text-cyan-200">Administrador</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop Mobile */}
      {sideBar && (
        <div
          className="fixed inset-0 z-10 w-screen h-screen bg-black bg-opacity-25 md:hidden"
          onClick={() => setSideBar(false)}
        ></div>
      )}

      {/* Modal Adicionar Setor */}
      <AdicionarSetorModal 
        isOpen={modalSetorOpen}
        onClose={() => setModalSetorOpen(false)}
      />

      {/* Modal Adicionar Quadro */}
      <ModalRegisterFramer 
      isOpen={modalQuadroOpen}
      onClose={() => setModalQuadroOpen(false)}
    />

    </>
  );
}
