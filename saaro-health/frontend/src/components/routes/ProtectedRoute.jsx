import { Navigate } from "react-router-dom";
import cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  // const token = cookies.get("jwt_token");

  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

export default ProtectedRoute;
