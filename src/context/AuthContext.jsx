import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [roles, setRoles] = useState(localStorage.getItem("roles"))
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = (newToken, newUserId, newRoles) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", newUserId);
    localStorage.setItem("roles", newRoles);
    setToken(newToken);
    setUserId(newUserId);
    setRoles(newRoles);
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("roles");
    setToken(null);
    setUserId(null);
    setRoles(null);
  }

  const value = {
    token,
    userId,
    roles,
    isAuthenticated: !!token,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    console.log("useAuth must be used within an AuthProvider")
  }
  return context;
}