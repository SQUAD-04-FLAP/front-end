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

    return await res.json();
  } catch (error) {
    console.error("[QuadroService] Erro ao listar quadros por setor:", error);
    throw error;
  }
}