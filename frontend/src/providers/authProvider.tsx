"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: {
    name: string;
    id: string;
    image:string,
    email:string
  } | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const value: AuthContextType = {
    isAuthenticated: !!session?.user,
    isLoading: status === "loading",
    user: session?.user
    ? {
      name: session.user.name ?? "",
      id: (session.user as any).id ?? "", 
      email:session.user.email??"",
      image:session.user.image??""
    }
    : null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
