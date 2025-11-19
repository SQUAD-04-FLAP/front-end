import { useReducer, useEffect } from 'react';
import { authReducer, initialState } from '../../reducer/authReducer';
import { userAuthentication } from '../../services/userAuthentication';
import { users } from '../../services/users';
import { AuthContext } from './AuthContext';
import { jwtDecode } from 'jwt-decode';
import { showMessage } from '../../adapters/showMessage';

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const logout = () => {
    userAuthentication.logout();
    dispatch({ type: "LOGOUT" });
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = userAuthentication.getTokenFromStorage();

      if (!token) {
        dispatch({ type: "SET_LOADING", payload: false });
        return;
      }

      try {
        const decoded = jwtDecode(token);

        // Checar expiração do token
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          logout();
          return;
        }

        // Buscar informações completas do usuário pela API
        const userData = await users.getUserById(decoded.sub);

        dispatch({
          type: "LOGIN",
          payload: { token, user: userData },
        });

      } catch (err) {
        console.error("Erro ao decodificar token ou buscar usuário:", err);
        logout();
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchUser();
  }, []);

    const fetchAllUsers = async () => {
    dispatch({ type: "FETCH_ALL_USERS_REQUEST" });

    try {
      const data = await users.getAllUsers();
      dispatch({ type: "FETCH_ALL_USERS_SUCCESS", payload: data });

      return data;
    } catch (e) {
      dispatch({ type: "FETCH_ALL_USERS_FAILURE", payload: e.message });
    }
  };

  useEffect(() => {
      fetchAllUsers();
  }, []);

  const login = async (email, password) => {
    const token = await userAuthentication.login(email, password);

    if (!token) throw new Error("Token inválido.");

    try {
      const decoded = jwtDecode(token);

      // Buscar informações completas do usuário após login
      const userData = await users.getUserById(decoded.sub);

      dispatch({ type: "LOGIN", payload: { token, user: userData } });

      return userData;
    } catch (err) {
      throw new Error("Erro ao decodificar token ou buscar usuário.", err);
    }
  };

    const register = async (nome, email, senha) => {
      dispatch({ type: "REGISTER_LOADING", payload: true });

      try {
        const newUser = await userAuthentication.register(nome, email, senha);

        const updatedUsers = [...state.allUsers, newUser];

        dispatch({
          type: "REGISTER_SUCCESS",
          payload: updatedUsers
        });

        return true;

      } catch (e) {
        dispatch({
          type: "REGISTER_FAILURE",
          payload: e.message
        });
      }
    };

    const deleteUserById = async (idUser) => {
      dispatch({ type: "DELETE_USER_REQUEST" });

      try {
        await users.deleteUserByid(idUser);
        dispatch({ type: "DELETE_USER_SUCCESS", payload: idUser });
        showMessage.success("Usuário excluído com sucesso", true);
      } catch(e) {
        dispatch({ type: "DELETE_USER_FAILURE", payload: e.message });
        showMessage.error("Aconteceu um problema inesperado ao excluir o usuário", true);
      }
    }

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!state.user,
        user: state.user,
        token: state.token,
        loading: state.loading,

        login,
        logout,

        deleteUserById,
        loadingDeleteUserById: state.loadingDeleteUserById,
        errorDeleteUserById: state.errorDeleteUserById,

        register,
        loadingRegister: state.loadingRegister,
        errorRegister: state.errorRegister,

        allUsers: state.allUsers,
        loadingAllUser: state.loadingAllUser,
        errorAllUser: state.errorAllUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

