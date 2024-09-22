import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const LocaisContext = createContext();

export const LocaisContextProvider = ({ children }) => {
  const [locais, setLocais] = useState([]);

  return (
    <LocaisContext.Provider
      value={{
        locais,
        setLocais,
      }}
    >
      {children}
    </LocaisContext.Provider>
  );
};

LocaisContextProvider.propTypes = {
  children: PropTypes.node,
};
