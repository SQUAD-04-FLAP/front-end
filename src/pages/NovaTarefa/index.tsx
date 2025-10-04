import { useState, ChangeEvent } from "react";
import { Plus, ClipboardList, Calendar, User, Layers, AlertCircle, CheckCircle2 } from "lucide-react";

export default function NovaTarefa() {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    responsavel: "",
    prioridade: "Média",
    dataInicio: "",
    dataFim: "",
    setor: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setores = ["Marketing", "Design", "Atendimento", "TI"];
  const prioridades = ["Baixa", "Média", "Alta"];

  const prioridadeColors = {
    Baixa: "bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700",
    Média: "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700",
    Alta: "bg-red-100 text-red-700 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700",
  };

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
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
    const newErrors: Record<string, string> = {};

    if (!form.titulo.trim()) newErrors.titulo = "O título é obrigatório";
    if (!form.descricao.trim()) newErrors.descricao = "A descrição é obrigatória";
    if (!form.responsavel.trim()) newErrors.responsavel = "O responsável é obrigatório";
    if (!form.setor) newErrors.setor = "Selecione um setor";
    
    if (form.dataInicio && form.dataFim && form.dataInicio > form.dataFim) {
      newErrors.dataFim = "A data de término deve ser posterior à data de início";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validateForm()) {
      return;
    }

    setShowSuccess(true);

    setTimeout(() => {
      setForm({
        titulo: "",
        descricao: "",
        responsavel: "",
        prioridade: "Média",
        dataInicio: "",
        dataFim: "",
        setor: "",
      });
      setShowSuccess(false);
    }, 2000);
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
                Descrição *
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

            {/* Responsável e Setor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  <User className="w-4 h-4 mr-2 text-cyan-500" />
                  Responsável *
                </label>
                <input
                  type="text"
                  name="responsavel"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.responsavel ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder="Nome do responsável"
                  value={form.responsavel}
                  onChange={handleChange}
                />
                {errors.responsavel && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.responsavel}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  <Layers className="w-4 h-4 mr-2 text-cyan-500" />
                  Setor *
                </label>
                <select
                  name="setor"
                  value={form.setor}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.setor ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <option value="">Selecione um setor</option>
                  {setores.map((setor) => (
                    <option key={setor} value={setor}>
                      {setor}
                    </option>
                  ))}
                </select>
                {errors.setor && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.setor}
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
                        ? prioridadeColors[p as keyof typeof prioridadeColors] + " scale-105 shadow-md"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-650"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Datas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-cyan-500" />
                  Data de Início
                </label>
                <input
                  type="date"
                  name="dataInicio"
                  value={form.dataInicio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-cyan-500" />
                  Data de Término
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

            {/* Botão de Submit */}
            <div className="flex justify-end pt-4">
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