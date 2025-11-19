const API_URL = "/api/auth";

export const userAuthentication = {
  login: async (email, senha) => {
    const res = await fetch((`${API_URL}/login`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Erro na autenticação");
    }

    const data = await res.json();

    if(data.token) {
        localStorage.setItem("token", data.token);
        return data.token;
    }

    return null;
  },

  register: async(nome, email, senha ) => {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, senha }),
    })

    if(!res.ok) throw new Error("Erro ao criar usuário");

    const data = await res.json();

    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getTokenFromStorage: () => {
    return localStorage.getItem("token");
  },
};
