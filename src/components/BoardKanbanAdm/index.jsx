import { useEffect } from "react";
import { useFilter } from "../../hooks/useFilter";
import { useTask } from "../../hooks/useTask";
import { BoardAdmin } from "../BoardAdmin";

export function BoardKanbanAdm() {
  const { state: filterState } = useFilter();
  const { selectedFramerId } = filterState;

  const { state: taskState, loadTasks } = useTask();
  const { tasks, loading, error } = taskState;

  useEffect(() => {
    if (selectedFramerId) {
      loadTasks(selectedFramerId);
    }
  }, [selectedFramerId]);

  if (!selectedFramerId) {
    return <p className="text-slate-500 dark:text-slate-400">Selecione um quadro para ver as tarefas</p>;
  }

  if (loading) {
    return <p className="text-slate-500 dark:text-slate-400">Carregando tarefas...</p>;
  }

  if (error) {
    return <p className="text-red-500">Erro ao carregar tarefas: {error}</p>;
  }

  return(
    <BoardAdmin tasks={tasks} />
  );
}
