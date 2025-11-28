import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export function SelectUser() {
  const { allUsers } = useAuth();

  const dropdowns = [
    {
      name: "users",
      label: "Responsáveis",
      items: allUsers.map((user) => ({
        value: user.idUsuario,
        label: user.nome,
      })),
    },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedValues, setSelectedValues] = useState({});

  function toggleItem(dropdownName, value) {
    setSelectedValues((prev) => {
      const list = prev[dropdownName] || [];

      if (list.includes(value)) {
        return { ...prev, [dropdownName]: list.filter((i) => i !== value) };
      }

      return {
        ...prev,
        [dropdownName]: [...list, value],
      };
    });
  }

  function removeFilter(dropdownName, value) {
    setSelectedValues((prev) => ({
      ...prev,
      [dropdownName]: prev[dropdownName].filter((i) => i !== value),
    }));
  }

  function getSelectedLabel(dropdown) {
    const items = selectedValues[dropdown.name] || [];
    if (items.length === 0) return dropdown.label;
    return `${dropdown.label}: ${items.length}`;
  }

  return (
    <div className="w-full">
      {/* Dropdown */}
      <div className="flex flex-wrap items-start gap-2">
        {dropdowns.map((dropdown) => {
          const items = dropdown.items.filter((item) =>
            item.label.toLowerCase().includes(search.toLowerCase())
          );

          return (
            <div key={dropdown.name} className="relative w-full md:w-48 mb-4">
              {/* Button */}
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === dropdown.name ? null : dropdown.name
                  )
                }
                className="
                  inline-flex justify-between w-full 
                  bg-gray-50 dark:bg-gray-800 
                  rounded px-2 py-2 
                  text-base text-stone-700 dark:text-stone-200 
                  border border-stone-300 dark:border-stone-600
                "
              >
                <span className="truncate mx-2">{getSelectedLabel(dropdown)}</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-stone-600 dark:text-stone-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              {openDropdown === dropdown.name && (
                <div
                  className="
                    absolute z-20 w-full mt-2 rounded 
                    bg-white dark:bg-gray-900 
                    ring-2 ring-rose-200 dark:ring-rose-400/40 
                    border border-rose-500 dark:border-rose-400
                  "
                >
                  {/* Search */}
                  <input
                    className="
                      w-full px-4 py-2 
                      border-b border-gray-200 dark:border-gray-700 
                      bg-white dark:bg-gray-800 
                      text-gray-700 dark:text-gray-200 
                      focus:outline-none
                    "
                    placeholder={`Buscar ${dropdown.label}`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  {/* Items */}
                  <div className="max-h-60 overflow-y-auto">
                    {items.length === 0 && (
                      <div className="px-4 py-2 text-gray-400 dark:text-gray-500">
                        Nenhum usuário encontrado
                      </div>
                    )}

                    {items.map((item) => {
                      const isSelected =
                        selectedValues[dropdown.name]?.includes(item.value);

                      return (
                        <div
                          key={item.value}
                          onClick={() => toggleItem(dropdown.name, item.value)}
                          className={`
                            px-4 py-2 cursor-pointer flex items-center gap-2
                            ${
                              isSelected
                                ? "bg-rose-200 dark:bg-rose-400/30"
                                : "bg-white dark:bg-gray-900"
                            }
                            hover:bg-rose-100 dark:hover:bg-gray-800
                            text-gray-700 dark:text-gray-200
                          `}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            className="w-4 h-4"
                          />
                          <span>{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tags selecionadas */}
      <div className="flex flex-wrap gap-2 mb-6">
        {dropdowns.map((dropdown) => {
          const selected = selectedValues[dropdown.name] || [];

          return selected.map((value) => {
            const item = dropdown.items.find((i) => i.value === value);

            return (
              <span
                key={value}
                className="
                  flex items-center px-3 py-1 rounded-full 
                  bg-rose-100 dark:bg-rose-400/20 
                  text-rose-800 dark:text-rose-300
                "
              >
                {item.label}
                <button
                  onClick={() => removeFilter(dropdown.name, value)}
                  className="ml-2"
                >
                  ✕
                </button>
              </span>
            );
          });
        })}
      </div>
    </div>
  );
}
