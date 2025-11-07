import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'

const people = [
  { id: 1, name: 'Wade Cooper', avatar: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 2, name: 'Arlene Mccoy', avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 3, name: 'Devon Webb', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80' },
  { id: 4, name: 'Tom Cook', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
]

export function SelectUser() {
  const [selected, setSelected] = useState(people[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Listbox.Label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
        Selecionar Membro
      </Listbox.Label>
      <div className="relative mt-2">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 sm:text-sm transition-colors">
          <span className="flex items-center gap-3">
            <img
              src={selected.avatar}
              alt=""
              className="w-6 h-6 rounded-full"
            />
            <span className="block truncate dark:text-white">{selected.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="w-5 h-5 text-gray-400 dark:text-gray-300" aria-hidden="true" />
          </span>
        </Listbox.Button>

        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm transition-colors">
          {people.map((person) => (
            <Listbox.Option
              key={person.id}
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
                    <img src={person.avatar} alt="" className="w-6 h-6 rounded-full" />
                    <span className="block truncate">{person.name}</span>
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
  )
}
