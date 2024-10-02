import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UsuariosContextProvider } from "./context/UsuariosContext";
import { LocaisContextProvider } from "./context/LocaisContext";
import PropTypes from "prop-types";
import { LoginContextProvider } from "./context/LoginContext";
import { AuthProvider } from "./context/AuthContext";

export const AllProviders = ({ children }) => {
  return (
    <UsuariosContextProvider>
      <LocaisContextProvider>
        <AuthProvider>
          <LoginContextProvider>
            <ToastContainer />
            {children}
          </LoginContextProvider>
        </AuthProvider>
      </LocaisContextProvider>
    </UsuariosContextProvider>
  );
};

AllProviders.propTypes = {
  children: PropTypes.node,
};
