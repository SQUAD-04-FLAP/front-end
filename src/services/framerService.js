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