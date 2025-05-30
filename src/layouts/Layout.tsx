import { Outlet } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import { Summary } from "../components/Summary";
import { Modal } from "../components/Modal";
import { ProductDetails } from "../components/ProductDetails";
import { ToastContainer } from "react-toastify";

export const Layout = () => {
  return (
    <div className="md:flex">
      <SideBar />
      <main className="md:flex-2/4">
        <Outlet />
      </main>

      <div className="md:flex-1/4 py-4">
        <Summary />
      </div>

      <Modal>
        <ProductDetails />
      </Modal>

      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
