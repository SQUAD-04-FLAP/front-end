// import { useReducer, useEffect } from 'react';
// import { authReducer, initialState } from '../reducer/authReducer';
// import { userAuthentication } from '../services/userAuthentication';
// import { AuthContext } from './AuthContext';
// import { jwtDecode } from 'jwt-decode';

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   useEffect(() => {
//     const storedToken = userAuthentication.getTokenFromStorage();

//    if (storedToken) {
//       try {
//         const decoded = jwtDecode(storedToken);

//         // checar expiração
//         if (decoded.exp && decoded.exp * 1000 < Date.now()) {
//           logout();
//         } else {
//           dispatch({
//             type: "LOGIN",
//             payload: { token: storedToken, user: decoded },
//           });
//         }
//       } catch (err) {
//         console.error("Token inválido", err);
//         logout();
//       }
//     }

//     dispatch({ type: "SET_LOADING", payload: false });
//   }, []);

//   const login = async (email, password) => {
//     const token = await userAuthentication.login(email, password);

//     if(!token) throw new Error("Token inválido.");

//     try {
//       const decoded = jwtDecode(token);

//       console.log("Token original:", token);
//       console.log("Token decodificado:", decoded);

//       dispatch({ type: "LOGIN", payload: { token, user: decoded } });

//       return decoded;
//     } catch (err) {
//       throw new Error("Erro ao decodificar token.", err);
//     }

//     // if(!user) throw new Error("Usuário inválido.");

//     // localStorage.setItem("user", JSON.stringify(user));
//     // dispatch({ type: "LOGIN", payload: user });
//     // return user;
//   };

//   const logout =  () => {
//     userAuthentication.logout();
//     dispatch({ type: "LOGOUT" });
//     window.location.href = "/login";
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         authenticated: !!state.user,
//         user: state.user,
//         token: state.token,
//         loading: state.loading,
//         login,
//         logout
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { useReducer, useEffect } from 'react';
import { authReducer, initialState } from '../reducer/authReducer';
import { userAuthentication } from '../services/userAuthentication';
import { catchInformationsUser } from '../services/catchInformationsUser';
import { AuthContext } from './AuthContext';
import { jwtDecode } from 'jwt-decode';

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
        const userData = await catchInformationsUser.getUserById(decoded.sub);

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

  const login = async (email, password) => {
    const token = await userAuthentication.login(email, password);

    if (!token) throw new Error("Token inválido.");

    try {
      const decoded = jwtDecode(token);

      // Buscar informações completas do usuário após login
      const userData = await catchInformationsUser.getUserById(decoded.sub);

      dispatch({ type: "LOGIN", payload: { token, user: userData } });

      return userData;
    } catch (err) {
      throw new Error("Erro ao decodificar token ou buscar usuário.", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!state.user,
        user: state.user,
        token: state.token,
        loading: state.loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

