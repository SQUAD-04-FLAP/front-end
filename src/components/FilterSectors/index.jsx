import { useSectors } from '../../hooks/useSectors';
import { useFilter } from '../../hooks/useFilter';
import { Filter } from "lucide-react";

export function FilterSectors() {
  const { sectors } = useSectors();
  const { state, setSelectedSector } = useFilter();

  const handleFilterChange = (e) => {
    setSelectedSector(e.target.value);
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg transition">
      <Filter className="w-4 h-4 text-gray-700 dark:text-gray-300" />
      <select
        value={state.selectedSector}
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
