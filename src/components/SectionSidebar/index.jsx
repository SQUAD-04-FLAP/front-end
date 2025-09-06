export function SectionSidebar({ children }) {
  return (
    <div className="px-4 mt-6 mb-2">
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider pb-1">
        {children}
      </p>
    </div>
  );
}
