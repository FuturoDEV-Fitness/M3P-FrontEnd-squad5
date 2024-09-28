import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { getLocalStorage } from "../helper/LocalStorageInstance";

export const PrivateRoutes = ({ children }) => {
  const usuarioLogado = getLocalStorage("user");
  return usuarioLogado ? children : <Navigate to="/login" />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
