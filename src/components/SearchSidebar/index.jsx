import { Search } from "lucide-react";

export function SearchSidebar() {
  return (
    <div className="hidden md:flex items-center w-96 relative">
      <Search className="absolute left-3 text-gray-400 dark:text-gray-500 w-5 h-5" />
      <input
        type="text"
        className="pl-10 pr-3 py-2 w-full rounded border border-gray-200 dark:border-gray-700 
                   bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        placeholder="Buscar tarefas, quadros ou usuários"
      />
    </div>
  );
}
