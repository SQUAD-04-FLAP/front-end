const API_URL = "/api/flapboard/quadro";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function create_framer(framerData) {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader()
            },
            body: JSON.stringify(framerData),
        });

        if(!res.ok) throw new Error("Erro ao criar quadro");
        return await res.json();
    } catch(e) {
        console.error("Ocorreu um erro inesperado.", e);
        throw e;
    }
}

export async function listFramersBySector(idSector) {
    try {
    const res = await fetch(`${API_URL}/setor/${idSector}`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    if (!res.ok) {
      throw new Error(`Erro ao buscar quadros para o setor ${idSector}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("[QuadroService] Erro ao listar quadros por setor:", error);
    throw error;
  }
}

export async function delete_framer(idQuadro) {
  try {
    const res = await fetch(`${API_URL}/${idQuadro}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    if (!res.ok) {
      throw new Error(`Erro ao deletar o quadro com ID ${idQuadro}`);
    }

    return true;
  } catch (error) {
    console.error("[QuadroService] Erro ao deletar quadro:", error);
    throw error;
  }
}

export async function listAllFramers() {
  try {
    const res = await fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    if (!res.ok) throw new Error("Erro ao buscar todos os quadros");

    const data = await res.json();
    return data;

  } catch (e) {
    console.error("[QuadroService] Erro ao listar todos os quadros:", e);
    throw e;
  }
}

export async function createStatus(idQuadro, nome) {
  try {
    const res = await fetch(`${API_URL}/${idQuadro}/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({ nome }),
    });

    if (!res.ok) throw new Error(`Erro ao criar status no quadro ${idQuadro}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("[QuadroService] Erro ao criar status:", error);
    throw error;
  }
}

export async function deleteStatus(idStatus) {
  try {
    const res = await fetch(`${API_URL}/status/${idStatus}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    if (!res.ok) {
      throw new Error(`Erro ao excluir o status com ID ${idStatus}`);
    }

    return true;
  } catch (error) {
    console.error("[QuadroService] Erro ao excluir status:", error);
    throw error;
  }
}

export const updateStatusFramer = async (idStatus, nome) => {
  try {
    const res = await fetch(`${API_URL}/status/${idStatus}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({ nome }),
    });

    if(!res.ok) throw new Error("Não foi possível atualizar o status");
    return await res.json();
  } catch(e) {
    console.log("Erro ao atualizar o status", e);
    throw e;
  }
}

export const updateFramer = async (idQuadro, framerData) => {
  try {
    const res = await fetch(`${API_URL}/${idQuadro}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(framerData),
    });

    if (!res.ok) throw new Error(`Não foi possível atualizar o quadro com ID ${idQuadro}`);
    
    return await res.json();
  } catch (e) {
    console.error("[QuadroService] Erro ao atualizar o quadro:", e);
    throw e;
  }
};

export async function getFramerById(idQuadro) {
  try {
    const res = await fetch(`${API_URL}/${idQuadro}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    if (!res.ok) {
      throw new Error(`Erro ao buscar o quadro com ID ${idQuadro}`);
    }

    return await res.json();
  } catch (error) {
    console.error("[QuadroService] Erro ao buscar quadro por ID:", error);
    throw error;
  }
}

