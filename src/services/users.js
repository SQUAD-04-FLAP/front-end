import { userAuthentication } from './userAuthentication';

const API_URL = "/api/user";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const users =  {
    getUserById: async (id) => {
        const token = userAuthentication.getTokenFromStorage();

        const res = await fetch(`${API_URL}/find/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })

        if(!res.ok) {
            const error = await res.text();
            throw new Error(error || "Erro ao buscar usuário");
        }

        return res.json();
    },

    getAllUsers: async () => {
         try {
            const response = await fetch(`${API_URL}/findAll`, {
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeader(),
                }
            });

            if(!response.ok)  throw new Error("Erro ao buscar todos os usuários");
            return await response.json();
         } catch(e) {
            console.error("Ocorreu um erro inesperado.", e);
            throw e;
         }
    },

    deleteUserByid: async (id) => {
        const response = await fetch(`${API_URL}/delete/${id}`, {
            method: "DELETE",
             headers: {
                "Content-Type": "application/json",
                ...getAuthHeader()
            }
        });

        if(!response.ok) throw new Error("Não foi possível excluir o usuário com ID: ", id);

        return true;
    }
}