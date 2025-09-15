const API_URL = "http://ec2-54-226-167-245.compute-1.amazonaws.com:8080/auth/login";

export const userAuthentication = {
  login: async (email, senha) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erro na autenticação");
    }

    const data = await res.json();
    console.log("🔑 Resposta do login:", data);

    if(data.token) {
        localStorage.setItem("user", JSON.stringify(data)); // salve token e dados do usuario
    }

    return data;
  },

  logout: () => {
    localStorage.removeItem("user");
  },

  getUserFromStorage: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};
