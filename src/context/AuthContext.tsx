"use client";
import { useState, createContext, useCallback, useEffect } from "react";

import { AuthInterface } from "@/types/Auth";
import { ProviderProps } from "@/types/Context";

const AuthContext = createContext<AuthInterface>({
  isAuthenticated: false,
  setAuthenticated: () => null,
  refreshAuthContext: () => null,
  logout: () => null,
});

function AuthProvider(props: ProviderProps) {
  const { children } = props;

  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setAuthenticated(!!window.localStorage.getItem("token"));
  }, []);

  const refreshAuthContext = useCallback(
    () => setAuthenticated(!!window.localStorage.getItem("token")),
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");

    refreshAuthContext();
  }, [refreshAuthContext]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, refreshAuthContext, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
