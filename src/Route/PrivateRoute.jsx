import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); 

  if (token) {
    return children; 
  } else {
    return <Navigate to="/auth/login" replace />;
  }
};

export default PrivateRoute;
