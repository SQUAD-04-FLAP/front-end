export function ContainerLinks({ children }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 transition cursor-pointer 
                    bg-gray-100 dark:bg-gray-900 
                    text-gray-800 dark:text-gray-100 
                    hover:bg-gray-200 dark:hover:bg-gray-800 
                    hover:text-gray-900 dark:hover:text-gray-200 
                    group">
      {children}
    </div>
  );
}
