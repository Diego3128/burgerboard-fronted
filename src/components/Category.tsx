import { useAppStore } from "../stores/useAppstore";
import type { CategoryItem } from "../types";

interface CategoryProps {
  category: CategoryItem;
}
export const Category = ({ category }: CategoryProps) => {
  const setActiveCategoryId = useAppStore((state) => state.setActiveCategory);

  const activeCategoryId = useAppStore((state) => state.activeCategoryId);

  const activeCategory = activeCategoryId === category.id;

  return (
    <button
      onClick={() => setActiveCategoryId(category.id)}
      className={` animate-popIn px-2.5 py-2.5 w-full flex gap-3 justify-around items-center group bg-yellow-300 border-b-2 border-b-gray-400 hover:opacity-85 transition-opacity duration-1000 cursor-pointer ${activeCategory ? "bg-yellow-500" : ""
        }`}
    >
      <img
        src={category.icon}
        alt={`${category.name} image`}
        className="size-12 sm:size-14 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500"
      />
      <p className="truncate text-xl font-bold text-gray-800">
        {category.name}
      </p>
    </button>
  );
};
