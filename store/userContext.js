"use client";
import { createContext, useContext, useState, useEffect } from "react";

import cookie from "js-cookie";
import DecodeTokenData from "@/helpers/DecodeTokenData";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      setLoading(true);

      const decodedData = await axios.get("api/users/me");
      console.log("This is Decoded Data:" + decodedData);
      if (decodedData.statusText) {
        setUser(decodedData.data);
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
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
