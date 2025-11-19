import { useState, useEffect } from 'react'
import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'
import { useAuth } from '../../hooks/useAuth';

export function SelectUser() {
  const { allUsers } = useAuth();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (allUsers.length > 0 && !selected) {
      // Define o primeiro usuário como selecionado
      setSelected(allUsers[0]);
    }
  }, [allUsers]);

  if (allUsers.length === 0 || !selected) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Carregando usuários...
      </p>
    );
  }

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Listbox.Label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
        Selecionar Membro
      </Listbox.Label>

      <div className="relative mt-2">
        {/* SELECT BUTTON */}
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 sm:text-sm transition-colors">
          <span className="flex items-center gap-3">
            <img
              src={selected.avatar || "img/profile-default.jpg"}
              alt=""
              className="w-6 h-6 rounded-full"
            />
            <span className="block truncate dark:text-white">{selected.nome}</span>
          </span>

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="w-5 h-5 text-gray-400 dark:text-gray-300" aria-hidden="true" />
          </span>
        </Listbox.Button>

        {/* OPTIONS */}
        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm transition-colors">
          {allUsers.map((person) => (
            <Listbox.Option
              key={person.idUsuario}
              value={person}
              className={({ active, selected }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 rounded-lg transition-colors
                ${active ? 'bg-indigo-100 dark:bg-indigo-600 text-gray-900 dark:text-white' : 'text-gray-900 dark:text-gray-100'}
                ${selected ? 'font-semibold' : 'font-normal'}`
              }
            >
              {({ selected }) => (
                <>
                  <div className="flex items-center gap-3">
                    <img
                      src={person.avatar || "img/profile-default.jpg"}
                      alt={person.nome}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="block truncate">{person.nome}</span>
                  </div>

                  {selected && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 dark:text-indigo-400">
                      <CheckIcon className="w-5 h-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
