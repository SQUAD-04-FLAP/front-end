import { useReducer, useEffect } from 'react';
import { authReducer, initialState } from '../reducer/authReducer';
import { userAuthentication } from '../services/userAuthentication';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = userAuthentication.getUserFromStorage();
    if (user) dispatch({ type: "LOGIN", payload: user });
    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  const login = async (email, password) => {
    const user = await userAuthentication.login(email, password);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    userAuthentication.logout();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!state.user,
        user: state.user,
        loading: state.loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
