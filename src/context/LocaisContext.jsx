import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import { GetLocations, Delete } from "../services/Locais";
import { DashboardContext } from "./DashboardContext";

export const LocaisContext = createContext();

export const LocaisContextProvider = ({ children }) => {
  const [locais, setLocais] = useState([]);
  const [usuarioLocais, setUsuarioLocais] = useState([]);
  const { user, isLogged } = useContext(AuthContext);
  const { fetchData } = useContext(DashboardContext);

  const fetchLocais = async () => {
    try {
      const response = await GetLocations();
      if (response.status === 200) {
        setLocais(response.data);

        if (isLogged && user) {
          const userLocais = response.data.filter(
            (local) => local.id_usuario === user.id
          );
          setUsuarioLocais(userLocais);
        }
      } else {
        toast.error(response.data.mensagem, {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar os locais:", error);
      toast.error(error, {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
    }
  };

  const deleteLocal = async (id) => {
    try {
      const response = await Delete(id);

      if (response && response.status !== 204) {
        toast.error(response.data.message, {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
      } else {
        fetchLocais();
        fetchData();
        toast.success("Local deletado com sucesso!", {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Erro ao deletar o local:", error);
      toast.error(error.response?.data.message || error.message, {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    fetchLocais();
  }, []);

  return (
    <LocaisContext.Provider
      value={{
        locais,
        usuarioLocais,
        setLocais,
        setUsuarioLocais,
        deleteLocal,
        fetchLocais,
      }}
    >
      {children}
    </LocaisContext.Provider>
  );
};

LocaisContextProvider.propTypes = {
  children: PropTypes.node,
};
