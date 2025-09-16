const API_URL = "http://ec2-54-226-167-245.compute-1.amazonaws.com:8080/auth/reset-password";

export const recoveryPassword = {
    recovery: async(code, newPassword) => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code, newPassword })
            });

            if(!res.ok) {
                const error = await res.text();
                throw new Error(error || "Ocorreu um erro ao tentar recuperar a senha.");
            }

            return { success: true }
        } catch(e) {
            console.error("Erro na requisição", e);
            throw new Error("Não foi possível conectar ao servidor");
        }
    }
}