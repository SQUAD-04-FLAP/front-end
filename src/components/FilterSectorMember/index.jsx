import { useState, useEffect } from "react";
import { useAuth } from '../../hooks/useAuth';

export function FilterSectorMember({ onFilter }) {
  const [setorSelecionado, setSetorSelecionado] = useState("");
  const { user } = useAuth();

  // Ao montar, restaurar o valor salvo no localStorage
  useEffect(() => {
    const savedSector = localStorage.getItem('selectedSector');
    if (savedSector) {
      setSetorSelecionado(savedSector);
      onFilter(savedSector); // aplica o filtro automaticamente
    }
  }, [onFilter]);

  // Salvar no localStorage sempre que mudar
  const handleChange = (e) => {
    const value = e.target.value;
    setSetorSelecionado(value);
    localStorage.setItem('selectedSector', value);
    onFilter(value);
  };

  return (
    <div className="relative inline-block">
      <select
        value={setorSelecionado}
        onChange={handleChange}
        className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-gray-700 transition"
      >
        <option value="">Filtrar por setor</option>
        {user.setores.map((setor) => (
          <option key={setor.idSetor} value={setor.idSetor}>
            {setor.nomeSetor}
          </option>
        ))}
      </select>
    </div>
  );
}
