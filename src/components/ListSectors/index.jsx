import { useSectors } from '../../hooks/useSectors';

export function ListSectors() {
  const { sectors, loading, error } = useSectors();

  console.log(sectors);

  if (loading) return <p className='text-center p-4'>Carregando setores...</p>;
  if (error) return <p className='text-red-500 text-center p-4'>Erro ao carregar setores.</p>;

  if (!sectors || sectors.length === 0) return <p className='dark:text-white text-center p-4'>Ainda não há nenhum setor cadastrado.</p>;

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {sectors.map((setor, index) => (
        <button
          key={setor.id ?? index}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          {setor.nome ?? setor}
        </button>
      ))}
    </div>
  );
}