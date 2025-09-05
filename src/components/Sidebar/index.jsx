import { useState } from "react";
import { IconSidebar } from "../IconSidebar";
import { BarChart, Bell, BookDashed, Calendar, Columns, Cpu, Headphones, HelpCircle, Home, LayoutDashboard, Megaphone, Monitor, Palette, Search, Settings } from "lucide-react";
import { ContainerLinks } from "../ContainerLinks";
import { SectionSidebar } from "../SectionSidebar";
import { BorderSidebar } from "../BorderSidebar";
import { ButtonNewTask } from "../ButtonNewTask";
import { SearchSidebar } from "../SearchSidebar";
import { IconsTopSidebar } from "../IconsTopSidebar";

export function Sidebar() {
  const [sideBar, setSideBar] = useState(false);

  return (
    <section className="min-h-screen bg-gray-50">
      <nav
        className={`fixed top-0 left-0 z-20 h-full pb-10 overflow-x-hidden overflow-y-auto transition origin-left transform bg-gray-900 w-60 ${
          sideBar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <a href="/" className="flex items-center px-4 py-5">
          <img src="img/logo.jpg" alt="Flap Logo" className="w-10" />
        </a>

        <nav className="text-sm font-medium text-gray-500" aria-label="Main Navigation">
            <SectionSidebar>Navegação</SectionSidebar>

            <IconSidebar href="/">
              <ContainerLinks>
                <LayoutDashboard />
                <span>Dashboard</span>
              </ContainerLinks>
            </IconSidebar>

            <IconSidebar href="/">
              <ContainerLinks>
                <Columns />
                <span>Quadro Kanban</span>
              </ContainerLinks>
            </IconSidebar>

            <IconSidebar href="/">
              <ContainerLinks>
                <Calendar />
                <span>Calendário</span>
              </ContainerLinks>
            </IconSidebar>

             <IconSidebar href="/">
              <ContainerLinks>
                <BarChart />
                <span>Relatórios</span>
              </ContainerLinks>
            </IconSidebar>

            <BorderSidebar />

            <SectionSidebar>Setores</SectionSidebar>

             <IconSidebar href="/">
              <ContainerLinks>
                <Megaphone />
                <span>Marketing</span>
              </ContainerLinks>
            </IconSidebar>

            <IconSidebar href="/">
              <ContainerLinks>
                <Palette />
                <span>Design</span>
              </ContainerLinks>
            </IconSidebar>

            <IconSidebar href="/">
              <ContainerLinks>
                <Headphones />
                <span>Atendimento</span>
              </ContainerLinks>
            </IconSidebar>

            <IconSidebar href="/">
              <ContainerLinks>
                <Monitor />
                <span>TI</span>
              </ContainerLinks>
            </IconSidebar>

            <BorderSidebar />

            <IconSidebar href="/">
              <ContainerLinks>
                <Settings />
                <span>Configurações</span>
              </ContainerLinks>
            </IconSidebar>

             <IconSidebar href="/">
              <ContainerLinks>
                <HelpCircle />
                <span>Ajuda</span>
              </ContainerLinks>
            </IconSidebar>
        </nav>
      </nav>
      
  <div className="ml-0 transition md:ml-60">
    <header className="flex items-center justify-between w-full px-4 h-14">
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
  
  { /* Botão para adicionar nova tarefa */ }
  <div className="flex items-center gap-4">
   <ButtonNewTask />

   <IconsTopSidebar>
        <Bell />
   </IconsTopSidebar>

   <IconsTopSidebar>
        <Calendar />
   </IconsTopSidebar>

   <IconsTopSidebar>
        <Settings />
   </IconsTopSidebar>

    <a href="#" className="flex ml-2">
      <img
        src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
        alt="Foto do usuário"
        className="w-8 h-8 rounded-full border border-gray-200 object-cover"
      />
    </a>
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