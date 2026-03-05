import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { headerObjData } from "../Helpers/Headers";

export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState();

  async function getLoggedData() {
    try {
      const { data } = await axios.get(
        "https://route-posts.routemisr.com/users/profile-data",
        headerObjData,
      );
      setUserData(data.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      getLoggedData();
    } else {
      setUserData(null); // ✅ امسح البيانات عند logout
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, userData, getLoggedData }}>
      {children}
    </AuthContext.Provider>
  );
}
