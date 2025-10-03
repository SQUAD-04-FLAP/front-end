const API_URL = "/flapboard/setor";

export async function list_sectors() {
    try {
        const response = await fetch(API_URL);
        if(!response.ok) {
            throw new Error("Erro ao buscar setores");
        }

        return await response.json();
    } catch(error) {
        console.error("Ocorreu um erro inesperado.", error);
        throw error;
    }
}