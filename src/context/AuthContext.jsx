import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // MOCK USER – backend will replace this later
  const [user, setUser] = useState({
    id: "u-1",
    name: "System Admin",
    email: "sys@admin.com",

    // identity-level
    is_super_admin: true,

    // contextual role (per org)
    role: "SYSTEM", // SYSTEM | ADMIN | USER
  });

  // active organization (SYSTEM may ignore this)
  const [activeOrg, setActiveOrg] = useState({
    id: "org-1",
    name: "Org One",
  });

  // role helpers (VERY IMPORTANT)
  const isSystem = user?.role === "SYSTEM";
  const isAdmin = user?.role === "ADMIN";
  const isUser = user?.role === "USER";

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        activeOrg,
        setActiveOrg,

        // helpers
        isSystem,
        isAdmin,
        isUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);


