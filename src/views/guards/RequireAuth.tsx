import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth/useAuthStore";
import { useEffect } from "react";
import { Loader } from "../../components/Loader";

export const RequireAuth = () => {
    const user = useAuthStore((state) => state.user);
    const gettingUser = useAuthStore((state) => state.gettingUser);
    const getUser = useAuthStore((state) => state.getUser);
    const hasToken = !!localStorage.getItem("AUTH-TOKEN");
    const navigate = useNavigate();

    useEffect(() => {
        // todo pass signal to abort requests on umount
        const timer = setTimeout(() => getUser(), 300);
        return () => clearTimeout(timer);
    }, [getUser]);

    useEffect(() => {
        if (!gettingUser && !user && !hasToken) {
            navigate("/auth/login");
        }
    }, [navigate, gettingUser, user, hasToken])

    // Block rendering until we know the user is either valid or not
    if (gettingUser || (!user && hasToken)) {
        return (
            <div className="relative w-full h-dvh">
                <Loader />
            </div>
        )
    }
    //If not logged in and no token — null - redirected above with useEffect
    if (!user) return null;

    return (
        <Outlet />
    )
}
