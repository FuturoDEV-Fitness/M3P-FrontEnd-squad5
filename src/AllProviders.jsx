import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UsuariosContextProvider } from "./context/UsuariosContext";
import { LocaisContextProvider } from "./context/LocaisContext";
import PropTypes from "prop-types";

export const AllProviders = ({ children }) => {
  return (
    <UsuariosContextProvider>
      <LocaisContextProvider>
        <ToastContainer />
        {children}
      </LocaisContextProvider>
    </UsuariosContextProvider>
  );
};

AllProviders.propTypes = {
  children: PropTypes.node,
};
