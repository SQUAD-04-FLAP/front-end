import React, { useState } from 'react';
import { 
  Filter, 
  ArrowUpDown, 
  Plus, 
  MoreHorizontal,
  Star,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  List
} from 'lucide-react';

export function TelaDashBoard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard de Marketing</h1>
            <p className="text-gray-600 text-sm">Visão geral das tarefas e projetos do setor</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded text-sm bg-white hover:bg-gray-50 flex items-center gap-2">
              <Filter size={14} />
              Filtrar
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded text-sm bg-white hover:bg-gray-50 flex items-center gap-2">
              <ArrowUpDown size={14} />
              Ordenar
            </button>
            <button className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center gap-2">
              <Plus size={14} />
              Novo Quadro
            </button>
          </div>
        </div>

        {/* Top Row Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Documento empresa z */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-48 flex flex-col">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900">Documento empresa z</h3>
              <MoreHorizontal size={16} className="text-gray-400" />
            </div>
            <div className="flex-grow"></div>
            <div className="text-sm">
              <p className="text-gray-500 mb-1">Última atualização: hoje às 10:45</p>
              <a href="#" className="text-blue-500 hover:underline">Ver detalhes</a>
            </div>
          </div>

          {/* Documento empresa x */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-48 flex flex-col">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900">Documento empresa x</h3>
              <MoreHorizontal size={16} className="text-gray-400" />
            </div>
            <div className="flex-grow"></div>
            <div className="text-sm">
              <p className="text-gray-500 mb-1">Última atualização: hoje às 10:45</p>
              <a href="#" className="text-blue-500 hover:underline">Ver detalhes</a>
            </div>
          </div>

          {/* Próximos Prazos */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-gray-900">Próximos Prazos</h3>
              <MoreHorizontal size={16} className="text-gray-400" />
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Campanha de Redes Sociais</p>
                </div>
                <span className="text-xs text-red-600 font-medium">Hoje</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Relatório de Métricas</p>
                </div>
                <span className="text-xs text-yellow-600 font-medium">Amanhã</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Planejamento de Conteúdo</p>
                </div>
                <span className="text-xs text-blue-600 font-medium">Em 3 dias</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Análise de Concorrentes</p>
                </div>
                <span className="text-xs text-blue-600 font-medium">Em 5 dias</span>
              </div>
            </div>
            <a href="#" className="text-blue-500 hover:underline text-sm">Ver todos os prazos</a>
          </div>
        </div>

        {/* Quadros de Tarefas Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Quadros de Tarefas</h2>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Visualizar:</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm">Button</button>
                <button className="px-3 py-1 text-gray-600 rounded text-sm hover:bg-gray-100">Button</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Campanha de Lançamento */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">Campanha de Lançamento</h3>
                  <Star size={16} className="text-yellow-500 fill-current" />
                </div>
              </div>
              <div className="mb-3">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Ativo</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Planejamento e execução da campanha de lançamento do novo produto</p>
              
              {/* Linha divisória */}
              <div className="border-b border-gray-200 mb-4"></div>
              
              {/* Layout atualizado com fotos à esquerda e barra à direita */}
              <div className="flex justify-between items-center mb-4">
                {/* Lado esquerdo: Fotos de perfil */}
                <div className="flex items-center -space-x-2">
                  <div className="w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white z-30">J</div>
                  <div className="w-7 h-7 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white z-20">M</div>
                  <div className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white z-10">A</div>
                </div>
                
                {/* Lado direito: Barra de progresso */}
                <div className="w-32 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>

              {/* Informações das tarefas */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <List size={14} />
                  <span>12 tarefas</span>
                </div>
                <div className="flex items-center gap-1 text-orange-600">
                  <AlertTriangle size={14} />
                  <span>5 dias restantes</span>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">Redes Sociais</h3>
              </div>
              <div className="mb-3">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">Em progresso</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Gerenciamento de conteúdo e engajamento nas redes sociais</p>
              
              {/* Linha divisória */}
              <div className="border-b border-gray-200 mb-4"></div>
              
              {/* Layout atualizado com fotos à esquerda e barra à direita */}
              <div className="flex justify-between items-center mb-4">
                {/* Lado esquerdo: Fotos de perfil */}
                <div className="flex items-center -space-x-2">
                  <div className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white z-20">M</div>
                  <div className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white z-10">P</div>
                </div>
                
                {/* Lado direito: Barra de progresso */}
                <div className="w-32 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>

              {/* Informações das tarefas */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <List size={14} />
                  <span>8 tarefas</span>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle size={14} />
                  <span>Contínuo</span>
                </div>
              </div>
            </div>

            {/* SEO e Analytics */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">SEO e Analytics</h3>
              </div>
              <div className="mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">Planejamento</span>
              </div>
              <p className="text-sm text-gray-600 mb-6">Otimização de SEO e análise de métricas do site</p>
              
              {/* Linha divisória */}
              <div className="border-b border-gray-200 mb-4"></div>
              
              {/* Layout atualizado com fotos à esquerda e barra à direita */}
              <div className="flex justify-between items-center mb-4">
                {/* Lado esquerdo: Fotos de perfil */}
                <div className="flex items-center -space-x-2">
                  <div className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white z-20">A</div>
                  <div className="w-7 h-7 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white z-10">J</div>
                </div>
                
                {/* Lado direito: Barra de progresso */}
                <div className="w-32">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>

              {/* Informações das tarefas */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <List size={14} />
                  <span>6 tarefas</span>
                </div>
                <div className="flex items-center gap-1 text-blue-600">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span>15 dias restantes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Atividade Recente */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-gray-900">Atividade Recente</h3>
              <a href="#" className="text-blue-500 hover:underline text-sm">Ver todas</a>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-medium">JL</div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">Juliana Lima</span> adicionou 3 novas tarefas ao quadro
                  </p>
                  <p className="text-sm text-blue-500">Redes Sociais</p>
                  <p className="text-xs text-gray-500">Hoje, 11:32</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-medium">CM</div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">Carlos Mendes</span> comentou na tarefa
                  </p>
                  <p className="text-sm text-blue-500">Análise de Concorrentes</p>
                  <p className="text-xs text-gray-500">Hoje, 10:45</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-medium">MC</div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">Mariana Costa</span> concluiu a tarefa
                  </p>
                  <p className="text-sm text-blue-500">Briefing da Campanha</p>
                  <p className="text-xs text-gray-500">Ontem, 16:20</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">PA</div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">Pedro Almeida</span> anexou arquivos à tarefa
                  </p>
                  <p className="text-sm text-blue-500">Materiais Gráficos</p>
                  <p className="text-xs text-gray-500">Ontem, 14:15</p>
                </div>
              </div>
            </div>
          </div>

          {/* Membros da Equipe */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-gray-900">Membros da Equipe</h3>
              <a href="#" className="text-blue-500 hover:underline text-sm">Ver todos</a>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">MC</div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Mariana Costa</p>
                    <p className="text-sm text-gray-600">Gerente de Marketing</p>
                  </div>
                </div>
                <span className="text-sm text-green-600">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-medium">AS</div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Ana Souza</p>
                    <p className="text-sm text-gray-600">Marketing Digital</p>
                  </div>
                </div>
                <span className="text-sm text-green-600">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-medium">JL</div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Juliana Lima</p>
                    <p className="text-sm text-gray-600">Social Media</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Ausente</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">PA</div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Pedro Almeida</p>
                    <p className="text-sm text-gray-600">Designer</p>
                  </div>
                </div>
                <span className="text-sm text-red-600">Ocupado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}