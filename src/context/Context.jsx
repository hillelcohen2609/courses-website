import { createContext, useEffect, useState } from "react";

// Create the context
export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    const admin = localStorage.getItem("admin");
    if (storedUserId) {
      setUserId(storedUserId);
    }
    if (admin) {
      setIsAdmin(true);
    }
  }, []);

  const login = (id) => {
    localStorage.setItem("id", id);
    setUserId(id);
  };

  const adminLogin = () => {
    localStorage.setItem("admin", true);
    setIsAdmin(true);
  };

  const logout = () => {
    localStorage.clear();
    setUserId(null);
    setIsAdmin(false);
  };

  return (
    <UserContext.Provider
      value={{ userId, isAdmin, login, adminLogin, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
