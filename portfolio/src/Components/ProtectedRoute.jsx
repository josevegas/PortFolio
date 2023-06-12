import { Navigate,Outlet } from "react-router-dom";

export default function ProtectedRoute({isAllowed, children, redirectTo="/"}){
    if(!isAllowed){
        return <Navigate to={redirectTo} />
    }
    return children? children:<Outlet />;
}