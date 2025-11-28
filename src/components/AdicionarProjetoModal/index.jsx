import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Briefcase, Palette, Globe, Users, Monitor, Zap, BookOpen, Coffee } from 'lucide-react';
import { useSectors } from '../../hooks/useSectors';
import { showMessage } from '../../adapters/showMessage';

export function AdicionarProjetoModal({ isOpen, onClose }) {
  const [nomeProjeto, setNomeProjeto] = useState('');
  const [iconeEscolhido, setIconeEscolhido] = useState('Briefcase');
  const [corEscolhida, setCorEscolhida] = useState('#3b82f6');
  const [isLoading, setIsLoading] = useState(false);
  const [imagemCustomizada, setImagemCustomizada] = useState(null);

  const { createSector } = useSectors();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => (document.body.style.overflow = 'unset');
  }, [isOpen]);

  const icones = [
    { name: 'Briefcase', component: Briefcase },
    { name: 'Palette', component: Palette },
    { name: 'Globe', component: Globe },
    { name: 'Users', component: Users },
    { name: 'Monitor', component: Monitor },
    { name: 'Zap', component: Zap },
    { name: 'BookOpen', component: BookOpen },
    { name: 'Coffee', component: Coffee },
  ];

  const cores = [
    '#3b82f6', '#10b981', '#ef4444', '#f59e0b',
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316'
  ];

  const handleImagemUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagemCustomizada(event.target.result);
        setIconeEscolhido('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSalvar = async () => {
    if (!nomeProjeto.trim()) return;

    setIsLoading(true);
    try {
      await createSector({ nome: nomeProjeto });

      setNomeProjeto('');
      setIconeEscolhido('Briefcase');
      setCorEscolhida('#3b82f6');
      setImagemCustomizada(null);

      showMessage.success("Empresa criada com sucesso!", true);
      onClose();
    } catch (error) {
      showMessage.error("Ocorreu um erro ao criar a empresa.");
      console.error('Erro ao criar empresa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIconeComponent = (iconeName) => {
    const icone = icones.find(i => i.name === iconeName);
    return icone ? icone.component : Briefcase;
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex justify-center p-4 overflow-auto">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 dark:border-gray-700/20 w-full max-w-[1200px] max-h-[90vh] overflow-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100/80 dark:bg-blue-500/20 rounded-lg backdrop-blur-sm">
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Adicionar Nova Empresa
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
            Cadastre uma nova empresa para centralizar seus projetos, equipes e tarefas em um único espaço.
          </p>

          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Nome da Empresa
            </label>
            <input
              type="text"
              value={nomeProjeto}
              onChange={(e) => setNomeProjeto(e.target.value)}
              placeholder="Ex: Empresa X, Agência Y..."
              className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 dark:text-white border rounded-lg"
            />
          </div>

          {/* Ícones */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Ícone da Empresa
            </label>

            <div className="grid grid-cols-6 gap-2">
              {icones.map((icone) => {
                const IconeComponent = icone.component;
                return (
                  <button
                    key={icone.name}
                    onClick={() => {
                      setIconeEscolhido(icone.name);
                      setImagemCustomizada(null);
                    }}
                    className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                      iconeEscolhido === icone.name
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/20'
                        : 'border-gray-300 dark:border-gray-700 dark:text-white'
                    }`}
                  >
                    <IconeComponent className="w-5 h-5 mx-auto" />
                  </button>
                );
              })}

              {/* Upload personalizado */}
              <label
                className={`p-3 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer ${
                  iconeEscolhido === 'custom'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/20'
                    : 'border-gray-300 dark:border-gray-700 dark:text-white'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagemUpload}
                  className="hidden"
                />

                {imagemCustomizada ? (
                  <img
                    src={imagemCustomizada}
                    className="w-5 h-5 mx-auto rounded object-cover"
                    alt="Custom"
                  />
                ) : (
                  <span className="text-xl mx-auto flex justify-center">+</span>
                )}
              </label>
            </div>
          </div>

          {/* Cores */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Cor do ícone
            </label>

            <div className="flex flex-wrap gap-3">
              {cores.map((cor) => (
                <button
                  key={cor}
                  onClick={() => setCorEscolhida(cor)}
                  className={`w-10 h-10 rounded-full hover:scale-110 transition ${
                    corEscolhida === cor ? 'ring-2 ring-offset-2' : ''
                  }`}
                  style={{ backgroundColor: cor }}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm mb-2 dark:text-white">Prévia:</p>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg">
              <div
                className="p-2 rounded-lg"
                style={{
                  color: corEscolhida,
                }}
              >
                {iconeEscolhido === 'custom' && imagemCustomizada ? (
                  <img src={imagemCustomizada} className="w-5 h-5 rounded object-cover" />
                ) : (
                  (() => {
                    const IconeComponent = getIconeComponent(iconeEscolhido);
                    return <IconeComponent className="w-5 h-5" />;
                  })()
                )}
              </div>

              <span className='dark:text-white'>{nomeProjeto || 'Nome da Empresa'}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-300 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
          >
            Cancelar
          </button>

          <button
            onClick={handleSalvar}
            disabled={isLoading || !nomeProjeto.trim()}
            className={`px-6 py-2 rounded-lg text-white ${
              nomeProjeto.trim()
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Criando...' : 'Criar Empresa'}
          </button>
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
