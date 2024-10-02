import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getLocalStorage,
  deleteLocalStorage,
  setLocalStorage,
} from "../helper/LocalStorageInstance";
import { Auth } from "../services/Login";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    const storedToken = getLocalStorage("token");
    if (storedToken && !isTokenExpired(storedToken)) {
      const decodedUser = jwtDecode(storedToken);
      setUser(decodedUser);
      setIsLogged(true);
    } else if (storedToken && isTokenExpired(storedToken)) {
      logout();
      toast.info("Sessão expirada, por favor, faça login novamente", {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
    }
  }, []);

  const login = async (data) => {
    try {
      const token = await Auth(data);

      if (token.status !== 201) {
        toast.error(`${token.data.mensagem}`, {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
        return false;
      }
      const jwtDecoded = jwtDecode(token.data.token);
      setLocalStorage("token", token.data.token);
      setUser(jwtDecoded);
      setIsLogged(true);
      toast.success(`Bem Vindo! ${jwtDecoded.nome}`, {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
      return true;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return false;
    }
  };

  const logout = () => {
    setIsLogged(false);
    setUser(null);
    deleteLocalStorage("token");
  };

  return (
    <AuthContext.Provider value={{ user, isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
