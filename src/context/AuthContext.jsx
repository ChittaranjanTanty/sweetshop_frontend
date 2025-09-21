import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Optional: Check login status on mount (if you want)
  useEffect(() => {
    // You could call an endpoint like /api/auth/me to get current user
    // For simplicity, assuming cookie manages session, user stays null until login
  }, []);

  const login = (userData) => {
    setUser(userData);
    navigate("/"); // redirect after login
  };

  const logout = () => {
    setUser(null);
    // optionally call /api/auth/logout
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
