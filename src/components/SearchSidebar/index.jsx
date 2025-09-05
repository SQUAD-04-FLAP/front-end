import { Search } from "lucide-react";

export function SearchSidebar() {
return(
    <div className="hidden md:flex items-center w-96 relative">
        <Search className="absolute left-3 text-gray-400 w-5 h-5" />
        <input
        type="text"
        className="pl-10 pr-3 py-2 w-full rounded border border-gray-200 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Buscar tarefas, quadros ou usuários"
        />
    </div>
    );
}