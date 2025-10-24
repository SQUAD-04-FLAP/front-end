const API_URL = "/api/flapboard/setor";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function list_sectors() {
  try {
    const res = await fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(), // envia o token
      },
    });

    if (!res.ok) throw new Error("Erro ao buscar projetos");
    return await res.json();
  } catch (e) {
    console.error("Ocorreu um erro inesperado.", e);
    throw e;
  }
}

export async function create_sector(sectorData) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(), // envia o token
      },
      body: JSON.stringify(sectorData),
    });

    if (!res.ok) throw new Error("Erro ao criar setor");
    return await res.json();
  } catch (e) {
    console.error("Ocorreu um erro inesperado.", e);
    throw e;
  }
}

export const delete_sector = async (idSetor) => {
  const response = await fetch(`${API_URL}/${idSetor}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
  });

  if (!response.ok) {
    throw new Error("Não foi possível excluir o projeto. Tente novamente mais tarde.");
  }

  return true;
};

