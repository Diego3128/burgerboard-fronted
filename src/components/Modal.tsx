import type { JSX } from "react";
import { useAppStore } from "../stores/useAppstore";
import { ProductDetails } from "./ProductDetails";

type ModalProps = {
  children: JSX.Element | JSX.Element[];
};
export const Modal = ({ children }: ModalProps) => {
  const isModalOpen = useAppStore((state) => state.isModalOpen);
  const closeModal = useAppStore((state) => state.closeModal);

  console.log("modal rendered");

  return isModalOpen ? (
    <div className="fixed h-dvh overflow-y-auto inset-0  bg-slate-950/75 z-30 animate-showModal ">
      {/* button */}
      <div className="fixed top-0 left-0 w-full flex justify-end p-3">
        <button
          onClick={closeModal}
          className="size-10 rounded-full bg-indigo-700 hover:opacity-80 transition-opacity duration-300 cursor-pointer text-white font-black text-center"
        >
          X
        </button>
      </div>

      <div>{children}</div>
    </div>
  ) : null;
};
