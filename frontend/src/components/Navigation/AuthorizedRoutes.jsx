import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUser } from "../../state/slices/userSlice";

// Checks if User is authorized (i.e. logged in)
export default function AuthorizedRoutes(props) {
  // React Redux hooks
  const user = useSelector(selectUser);
  
  return (
    <>
      {user.id ? <Outlet /> : <Navigate to="/login" replace />}
    </>
  )
}
