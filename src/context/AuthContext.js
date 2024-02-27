import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

const AuthContext = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = JSON.parse(localStorage.getItem("access_token"));

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  };

  return (
    <Context.Provider value={{ user, setUser, signOut, token, setToken }}>
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => useContext(Context);

export default AuthContext;
