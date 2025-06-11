import { NavLink } from "react-router-dom";
import { Logout } from "../Logout";

export const AdminSidebar = () => {
    return (
        <aside className="md:flex-1/4 md:min-h-[100dvh] pb-20  border-b-2 border-b-gray-400 md:border-r-2 md:border-r-gray-400">
            <img
                className="w-10/12 mx-auto max-w-32 my-5 rounded-3xl"
                src="/logo.png"
                alt="burgerboard logo"
            />
            <div className="md:min-h-[30vh] relative flex flex-col">
                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        `navlink${isActive ? ' navlink-active' : ''}`
                    }
                >
                    Orders
                </NavLink>
                <NavLink
                    to="/admin/products"
                    end
                    className={({ isActive }) => `navlink${isActive ? ' navlink-active' : ''}`}>
                    Products
                </NavLink>
                <NavLink
                    to="/admin/categories"
                    end
                    className={({ isActive }) => `navlink${isActive ? ' navlink-active' : ''}`}>
                    Categories
                </NavLink>
                <NavLink
                    to="/admin/users"
                    end
                    className={({ isActive }) => `navlink${isActive ? ' navlink-active' : ''}`}>
                    Users
                </NavLink>
            </div>
            <div>
                <Logout label="Log Out" />
            </div>
        </aside>
    );
}
