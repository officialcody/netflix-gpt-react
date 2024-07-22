import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  const location = useLocation();
  if (user) {
    return children;
  }
  return <Navigate to={"/"} state={{ from: location }} replace />;
};

export default ProtectedRoute;
