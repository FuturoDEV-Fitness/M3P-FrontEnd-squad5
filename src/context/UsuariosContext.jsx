import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UsuariosContext = createContext();

export const UsuariosContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);

  return (
    <UsuariosContext.Provider value={{ usuarios, setUsuarios }}>
      {children}
    </UsuariosContext.Provider>
  );
};

UsuariosContextProvider.propTypes = {
  children: PropTypes.node,
};
