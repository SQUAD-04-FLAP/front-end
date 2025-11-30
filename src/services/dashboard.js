const API_URL = "/api/flapboard/dashboard";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getDataDashboard(idSector) {
  try {
    const url = idSector
      ? `${API_URL}/${idSector}?idSetor=${idSector}`
      : `${API_URL}/${idSector}`;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    if (!res.ok) {
      throw new Error(
        idSector
          ? `Erro ao buscar dados do dashboard para o setor ${idSector}`
          : `Erro ao buscar dados gerais do dashboard`
      );
    }

    const data = await res.json();
    return data;

  } catch (e) {
    console.error("Erro ao buscar dados do dashboard.", e);
    throw e;
  }
}


export async function getCloseTasksDueDate(idSector) {
    try {
        const url = idSector
            ? `${API_URL}/proximas?idSetor=${idSector}`
            : `${API_URL}/proximas/${idSector}`;

        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader(),
            },
        });

        if (!res.ok) {
            throw new Error(
                idSector
                    ? `Erro ao buscar tarefas próximas do vencimento do setor ${idSector}`
                    : `Erro ao buscar tarefas próximas do vencimento`
            );
        }

        return await res.json();

    } catch (e) {
        console.error("Erro ao buscar tarefas próximas do vencimento.", e);
        throw e;
    }
}

