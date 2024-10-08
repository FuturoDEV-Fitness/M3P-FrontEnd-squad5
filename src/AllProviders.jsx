import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UsuariosContextProvider } from "./context/UsuariosContext";
import { LocaisContextProvider } from "./context/LocaisContext";
import PropTypes from "prop-types";
import { LoginContextProvider } from "./context/LoginContext";
import { AuthProvider } from "./context/AuthContext";
import { DashboardContextProvider } from "./context/DashboardContext";

export const AllProviders = ({ children }) => {
  return (
    <UsuariosContextProvider>
      <DashboardContextProvider>
        <AuthProvider>
          <LocaisContextProvider>
            <LoginContextProvider>
              <ToastContainer />
              {children}
            </LoginContextProvider>
          </LocaisContextProvider>
        </AuthProvider>
      </DashboardContextProvider>
    </UsuariosContextProvider>
  );
};

AllProviders.propTypes = {
  children: PropTypes.node,
};
