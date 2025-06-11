import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth/useAuthStore"
import { useAppStore } from "../stores/useAppstore";

type LogoutProps = {
    label?: string
}
export const Logout = ({ label = 'Cancel Order And Log Out' }: LogoutProps) => {

    const placingOrder = useAppStore((state) => state.placingOrder);
    const logout = useAuthStore((state) => state.logout);
    const loading = useAuthStore((state) => state.loading);
    const navigate = useNavigate();

    return (
        <button
            onClick={() => logout(navigate)}
            disabled={loading || placingOrder}
            className={`mt-10 w-10/12 mx-auto block p-4 max-w-52 outline-none bg-red-500 hover:opacity-80 disabled:opacity-50 transition-opacity duration-500 text-white rounded-xl  text-center font-bold hover:cursor-pointer text-balance`}>
            {label}
        </button>
    )
}
