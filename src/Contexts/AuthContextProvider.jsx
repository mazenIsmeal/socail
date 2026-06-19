import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { getHeaders } from "../Helpers/Headers";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState();

  async function getLoggedData() {
    try {
      const { data } = await axios.get(
        "https://route-posts.routemisr.com/users/profile-data",
        getHeaders(),
      );
      setUserData(data.data.user);
    } catch (error) {
      console.log(error);
    }
  }

      const { data: unreadCount} = useQuery({
    queryFn: getNotificationsCount,
    queryKey: ["notifications-unread-count"],
  });

      async function getNotificationsCount() {
    try {
      const response = await axios.get(
        "https://route-posts.routemisr.com/notifications/unread-count",
        getHeaders(),
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      getLoggedData();
    } else {
      setUserData(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, userData, getLoggedData, unreadCount }}>
      {children}
    </AuthContext.Provider>
  );
}
