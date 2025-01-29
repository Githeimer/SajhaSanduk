"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; //
import DecodeTokenData from "@/helpers/DecodeTokenData";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      setLoading(true);
      const token = Cookies.get("token");
      if (token) {
        try {
          const decodedData = await DecodeTokenData(token);
          if (decodedData.success) {
            const id = decodedData.data.id;
            const userData = await axios.get(`/api/users?uid=${id}`);
            if (userData.data.success) {
              setUser(userData.data.data);
            } else {
              console.error("Error finding user:", userData.data.message);
            }
          }
        } catch (error) {
          console.error("Failed to initialize user:", error);
        }
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

  if (loading) return <div>Loading...</div>;

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
