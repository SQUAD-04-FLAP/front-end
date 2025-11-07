import { useState } from "react";
import { IconSidebar } from "../IconSidebar";
import { BarChart, Bell, BookDashed, Calendar, Columns, Cpu, Headphones, HelpCircle, Home, LayoutDashboard, Box, Monitor, Moon, Palette, Search, Settings, Sun, LogOut, Users, Briefcase, KanbanSquare, Grid } from "lucide-react";
import { ContainerLinks } from "../ContainerLinks";
import { SectionSidebar } from "../SectionSidebar";
import { BorderSidebar } from "../BorderSidebar";
import { ButtonNewTask } from "../ButtonNewTask";
import { SearchSidebar } from "../SearchSidebar";
import { IconsTopSidebar } from "../IconsTopSidebar";
import { useTheme } from "../../hooks/useTheme";
import AvatarDropdown from "../AvatarDropdown";
import NotificationDropdown from "../NotifcationDropdown";
import { RouterLinks } from "../RouterLinks";
import {ButtonNewBoard} from '../../components/ButtonNewBoard';
import { BtnNewProject } from "../BtnNewProject";
import { useLocation } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';

export function Sidebar() {
  const [sideBar, setSideBar] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const { user, logout } = useAuth();

  return (
    <section className="bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav
        className={`fixed border-e-2 top-0 left-0 z-20 h-full pb-10 overflow-x-hidden overflow-y-auto transition origin-left transform bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 w-60 ${
          sideBar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <RouterLinks href="/" className="flex items-center px-4 py-5">
          <img src="img/logo.jpg" alt="Flap Logo" className="w-10" />
        </RouterLinks>

        <nav className="text-sm font-medium text-gray-600 dark:text-gray-300" aria-label="Main Navigation">
            <SectionSidebar>Navegação</SectionSidebar>

            <IconSidebar href="/">
              <ContainerLinks>
                <Grid />
                <span>Kanban</span>
              </ContainerLinks>
            </IconSidebar>

            <IconSidebar href="/projects">
              <ContainerLinks>
                <Briefcase />
                <span>Empresas</span>
              </ContainerLinks>
            </IconSidebar>

             <IconSidebar href="/framers">
              <ContainerLinks>
                <Columns />
                <span>Quadros</span>
              </ContainerLinks>
              </IconSidebar>

            {user.permissao === "ADMIN" && (
               <IconSidebar href="/users">
              <ContainerLinks>
                <Users />
                <span>Usuários</span>
              </ContainerLinks>
              </IconSidebar>
            )}

            <IconSidebar href="/configuracoes">
              <ContainerLinks>
                <Settings />
                <span>Configurações</span>
              </ContainerLinks>
              </IconSidebar>

            <BorderSidebar />

            <button
            onClick={logout}
              type="button"
              class="inline-flex items-center gap-3 px-6 py-3 rounded-2xl  text-black dark:text-white text-lg font-semibold active:scale-95 focus:outline-none focus:ring-4 transition transform cursor-pointer"
              aria-label="Sair"
            >
              <LogOut />

              <span>Sair</span>
            </button>

        </nav>
      </nav>
      
  <div className="ml-0 transition md:ml-60">
    <header className="flex items-center justify-between w-full px-4 h-14 bg-white dark:bg-gray-800">
      <button
        className="block btn btn-light-secondary md:hidden"
        onClick={(e) => { e.stopPropagation(); setSideBar(true); }}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="w-4 h-4"
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

   <div className="flex items-center justify-between w-full px-4 h-14">

  {/* Campo de busca */}
  <SearchSidebar />
  
  <div className="flex items-center gap-4">

   {(location.pathname === "/board-v2") && <BtnNewProject />}
   {location.pathname === "/" && <ButtonNewBoard />}
   {location.pathname === "/" && <ButtonNewTask />}

   {(location.pathname === "/projects") && <BtnNewProject /> && user.permissao === "ADMIN"}

   <IconsTopSidebar>
        <NotificationDropdown />
   </IconsTopSidebar>

   <button
    onClick={toggleTheme}
    className="p-2 rounded-lg transition cursor-pointer"
   >

    {theme === "dark" ? (
    <Sun className="text-yellow-400 hover:text-yellow-300" />
  ) : (
    <Moon className="text-gray-800 hover:text-gray-600" />
  )}
   </button>

<AvatarDropdown />

  </div>
</div>

</header>

  </div>
      {/* Backdrop */}
      {sideBar && (
        <div
          className="fixed inset-0 z-10 w-screen h-screen bg-black bg-opacity-25 md:hidden"
          onClick={() => setSideBar(false)}
        ></div>
      )}
    </section>
  );
}
