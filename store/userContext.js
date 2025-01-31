"use client";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        setLoading(true);

        const response = await axios.get("/api/users/me");

        console.log("Decoded Data:", response.data);

        if (response.status === 200 && response.data.data) {
          setUser(response.data.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("User fetching error:", error);
        setUser(null);
      }

      setLoading(false);
    };

    initializeUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
