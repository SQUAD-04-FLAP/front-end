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

export async function moveTask(taskId, newStatusId, userId) {
  try {
    const response = await fetch(`${API_URL}/mover/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({
        idNovoStatus: newStatusId,
        idUsuarioLogado: userId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao mover tarefa: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao mover tarefa:', error);
    throw error;
  }
}

export async function fetchTaskById(taskId) {
  try {
    const res = await fetch(`${API_URL}/${taskId}`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    if (!res.ok) throw new Error(`Erro ao buscar tarefa ${taskId}`);

    const data = await res.json();
    return data;
  } catch (e) {
    console.error("[TasksService] Erro ao buscar tarefa por ID:", e);
    throw e;
  }
}

export async function sendTaskComment(idTarefa, mensagem, idUsuario) {
  try {
    const response = await fetch(`${API_URL}/comentario/${idTarefa}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        mensagem,
        idUsuario,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao enviar comentário: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("[TasksService] Erro ao enviar comentário:", error);
    throw error;
  }
}
