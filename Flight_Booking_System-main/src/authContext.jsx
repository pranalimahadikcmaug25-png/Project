import { createContext, useContext, useState, useEffect } from "react";
import { isLoggedIn, clearToken } from "./auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  // Listen for changes to login status (token added/removed)
  useEffect(() => {
    const checkLogin = () => setLoggedIn(isLoggedIn());
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const login = () => setLoggedIn(true);
  const logout = () => {
    clearToken();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
