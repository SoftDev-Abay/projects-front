import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

const AuthContext = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser ? storedUser : null);

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Context.Provider value={{ user, setUser, signOut }}>
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => useContext(Context);

export default AuthContext;
