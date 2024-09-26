import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const BACKEND_API_URL = process.env.BACKEND_API_URL
  useEffect(() => {
    const whomai = async () => {
      try {
        const response = await axios.get(`https://api.dripsaint.com/api/whoami/`, {
          withCredentials: true,
        });
        console.log(response.data); // Log the response to the console
        setUser(response.data.user || "No User"); // Ensure orders is an array
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false); // Set loading to false even on error
      }
    };

    whomai(); // Call the async function
  }, []);

  return (
    <UserContext.Provider value={{ user,setUser ,loading }}>
      {children}
    </UserContext.Provider>
  );
};
