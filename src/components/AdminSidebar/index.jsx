import { useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  Building2, 
  Columns,
  Plus
} from "lucide-react";

export function AdminSidebar() {
  const [sideBar, setSideBar] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/admin/kanban', icon: Columns, label: 'Quadro Kanban', color: 'text-cyan-400' },
    { path: '/admin/empresas', icon: Building2, label: 'Empresas', color: 'text-cyan-400' }
  ];

  return (
    <>
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

        {/* Botão Nova Tarefa */}
        <div className="px-4 mt-8">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-cyan-400 hover:bg-cyan-300 text-blue-900 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
            <Plus className="w-4 h-4" />
            Nova Tarefa
          </button>
        </div>
      </nav>

      {/* Backdrop Mobile */}
      {sideBar && (
        <div
          className="fixed inset-0 z-10 w-screen h-screen bg-black bg-opacity-25 md:hidden"
          onClick={() => setSideBar(false)}
        ></div>
      )}
    </>
  );
}
