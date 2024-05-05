import * as React from "react";
import { useNavigate } from "react-router-dom";

interface IAuthContext {
  isLoggedIn: boolean;
  role?: boolean;
  checkToken: () => void;
  logout: () => void;
}

const AuthContext = React.createContext<IAuthContext | any>({});

export const AuthProvider = (props: any) => {
  const router = useNavigate();
  const [isLoggedIn, setLoggedIn] = React.useState<boolean>(false);
  const [role, setRole] = React.useState<String>("");
  const checkToken = () => {
    const tokan = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    role && setRole(role);
    setLoggedIn(!!Boolean(tokan));
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.clear();
    setRole("");
    setLoggedIn(false);
    router("/");
  };
  const userlogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.clear();
    setRole("");
    setLoggedIn(false);
    router("/");
  };
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, checkToken, logout, userlogout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  const context = React.useContext<IAuthContext>(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within the AppProvider");
  }

  return context;
}
