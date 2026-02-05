import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // MOCKED backend response
  const [user] = useState({
    id: "u1",
    name: "Nikita",
    role: "ORG_ADMIN", // SUPER_ADMIN | ORG_ADMIN | USER
    is_super_admin: false, // true ONLY for SUPER_ADMIN
  });

  const [activeOrg, setActiveOrg] = useState({
    id: "org1",
    name: "Org One",
  });

  return (
    <AuthContext.Provider value={{ user, activeOrg, setActiveOrg }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
