const API_URL = "/api/flapboard/tarefa";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchTasksByBoardID(idBoard) {
    try {
        const res = await fetch(`${API_URL}/quadro/${idBoard}`, {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
        });

        if(!res.ok) throw new Error(`Erro ao buscar tarefas para o quadro ${idBoard}`);
         
        const data = await res.json();
        return data;
    } catch(e) {
      console.error("[TasksService] Erro ao listar tarefas por quadro:", e);
      throw e;
    }
}