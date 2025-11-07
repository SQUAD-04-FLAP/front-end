import { Trash2 } from "lucide-react";
import { toast } from 'react-toastify';
import { Dialog } from "../../components/Dialog";
import { showMessage } from '../../adapters/showMessage';
import { useFramer } from '../../hooks/useFramer';

export function DeleteFramerButton({ id }) {
  const { deleteBoard } = useFramer();

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
            showMessage.error("Erro ao apagar quadro. Talvez existam tarefas associadas a esse quadro.");
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
