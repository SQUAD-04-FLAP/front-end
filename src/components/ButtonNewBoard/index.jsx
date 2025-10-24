import { useState } from "react";
import { ModalRegisterFramer } from '../../components/ModalRegisterFramer';

export function ButtonNewBoard() {
  const [modalQuadroOpen, setModalQuadroOpen] = useState(false);

 return (
    <>
      <button
        onClick={() => setModalQuadroOpen(true)}
        className="hidden md:inline-flex items-center px-4 py-2 
        bg-emerald-600 dark:bg-emerald-500 
        text-white text-sm font-medium rounded-lg 
        hover:bg-emerald-700 dark:hover:bg-emerald-600 
        transition duration-200 cursor-pointer shadow-sm"
      >
        + Adicionar Quadro
      </button>

      <ModalRegisterFramer 
        isOpen={modalQuadroOpen}
        onClose={() => setModalQuadroOpen(false)}
      />
    </>
  );
}
