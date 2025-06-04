import { useEffect } from "react";
import { useAppStore } from "../stores/useAppstore";
import { Category } from "./Category";
import { Loader } from "./Loader";
import { useAuth } from "../hooks/auth/useAuth";

export const SideBar = () => {
  const categories = useAppStore((state) => state.categories);
  const getCategories = useAppStore((state) => state.getCategories);
  const loadingCategories = useAppStore((state) => state.loadingCategories);


  useEffect(() => {
    const controller = new AbortController();
    getCategories(controller.signal);

    return () => controller.abort();

  }, [getCategories]);

  const { logout, loading } = useAuth("auth", "/auth/login");

  console.log('sidebar rendered')

  return (
    <aside className="flex-1/4 pb-20  border-b-2 border-b-gray-400 md:border-r-2 md:border-r-gray-400">
      <img
        className="w-10/12 mx-auto max-w-32 my-5"
        src="/logo.svg"
        alt="burgerboard logo"
      />
      <div className="min-h-[50vh] relative">
        {!loadingCategories ?
          categories.map((c) => (
            <Category key={c.id} category={c} />
          )) : <Loader />
        }
      </div>
      <div>
        <button
          onClick={logout}
          disabled={loading}
          className={`mt-10 w-10/12 mx-auto block p-6 outline-none bg-red-500 hover:opacity-80 disabled:opacity-50 transition-opacity duration-500 text-white rounded-xl  text-center font-bold`}>
          Cancel Order and Log Out
        </button>
      </div>
    </aside>
  );
};
