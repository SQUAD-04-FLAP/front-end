const API_URL = "/api/auth";

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}


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

  register: async(nome, email, senha, dtNascimento ) => {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, senha, dtNascimento }),
    })

    if(!res.ok) throw new Error("Erro ao criar usuário");

    const data = await res.json();

    console.log(data);

    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getTokenFromStorage: () => {
    return localStorage.getItem("token");
  },

  updateRoleUserById: async (id, data) => {
    const response = await fetch(`${API_URL}/update-role/${id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });

     if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`${errorText}`);
     }

     return await response.json();
  }
};
