import { Link } from "react-router-dom";

export function ButtonNewTask() {
  return (
    <Link
      to="/nova-tarefa"
      className="hidden md:inline-flex items-center px-4 py-2 
      bg-indigo-600 dark:bg-indigo-500 
      text-white dark:text-white 
      text-sm font-medium rounded 
      hover:bg-indigo-700 dark:hover:bg-indigo-600 
      transition cursor-pointer"
    >
      + Nova Tarefa
    </Link>
  );
}
