export function IconsTopSidebar({ children }) {
  return (
    <span
      className="
        flex 
        items-center
        justify-center
        w-8 h-8
        rounded-lg
        text-gray-500 
        dark:text-white
        hover:text-gray-700
        dark:hover:text-gray-300
        transition-colors
        cursor-pointer
      "
    >
      {children}
    </span>
  );
}
