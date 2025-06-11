import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/auth/useAuthStore";

type RestrictAccessByRoleProps = {
    allowAdmin: boolean;
    redirectTo: string;
}
export const RestrictAccessByRole = ({ allowAdmin, redirectTo }: RestrictAccessByRoleProps) => {
    const user = useAuthStore((state) => state.user);
    //A user will be always available // No need to check for user availability // This guard is inside RequireAuth guard.
    const isAdmin = user?.isadmin;
    const hasAccess = allowAdmin ? isAdmin : !isAdmin;

    return hasAccess ? <Outlet /> : <Navigate to={redirectTo} />
}
