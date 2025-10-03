import { useState } from "react";
import { Filter } from "lucide-react";
import { useSectors } from '../../hooks/useSectors';

export function FilterSectors() {
  const [selectedSector, setSelectedSector] = useState("");
  const { sectors } = useSectors();

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedSector(value);
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg transition">
      <Filter className="w-4 h-4 text-gray-700 dark:text-gray-300" />
      <select
        value={selectedSector}
        onChange={handleFilterChange}
        className="bg-transparent outline-none text-gray-700 dark:text-gray-300 cursor-pointer"
      >
        <option value="">Filtrar os setores</option>
        {sectors.map((sector) => (
          <option key={sector.idSetor} value={sector.idSetor}>
            {sector.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
