import { createContext, useEffect, useState } from "react";
import api from "../../../config/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Check if user already authenticated (on app load)
  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/users/me/");
      setUser(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        setUser(null);
      } else {
        console.warn("Auth check failed:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Login function (centralized)
  const login = async (email, password) => {
    // Backend sets cookie
    await api.post("/login", { email, password });

    // Now fetch user using cookie
    const response = await api.get("/users/me/");
    setUser(response.data);
  };


  // 🔹 Register function (centralized)
  const register = async (name, email, password, nic, address, phone, role) => {
    // Backend sets cookie
    await api.post("/add-user", { name, email, password, nic, address, phone, role });

  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      // ignore
    } finally {
      setUser(null);
      localStorage.setItem("logout", Date.now());
    }
  };

  // useEffect(() => {
  //   fetchCurrentUser();
  // }, []);

  let authChecked = false;

  useEffect(() => {
  if (!authChecked) {
    fetchCurrentUser();
    authChecked = true;
  }
}, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};