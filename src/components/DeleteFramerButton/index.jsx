import { Trash2 } from "lucide-react";
import { toast } from 'react-toastify';
import { Dialog } from "../../components/Dialog";
import { useKanbanMember } from "../../hooks/useKanbanMember";
import { showMessage } from '../../adapters/showMessage';

export function DeleteFramerButton({ id }) {
  const { deleteBoard } = useKanbanMember();

  const handleDelete = () => {
    showMessage.dismiss();

    toast(Dialog, {
      data: "Tem certeza que deseja excluir este quadro?",
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      onClose: async (confirmation) => {
        if (confirmation) {
          try {
            await deleteBoard(id);
            showMessage.success("Quadro apagado com sucesso!", true);
          } catch (error) {
            console.error(error);
            showMessage.error("Erro ao apagar quadro. Tente novamente.", true);
          }
        }
      },
    });
  };

  return (
    <button
      onClick={handleDelete}
      className="p-1 text-red-500 hover:text-red-400 cursor-pointer"
      title="Excluir quadro"
    >
      <Trash2 size={18} />
    </button>
  );
}
