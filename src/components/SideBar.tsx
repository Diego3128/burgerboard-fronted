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
    getCategories(controller.signal);

    return () => controller.abort();

  }, [getCategories]);


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
        <Logout />
      </div>
    </aside>
  );
};
