import { useState } from "react";
import { Filter, X, Calendar, Clock } from "lucide-react";
import { SelectUser } from "../SelectUser";

export function FilterButton({ onApplyFilters = () => {}, onClearFilters = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [noMembers, setNoMembers] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [noReady, setNoReady] = useState(false);
  const [noDate, setNoDate] = useState(false);
  const [overDue, setOverdue] = useState(false);
  const [deliveryWeek, setDeliveryWeek] = useState(false);
  const [deliveryDay, setDeliveryDay] = useState(false);
  const [deliveryMonth, setDeliveryMonth] = useState(false);
  const [activeLastWeek, setActiveLastWeek] = useState(false);
  const [activeLastTwoWeeks, setActiveLastTwoWeeks] = useState(false);
  const [activeLastFourWeeks, setActiveLastFourWeeks] = useState(false);
  const [noActiveLastFourWeeks, setNoActiveLastFourWeeks] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Atualiza filtros e envia para parent quando clicar em Aplicar
  const handleApply = () => {
    const filters = {
      search,
      noMembers,
      selectedUsers: selectedUsers || [],
      isReady,
      noReady,
      noDate,
      overdue: overDue,
      deliveryDay,
      deliveryWeek,
      deliveryMonth,
      activeLastWeek,
      activeLastTwoWeeks,
      activeLastFourWeeks,
      noActiveLastFourWeeks,
    };
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSearch("");
    setNoMembers(false);
    setSelectedUsers([]);
    setIsReady(false);
    setNoReady(false);
    setNoDate(false);
    setOverdue(false);
    setDeliveryDay(false);
    setDeliveryWeek(false);
    setDeliveryMonth(false);
    setActiveLastWeek(false);
    setActiveLastTwoWeeks(false);
    setActiveLastFourWeeks(false);
    setNoActiveLastFourWeeks(false);
    onClearFilters();
    setIsOpen(false);
  };

  // SelectUser deve notificar com um array de ids ou nomes; adaptamos aqui
  const handleSelectUsersChange = (value) => {
    // espera-se value ser array de ids ou objetos; normalize para array de strings (ids ou nomes)
    if (!value) return setSelectedUsers([]);
    if (Array.isArray(value)) {
      // se cada item for objeto com idUsuario -> extrai; se for primitivo -> usa direto
      const normalized = value.map(v => {
        if (v == null) return null;
        if (typeof v === "object") {
          if (v.idUsuario) return String(v.idUsuario);
          if (v.id) return String(v.id);
          if (v.value) return String(v.value);
          if (v.nome) return String(v.nome).toLowerCase();
          return JSON.stringify(v);
        }
        return String(v);
      }).filter(Boolean);
      setSelectedUsers(normalized);
    } else {
      setSelectedUsers([String(value)]);
    }
  };

  return (
    <>
      {/* Botão de Filtro */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl 
                   bg-gray-100 text-gray-700 hover:bg-gray-200 
                   dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 
                   transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
      >
        <Filter className="w-5 h-5" />
        <span>Filtrar</span>
      </button>

      {/* Fundo de overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 transition-opacity"
        />
      )}

      {/* Modal lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-80 
                    bg-white dark:bg-gray-900 
                    shadow-xl border-l border-gray-200 dark:border-gray-700 
                    transform transition-transform duration-300 z-50
                    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Filtros
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do modal */}
        <div className="p-4 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Palavra-chave */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Palavra-chave
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Digite uma palavra..."
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg 
                         bg-gray-50 text-gray-900
                         dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Membros */}
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Membros
          </h3>

          <div className="flex items-center gap-2">
            <input
              id="noMembers"
              type="checkbox"
              checked={noMembers}
              onChange={(e) => setNoMembers(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:bg-gray-800"
            />
            <label
              htmlFor="noMembers"
              className="text-gray-700 dark:text-gray-300 text-sm font-medium cursor-pointer"
            >
              Sem membros
            </label>
          </div>

          {/* SelectUser: espera-se que esse componente chame onChange com lista */}
          <SelectUser onChange={handleSelectUsersChange} selected={selectedUsers} />

          {/* Status */}
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Status da Tarefa
          </h3>

          {[
            { id: "ready", label: "Completa", checked: isReady, setChecked: setIsReady },
            { id: "noReady", label: "Não completa", checked: noReady, setChecked: setNoReady },
          ].map((opt) => (
            <div key={opt.id} className="flex items-center gap-2">
              <input
                id={opt.id}
                type="checkbox"
                checked={opt.checked}
                onChange={(e) => opt.setChecked(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:bg-gray-800"
              />
              <label
                htmlFor={opt.id}
                className="text-gray-700 dark:text-gray-300 text-sm font-medium cursor-pointer"
              >
                {opt.label}
              </label>
            </div>
          ))}

          {/* Datas */}
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Data de vencimento
          </h3>

          {[
            { id: "noDate", label: "Sem Data", icon: <Calendar className="w-4 h-4 text-gray-500" />, state: noDate, set: setNoDate },
            { id: "overdue", label: "Atrasada", icon: <Clock className="w-4 h-4 text-red-500" />, state: overDue, set: setOverdue },
            { id: "deliveryDay", label: "Com vencimento no dia seguinte", icon: <Clock className="w-4 h-4 text-yellow-500" />, state: deliveryDay, set: setDeliveryDay },
            { id: "deliveryWeek", label: "A ser entregue em uma semana", icon: <Clock className="w-4 h-4 text-gray-400" />, state: deliveryWeek, set: setDeliveryWeek },
            { id: "deliveryMonth", label: "A ser entregue em um mês", icon: <Clock className="w-4 h-4 text-gray-400" />, state: deliveryMonth, set: setDeliveryMonth },
          ].map(({ id, label, icon, state, set }) => (
            <div key={id} className="flex items-center gap-3">
              <input
                id={id}
                type="checkbox"
                checked={state}
                onChange={(e) => set(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:bg-gray-800"
              />
              <label
                htmlFor={id}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                {icon}
                {label}
              </label>
            </div>
          ))}

          {/* Atividade */}
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Atividade
          </h3>

          {[
            { id: "activeLastWeek", label: "Ativo na semana passada", state: activeLastWeek, set: setActiveLastWeek },
            { id: "activeLastTwoWeeks", label: "Ativo nas últimas duas semanas", state: activeLastTwoWeeks, set: setActiveLastTwoWeeks },
            { id: "activeLastFourWeeks", label: "Ativo nas últimas quatro semanas", state: activeLastFourWeeks, set: setActiveLastFourWeeks },
            { id: "noActiveLastFourWeeks", label: "Sem atividade nas últimas quatro semanas", state: noActiveLastFourWeeks, set: setNoActiveLastFourWeeks },
          ].map(({ id, label, state, set }) => (
            <div key={id} className="flex items-center gap-3">
              <input
                id={id}
                type="checkbox"
                checked={state}
                onChange={(e) => set(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:bg-gray-800"
              />
              <label
                htmlFor={id}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm font-medium cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                {label}
              </label>
            </div>
          ))}
        </div>

        {/* Rodapé do modal: botões Aplicar / Limpar */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex gap-2 justify-end">
          <button
            onClick={handleClear}
            className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
          >
            Limpar
          </button>
          <button
            onClick={handleApply}
            className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Aplicar
          </button>
        </div>
      </div>
    </>
  );
}
