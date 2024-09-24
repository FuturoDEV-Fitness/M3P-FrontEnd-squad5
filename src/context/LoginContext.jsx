import { createContext, useState } from "react";

import PropTypes from "prop-types";

export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [login, setLogin] = useState(true);

  const showLogin = () => {
    setLogin(true);
  };

  const showRegister = () => {
    setLogin(false);
  };

  return (
    <LoginContext.Provider value={{ login, showLogin, showRegister }}>
      {children}
    </LoginContext.Provider>
  );
};

LoginContextProvider.propTypes = {
  children: PropTypes.node,
};
