import { useState } from "react";
import { IconSidebar } from "../IconSidebar";
import { BarChart, Calendar, Columns, Home } from "lucide-react";
import { ContainerLinks } from "../ContainerLinks";

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
            <IconSidebar href="/">
              <ContainerLinks>
                <Home />
                <span>Home</span>
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
        </nav>
      </nav>

      <div className="ml-0 transition md:ml-60">
        <header className="flex items-center justify-between w-full px-4 h-14">
          <button
            className="block btn btn-light-secondary md:hidden"
            onClick={() => setSideBar(true)}
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