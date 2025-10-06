import { useState } from 'react';
import { AdminSidebar } from '../../../components/AdminSidebar';
import { Plus, Filter, MessageCircle, Paperclip } from 'lucide-react';
import { ListSectors } from '../../../components/ListSectors';
import { FilterSectors } from '../../../components/FilterSectors';
import { BreadcrumbFramer } from '../../../components/BreadcrumbFramer';

export default function AdminKanban() {
  const [tarefas] = useState([
    {
      id: 1,
      titulo: 'Criar campanha para lançamento',
      descricao: 'Desenvolver estratégia para novo produto',
      responsavel: 'Lucas Mendes',
      coluna: 'A Fazer',
      comentarios: 3,
      anexos: 2
    },
    {
      id: 2,
      titulo: 'Análise de métricas de redes sociais',
      descricao: 'Avaliar desempenho das últimas campanhas',
      responsavel: 'Carla Sousa',
      coluna: 'A Fazer',
      comentarios: 0,
      anexos: 1
    },
    {
      id: 3,
      titulo: 'Planejamento de conteúdo',
      descricao: 'Definir calendário editorial do próximo mês',
      responsavel: 'Rafael Costa',
      coluna: 'A Fazer',
      comentarios: 2,
      anexos: 0
    },
    {
      id: 4,
      titulo: 'Briefing para agência',
      descricao: 'Preparar documento com diretrizes',
      responsavel: 'Marina Oliveira',
      coluna: 'A Fazer',
      comentarios: 1,
      anexos: 3
    },
    {
      id: 5,
      titulo: 'Produção de vídeo institucional',
      descricao: 'Acompanhar gravações e edição',
      responsavel: 'Pedro Almeida',
      coluna: 'Em Andamento',
      comentarios: 7,
      anexos: 1
    },
    {
      id: 6,
      titulo: 'Apresentação para cliente',
      descricao: 'Revisar slides e conteúdo',
      responsavel: 'Fernanda Lima',
      coluna: 'Revisão',
      comentarios: 2,
      anexos: 0
    },
    {
      id: 7,
      titulo: 'Otimização de SEO',
      descricao: 'Implementar melhorias no site',
      responsavel: 'Juliana Santos',
      coluna: 'Revisão',
      comentarios: 1,
      anexos: 2
    },
    {
      id: 8,
      titulo: 'Material gráfico para evento',
      descricao: 'Aprovar artes finais',
      responsavel: 'Gustavo Martins',
      coluna: 'Revisão',
      comentarios: 4,
      anexos: 3
    },
    {
      id: 9,
      titulo: 'Relatório de performance',
      descricao: 'Compilar dados do último trimestre',
      responsavel: 'André Ferreira',
      coluna: 'Revisão',
      comentarios: 5,
      anexos: 2
    },
    {
      id: 10,
      titulo: 'Pesquisa de mercado',
      descricao: 'Análise de concorrentes',
      responsavel: 'Rodrigo Silva',
      coluna: 'Concluído',
      comentarios: 0,
      anexos: 1
    },
    {
      id: 11,
      titulo: 'Criação de landing page',
      descricao: 'Desenvolvimento e publicação',
      responsavel: 'Beatriz Campos',
      coluna: 'Concluído',
      comentarios: 3,
      anexos: 0
    },
    {
      id: 12,
      titulo: 'Estratégia de email marketing',
      descricao: 'Validar fluxo e conteúdo',
      responsavel: 'Camila Rocha',
      coluna: 'Concluído',
      comentarios: 1,
      anexos: 2
    },
    {
      id: 13,
      titulo: 'Treinamento da equipe',
      descricao: 'Capacitação em novas ferramentas',
      responsavel: 'Marcelo Dias',
      coluna: 'Concluído',
      comentarios: 2,
      anexos: 1
    },
    {
      id: 14,
      titulo: 'Atualização de portfólio',
      descricao: 'Inclusão de novos cases',
      responsavel: 'Luciana Vieira',
      coluna: 'Concluído',
      comentarios: 0,
      anexos: 3
    }
  ]);

  const colunas = [
    { nome: 'A Fazer', cor: 'bg-gray-100', contadorCor: 'bg-gray-500' },
    { nome: 'Em Andamento', cor: 'bg-blue-100', contadorCor: 'bg-blue-500' },
    { nome: 'Revisão', cor: 'bg-yellow-100', contadorCor: 'bg-yellow-500' },
    { nome: 'Concluído', cor: 'bg-green-100', contadorCor: 'bg-green-500' }
  ];

  const getAvatar = (nome) => {
    return `https://ui-avatars.com/api/?name=${nome}&background=random&color=fff&size=32`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <AdminSidebar />
      
      {/* CONTEÚDO PRINCIPAL COM FUNDO FORÇADO */}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative z-0">
        <div className="p-6 bg-gray-50 dark:bg-gray-900">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Quadro Kanban
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gerencie as tarefas do seu time de forma visual
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FilterSectors />
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition">
                Ordenar
              </button>
            </div>
          </div>

          {/* Setores */}
          <ListSectors />

          {/* Nome dos quadros */}
          <BreadcrumbFramer />

          {/* Kanban Board */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {colunas.map((coluna) => {
              const tarefasColuna = tarefas.filter(tarefa => tarefa.coluna === coluna.nome);
              
              return (
                <div key={coluna.nome} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  {/* Header da Coluna */}
                  <div className={`${coluna.cor} dark:bg-gray-700 p-4 rounded-t-xl`}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {coluna.nome}
                      </h3>
                      <span className={`${coluna.contadorCor} text-white text-xs px-2 py-1 rounded-full font-medium`}>
                        {tarefasColuna.length}
                      </span>
                    </div>
                  </div>

                  {/* Cards das Tarefas */}
                  <div className="p-4 space-y-4 min-h-[600px]">
                    {tarefasColuna.map((tarefa) => (
                      <div 
                        key={tarefa.id} 
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition cursor-pointer"
                      >
                        {/* Título */}
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2">
                          {tarefa.titulo}
                        </h4>

                        {/* Descrição */}
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                          {tarefa.descricao}
                        </p>

                        {/* Responsável */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={getAvatar(tarefa.responsavel)}
                              alt={tarefa.responsavel}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                              {tarefa.responsavel}
                            </span>
                          </div>

                          {/* Estatísticas */}
                          <div className="flex items-center gap-2">
                            {tarefa.comentarios > 0 && (
                              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                <MessageCircle className="w-3 h-3" />
                                <span>{tarefa.comentarios}</span>
                              </div>
                            )}
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

                    {/* Botão Novo Card */}
                    <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition">
                      <Plus className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-sm">Novo Card</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
