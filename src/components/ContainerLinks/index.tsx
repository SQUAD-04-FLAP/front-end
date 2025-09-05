export function ContainerLinks({ children }) {
    return(
        <div className="flex items-center gap-2 px-4 py-3 transition cursor-pointer group hover:bg-gray-800 hover:text-gray-200">
            {children}
        </div>
    );
}