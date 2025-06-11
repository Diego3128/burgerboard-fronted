import { useEffect } from "react";
import { useAppStore } from "../stores/useAppstore";
import { Category } from "./Category";
import { Loader } from "./Loader";
import { Logout } from "./Logout";

export const SideBar = () => {
  const categories = useAppStore((state) => state.categories);
  const getCategories = useAppStore((state) => state.getCategories);
  const loadingCategories = useAppStore((state) => state.loadingCategories);


  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      getCategories(controller.signal);
    }, 300)

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    }

  }, [getCategories]);


  console.log('sidebar rendered')

  return (
    <aside className="flex-1/4 pb-20  border-b-2 border-b-gray-400 md:border-r-2 md:border-r-gray-400">
      <div className="w-full bg-[#3B235C]" >
        <img
          className="w-10/12 my-0 mx-auto max-w-32 shadow-indigo-700 shadow-xl rounded-lg"
          src="/logo.png"
          alt="burgerboard logo"
        />
      </div>

      <div className="min-h-[50vh] relative">
        {!loadingCategories ?
          categories.map((c) => (
            <Category key={c.id} category={c} />
          )) : <Loader />
        }
      </div>
      <div>
        <Logout />
      </div>
    </aside>
  );
};
