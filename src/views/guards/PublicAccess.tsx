import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../stores/auth/useAuthStore";
import { Loader } from "../../components/Loader";

export const PublicAccess = () => {
    // block access if there is a user, or token available
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
    const hasToken = !!localStorage.getItem('AUTH-TOKEN');

    const isAuthenticated = !!user || !!token || hasToken;

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }

    }, [isAuthenticated, navigate])

    if (isAuthenticated) {
        return (
            <div className="relative w-full h-dvh">
                <Loader />
            </div>
        )
    }

    // access only tounauthenticated users
    return (
        <>
            <Outlet />
        </>
    )
}
