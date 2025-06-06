import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth/useAuthStore"

export const Logout = () => {

    const logout = useAuthStore((state) => state.logout);
    const loading = useAuthStore((state) => state.loading);
    const navigate = useNavigate();

    return (
        <button
            onClick={() => logout(navigate)}
            disabled={loading}
            className={`mt-10 w-10/12 mx-auto block p-6 outline-none bg-red-500 hover:opacity-80 disabled:opacity-50 transition-opacity duration-500 text-white rounded-xl  text-center font-bold`}>
            Cancel Order and Log Out
        </button>
    )
}
