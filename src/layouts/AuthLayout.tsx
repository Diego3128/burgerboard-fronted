import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
    return (
        <main className="max-w-4xl mx-auto py-10 px-3 md:px-10 mt-5 md:flex md:justify-between md:items-center md:gap-5  
        ">
            <img className="mb-10 md:mb-0 mx-auto md:mx-0  w-1/2 max-w-56" src="/logo.svg" alt="burgerboard logo" />

            <Outlet />
        </main>
    );
};
