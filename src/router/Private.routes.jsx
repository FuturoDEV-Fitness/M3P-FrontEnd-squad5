import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const PrivateRoutes = ({ children }) => {
  const { isLogged } = useContext(AuthContext);
  return isLogged ? children : <Navigate to="/login" />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
