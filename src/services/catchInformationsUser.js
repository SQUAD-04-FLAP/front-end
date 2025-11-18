import { userAuthentication } from './userAuthentication';

const API_URL = "/api/user/find";

export const catchInformationsUser =  {
    getUserById: async (id) => {
        const token = userAuthentication.getTokenFromStorage();

        const res = await fetch(`${API_URL}/${id}`, {
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
    }
}