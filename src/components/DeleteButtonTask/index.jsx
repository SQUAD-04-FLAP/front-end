import { Trash2 } from "lucide-react";

export function DeleteButtonTask() {

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation(); // impede que o click suba para o Card
        }}
        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors cursor-pointer"
      >
        <Trash2 className="w-4 h-4" />
        Excluir
      </button>
    </>
  );
}

