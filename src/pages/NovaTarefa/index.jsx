import { useState, useEffect, ChangeEvent } from "react";
import { Plus, ClipboardList, Calendar, User, Layers, AlertCircle, CheckCircle2, Columns, ArrowLeft, Building2 } from "lucide-react";
import { useKanbanMember } from '../../hooks/useKanbanMember';
import { FilterBoardMember } from "../../components/FilterBoardMember";
import { createTask } from '../../services/tasks';
import { useAuth } from '../../hooks/useAuth';
import { useFramer } from "../../hooks/useFramer";
import { useSectors } from '../../hooks/useSectors';

export default function NovaTarefa() {
  const { user, allUsers } = useAuth();
  const { framers } = useFramer();
  const { sectors } = useSectors();
  
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    prioridade: "",
    dataFim: "",
    quadro: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const { dispatch } = useKanbanMember();

  const prioridades = ["Baixa", "Média", "Alta"];

  useEffect(() => {
    window.HSSelect?.autoInit();
  }, []);
  


  const prioridadeColors = {
    Baixa: "bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700",
    Média: "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700",
    Alta: "bg-red-100 text-red-700 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700",
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }

  function validateForm() {
    const newErrors = {};

    if (!form.titulo.trim()) newErrors.titulo = "O título é obrigatório";
    if (!form.quadro) newErrors.quadro = "O quadro é obrigatório.";
    if (!form.dataFim) newErrors.dataFim = "A data de término é obrigatório.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
  if (!validateForm()) return;

  try {
    const idCriador = user.idUsuario;
    const idQuadro = Number(form.quadro);

     const dtTermino = new Date(`${form.dataFim}T00:00:00.000Z`).toISOString();

     console.log("Enviado", form);

    const novaTarefa = await createTask({
      titulo: form.titulo,
      descricao: form.descricao,
      dtTermino,
      prioridade: form.prioridade,
      idQuadro,
      idCriador,
    });

    // Atualiza o estado local ou global, ex:
    dispatch({ type: "ADD_TASK", payload: novaTarefa });

    setShowSuccess(true);

    setTimeout(() => {
      setForm({
        titulo: "",
        descricao: "",
        prioridade: "",
        dataFim: "",
        quadro: "",
      });
      setShowSuccess(false);
    }, 2000);
  } catch (e) {
    console.error("Erro ao criar tarefa:", e);
  }
}

  return (
    <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header com animação */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <ClipboardList className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Criar Nova Tarefa
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Organize seu trabalho de forma eficiente
          </p>
        </div>

        {/* Notificação de Sucesso */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-4 rounded-r-lg shadow-md animate-pulse">
            <div className="flex items-center">
              <CheckCircle2 className="w-6 h-6 text-green-500 mr-3" />
              <p className="text-green-700 dark:text-green-300 font-semibold">Tarefa criada com sucesso!</p>
            </div>
          </div>
        )}

        {/* Formulário */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            {/* Título */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                <ClipboardList className="w-4 h-4 mr-2 text-cyan-500" />
                Título da Tarefa *
              </label>
              <input
                type="text"
                name="titulo"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.titulo ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="Ex: Criar post para Instagram"
                value={form.titulo}
                onChange={handleChange}
              />
              {errors.titulo && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.titulo}
                </p>
              )}
            </div>

            {/* Descrição */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                <Layers className="w-4 h-4 mr-2 text-cyan-500" />
                Descrição
              </label>
              <textarea
                name="descricao"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white min-h-[120px] resize-none ${
                  errors.descricao ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
                placeholder="Detalhe os objetivos e requisitos da tarefa..."
                value={form.descricao}
                onChange={handleChange}
              />
              {errors.descricao && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.descricao}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                <Columns className="w-4 h-4 mr-2 text-cyan-500" />
                Quadro *
              </label>
              <select
                name="quadro"
                value={form.quadro}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.quadro ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <option value="">Selecione um quadro</option>
                {framers.map((framer) => (
                  <option key={framer.idQuadro} value={framer.idQuadro}>
                    {framer.nome}
                  </option>
                ))}
              </select>
              {errors.quadro && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.quadro}
                </p>
              )}
            </div>

             <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                <Building2 className="w-4 h-4 mr-2 text-cyan-500" />
                Empresa *
              </label>
              <select
                name="empresa"
                value={form.empresa}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.empresa ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <option value="">Selecione uma empresa</option>
                {sectors.map((sector) => (
                  <option key={sector.idSector} value={sector.idSector}>
                    {sector.nome}
                  </option>
                ))}
              </select>
              {errors.empresa && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <Building2 className="w-4 h-4 mr-1" />
                  {errors.empresa}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                <User className="w-4 h-4 mr-2 text-cyan-500" />
                Responsável *
              </label>

              <select
                id="responsavelSelect"
                multiple
                onChange={() => {
                const instance = window.HSSelect.getInstance("#responsavelSelect");
                instance?.close();
              }}
                data-hs-select='{
                  "placeholder": "Selecione...",
                  "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-gray-700 dark:border-neutral-700",
                  "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-neutral-800 dark:text-dark:focus:bg-neutral-800",
                  "mode": "tags",
                  "wrapperClasses": "relative ps-0.5 pe-9 min-h-11.5 flex items-center flex-wrap text-nowrap w-full border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-neutral-700 dark:text-neutral-400",
                  "tagsItemTemplate": "<div class=\"flex flex-nowrap items-center relative z-10 bg-white border border-gray-200 rounded-full p-1 m-1 dark:bg-gray-700 dark:border-neutral-700 \"><div class=\"size-6 me-1\" data-icon></div><div class=\"whitespace-nowrap text-gray-800 dark:text-neutral-200 \" data-title></div><div class=\"inline-flex shrink-0 justify-center items-center size-5 ms-2 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-hidden focus:ring-2 focus:ring-gray-400 text-sm dark:bg-neutral-700/50 dark:hover:bg-neutral-700 dark:text-neutral-400 cursor-pointer\" data-remove><svg class=\"shrink-0 size-3\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg></div></div>",
                  "tagsInputId": "hs-tags-input",
                  "tagsInputClasses": "py-2.5 sm:py-3 px-2 min-w-20 rounded-lg order-1 border-transparent focus:ring-0 sm:text-sm outline-hidden dark:bg-gray-700 dark:placeholder-neutral-500 dark:text-neutral-400",
                  "optionTemplate": "<div class=\"flex items-center\"><div class=\"size-8 me-2\" data-icon></div><div><div class=\"text-sm font-semibold text-gray-800 dark:text-neutral-200 \" data-title></div><div class=\"text-xs text-gray-500 dark:text-neutral-500 \" data-description></div></div><div class=\"ms-auto\"><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-4 text-blue-600\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/></svg></span></div></div>",
                  "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                }'
                className="hidden"
              >

                <option value="">Escolher...</option>

                {allUsers?.map((u) => (
                  <option
                    key={u.id}
                    value={u.id}
                    data-hs-select-option={JSON.stringify({
                      description: u.email ?? "",
                      icon: `<img class="inline-block rounded-full" src="${u.avatarUrl || "https://ui-avatars.com/api/?name=" + u.nome}" />`
                    })}
                  >
                    {u.nome}
                  </option>
                ))}
              </select>
            </div>

             <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-cyan-500" />
                  Data de Término *
                </label>
                <input
                  type="date"
                  name="dataFim"
                  value={form.dataFim}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white ${
                    errors.dataFim ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                {errors.dataFim && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.dataFim}
                  </p>
                )}
              </div>


            </div>

             {/* Prioridade com visual melhorado */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                <AlertCircle className="w-4 h-4 mr-2 text-cyan-500" />
                Prioridade
              </label>
              <div className="grid grid-cols-3 gap-3">
                {prioridades.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, prioridade: p }))}
                    className={`px-4 py-3 rounded-lg font-semibold border-2 transition-all ${
                      form.prioridade === p
                        ? prioridadeColors[p] + " scale-105 shadow-md"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-650"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 gap-4">
              {/* Botão Voltar */}
              <button
                type="button"
                onClick={() => window.history.back()} // ou useNavigate() se estiver com React Router
                className="flex items-center gap-2 px-8 py-4 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>
              
              {/* Botão Criar Tarefa */}
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                Criar Tarefa
              </button>
            </div>

          </div>
        </div>

        {/* Footer informativo */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          * Campos obrigatórios
        </div>
      </div>
    </div>
  );
} 