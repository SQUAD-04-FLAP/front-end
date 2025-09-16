import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Megaphone, Palette, Headphones, Monitor, Users, Building, Briefcase, Heart, Globe, Zap, Camera, Music, ShoppingCart, Calculator, BookOpen, Coffee, Gamepad2 } from 'lucide-react';

export function AdicionarSetorModal({ isOpen, onClose }) {
  const [nomeSetor, setNomeSetor] = useState('');
  const [iconeEscolhido, setIconeEscolhido] = useState('Megaphone');
  const [corEscolhida, setCorEscolhida] = useState('#3b82f6');

  // Fechar modal com ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Bloquear scroll do body quando modal aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => (document.body.style.overflow = 'unset');
  }, [isOpen]);

  const icones = [
    { name: 'Megaphone', component: Megaphone },
    { name: 'Palette', component: Palette },
    { name: 'Headphones', component: Headphones },
    { name: 'Monitor', component: Monitor },
    { name: 'Users', component: Users },
    { name: 'Building', component: Building },
    { name: 'Briefcase', component: Briefcase },
    { name: 'Heart', component: Heart },
    { name: 'Globe', component: Globe },
    { name: 'Zap', component: Zap },
    { name: 'Camera', component: Camera },
    { name: 'Music', component: Music },
    { name: 'ShoppingCart', component: ShoppingCart },
    { name: 'Calculator', component: Calculator },
    { name: 'BookOpen', component: BookOpen },
    { name: 'Coffee', component: Coffee },
    { name: 'Gamepad2', component: Gamepad2 }
  ];

  const cores = [
    '#3b82f6', // Azul
    '#10b981', // Verde
    '#ef4444', // Vermelho
    '#f59e0b', // Amarelo
    '#8b5cf6', // Roxo
    '#ec4899', // Rosa
    '#06b6d4', // Ciano
    '#84cc16', // Lima
    '#f97316', // Laranja
  ];

  const handleSalvar = () => {
    if (nomeSetor.trim()) {
      console.log('Novo setor:', {
        nome: nomeSetor,
        icone: iconeEscolhido,
        cor: corEscolhida
      });
      
      // Resetar form
      setNomeSetor('');
      setIconeEscolhido('Megaphone');
      setCorEscolhida('#3b82f6');
      
      onClose();
    }
  };

  const getIconeComponent = (iconeName) => {
    const icone = icones.find(i => i.name === iconeName);
    return icone ? icone.component : Megaphone;
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z- flex items-center justify-center p-4">
      {/* Backdrop com efeito glass/vidro borrado */}
      <div 
        className="absolute inset-0 bg-white/30 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 dark:border-gray-700/20 w-full max-w-md">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100/80 dark:bg-blue-500/20 rounded-lg backdrop-blur-sm">
              <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Adicionar Novo Setor
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors backdrop-blur-sm"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-6">
          <p className="text-gray-600 dark:text-gray-400">
            Crie um novo setor para organizar suas tarefas e equipes. O setor aparecerá no menu lateral após ser criado.
          </p>

          {/* Nome do Setor */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Nome do Setor
            </label>
            <input
              type="text"
              value={nomeSetor}
              onChange={(e) => setNomeSetor(e.target.value)}
              placeholder="Ex: Financeiro, Recursos Humanos, Vendas..."
              className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
            />
          </div>

          {/* Ícone do Setor */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Ícone do Setor
            </label>
            <div className="grid grid-cols-6 gap-2">
              {icones.map((icone) => {
                const IconeComponent = icone.component;
                return (
                  <button
                    key={icone.name}
                    onClick={() => setIconeEscolhido(icone.name)}
                    className={`p-3 rounded-lg border-2 backdrop-blur-sm transition-all hover:scale-105 ${
                      iconeEscolhido === icone.name
                        ? 'border-blue-500/70 bg-blue-50/70 dark:bg-blue-500/20'
                        : 'border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300/70 dark:hover:border-gray-600/70 bg-white/30 dark:bg-gray-800/30'
                    }`}
                  >
                    <IconeComponent 
                      className={`w-5 h-5 mx-auto ${
                        iconeEscolhido === icone.name 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-600 dark:text-gray-400'
                      }`} 
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cor do Setor */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Cor do Setor (opcional)
            </label>
            <div className="flex flex-wrap gap-3">
              {cores.map((cor) => (
                <button
                  key={cor}
                  onClick={() => setCorEscolhida(cor)}
                  className={`w-10 h-10 rounded-full transition-all hover:scale-110 backdrop-blur-sm ${
                    corEscolhida === cor 
                      ? 'ring-2 ring-offset-2 ring-white/50 dark:ring-gray-300/50 shadow-lg' 
                      : 'shadow-md hover:shadow-lg'
                  }`}
                  style={{ backgroundColor: cor }}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200/30 dark:border-gray-700/30">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Prévia:
            </p>
            <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-lg border border-gray-200/40 dark:border-gray-700/40">
              <div 
                className="p-2 rounded-lg backdrop-blur-sm"
                style={{ 
                  backgroundColor: `${corEscolhida}30`,
                  color: corEscolhida 
                }}
              >
                {(() => {
                  const IconeComponent = getIconeComponent(iconeEscolhido);
                  return <IconeComponent className="w-5 h-5" />;
                })()}
              </div>
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {nomeSetor || 'Nome do Setor'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200/50 dark:border-gray-700/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition backdrop-blur-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            disabled={!nomeSetor.trim()}
            className={`px-6 py-2 rounded-lg font-medium transition backdrop-blur-sm ${
              nomeSetor.trim()
                ? 'bg-blue-600/90 hover:bg-blue-700/90 text-white shadow-lg'
                : 'bg-gray-300/60 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            Criar Setor
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
