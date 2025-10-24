import { useState } from "react";
import { AdicionarProjetoModal } from '../../components/AdicionarProjetoModal';

export function BtnNewProject( {...props} ) {
  const [modalSetorOpen, setModalSetorOpen] = useState(false);

  return (
    <>
    <button
      onClick={() => setModalSetorOpen(true)}
      className="hidden md:inline-flex items-center px-4 py-2 
      bg-indigo-600 dark:bg-indigo-500 
      text-white text-sm font-medium rounded-lg 
      hover:bg-indigo-700 dark:hover:bg-indigo-600 
      transition duration-200 cursor-pointer shadow-sm"
      {...props}
    >
      + Novo Projeto
    </button>

     <AdicionarProjetoModal 
          isOpen={modalSetorOpen}
          onClose={() => setModalSetorOpen(false)}
    />
    </>
  );
}
