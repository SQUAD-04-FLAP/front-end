const API_URL = "/api/auth/login";

export const userAuthentication = {
  login: async (email, senha) => {
    const res = await fetch(API_URL, {
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

  logout: () => {
    localStorage.removeItem("token");
  },

  getTokenFromStorage: () => {
    return localStorage.getItem("token");
  },
};
