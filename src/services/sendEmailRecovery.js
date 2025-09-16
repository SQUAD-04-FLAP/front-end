// const API_URL = "http://ec2-54-226-167-245.compute-1.amazonaws.com:8080/auth/forgot-password";
const API_URL = "/api/auth/forgot-password";

export const sendEmailRecovery = {
    send: async(email) => {
    try {
            const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email}),
    })

    if(!res.ok) {
        const error = await res.text();
        throw new Error(error || "Erro ao enviar e-mail");
    }

       return { success: true }
    } catch(err) {
        console.error("Erro na requisição", err);
        throw new Error("Não foi possível conectar ao servidor");
    }
    }
}