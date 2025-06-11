import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AdminSidebar } from "../components/admin/AdminSidebar";

export const AdminLayout = () => {
    return (
        <>
            <div className="md:flex admin-layout">
                <AdminSidebar />
                <main className="md:flex-3/4 ">
                    <Outlet />
                </main>

                <ToastContainer
                    position="top-left"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    rtl={false}
                    theme="light"
                />
            </div>
            {/* use modal to update a product information:  */}
            {/* <Modal>
        <ProductDetails />
      </Modal> */}
        </>
    );
}
