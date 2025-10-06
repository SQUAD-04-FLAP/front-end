import { MessageCircle, Plus, Paperclip } from "lucide-react";

export function BoardAdmin({ tasks }) {

  const colunas = [
    { nome: 'A Fazer', cor: 'bg-gray-100', contadorCor: 'bg-gray-500' },
    { nome: 'Em Andamento', cor: 'bg-blue-100', contadorCor: 'bg-blue-500' },
    { nome: 'Revisão', cor: 'bg-yellow-100', contadorCor: 'bg-yellow-500' },
    { nome: 'Concluído', cor: 'bg-green-100', contadorCor: 'bg-green-500' }
  ];

  const getAvatar = (nome) => {
    if (!nome) return `https://ui-avatars.com/api/?name=?&background=random&color=fff&size=32`;
    return `https://ui-avatars.com/api/?name=${nome}&background=random&color=fff&size=32`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {colunas.map((coluna) => {
        
        // nomeStatus da API
        const tarefasColuna = tasks.filter(tarefa => tarefa.nomeStatus === coluna.nome);

        return (
          <div key={coluna.nome} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Header da Coluna */}
            <div className={`${coluna.cor} dark:bg-gray-700 p-4 rounded-t-xl`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{coluna.nome}</h3>
                <span className={`${coluna.contadorCor} text-white text-xs px-2 py-1 rounded-full font-medium`}>
                  {tarefasColuna.length}
                </span>
              </div>
            </div>

            {/* Cards das Tarefas */}
            <div className="p-4 space-y-4 min-h-[600px]">
              {tarefasColuna.map((tarefa) => (
                <div 
                  key={tarefa.idTarefa} 
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition cursor-pointer"
                >
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2">{tarefa.titulo}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{tarefa.descricao}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={getAvatar(tarefa.nomeResponsavel)} alt={tarefa.nomeResponsavel} className="w-6 h-6 rounded-full" />
                      <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                        {tarefa.nomeResponsavel || "Sem responsável"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {tarefa.comentarios.length > 0 && (
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <MessageCircle className="w-3 h-3" />
                          <span>{tarefa.comentarios.length}</span>
                        </div>
                      )}
                      {/* Supondo que você tenha campo anexos, ou ajustar conforme API */}
                      {tarefa.anexos > 0 && (
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Paperclip className="w-3 h-3" />
                          <span>{tarefa.anexos}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition">
                <Plus className="w-4 h-4 mx-auto mb-1" />
                <span className="text-sm">Novo Card</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

