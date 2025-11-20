// import { useState, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import { X, Megaphone, Palette, Headphones, Monitor, Users, Building, Briefcase, Heart, Globe, Zap, Camera, Music, ShoppingCart, Calculator, BookOpen, Coffee, Gamepad2 } from 'lucide-react';
// import { useSectors } from '../../hooks/useSectors';
// import { showMessage } from '../../adapters/showMessage';

// export function AdicionarSetorModal({ isOpen, onClose }) {
//   const [nomeSetor, setNomeSetor] = useState('');
//   const [iconeEscolhido, setIconeEscolhido] = useState('Megaphone');
//   const [corEscolhida, setCorEscolhida] = useState('#3b82f6');

//   const [isLoading, setIsLoading] = useState(false);

//   const { createSector } = useSectors();

//   // Fechar modal com ESC
//   useEffect(() => {
//     const handleEsc = (event) => {
//       if (event.keyCode === 27) onClose();
//     };
//     if (isOpen) {
//       document.addEventListener('keydown', handleEsc);
//     }
//     return () => {
//       document.removeEventListener('keydown', handleEsc);
//     };
//   }, [isOpen, onClose]);

//   // Bloquear scroll do body quando modal aberto
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => (document.body.style.overflow = 'unset');
//   }, [isOpen]);

//   const icones = [
//     { name: 'Megaphone', component: Megaphone },
//     { name: 'Palette', component: Palette },
//     { name: 'Headphones', component: Headphones },
//     { name: 'Monitor', component: Monitor },
//     { name: 'Users', component: Users },
//     { name: 'Building', component: Building },
//     { name: 'Briefcase', component: Briefcase },
//     { name: 'Heart', component: Heart },
//     { name: 'Globe', component: Globe },
//     { name: 'Zap', component: Zap },
//     { name: 'Camera', component: Camera },
//     { name: 'Music', component: Music },
//     { name: 'ShoppingCart', component: ShoppingCart },
//     { name: 'Calculator', component: Calculator },
//     { name: 'BookOpen', component: BookOpen },
//     { name: 'Coffee', component: Coffee },
//     { name: 'Gamepad2', component: Gamepad2 }
//   ];

//   const cores = [
//     '#3b82f6', // Azul
//     '#10b981', // Verde
//     '#ef4444', // Vermelho
//     '#f59e0b', // Amarelo
//     '#8b5cf6', // Roxo
//     '#ec4899', // Rosa
//     '#06b6d4', // Ciano
//     '#84cc16', // Lima
//     '#f97316', // Laranja
//   ];

//   const handleSalvar = async () => {
//     if (nomeSetor.trim()) {
      
//       setIsLoading(true);

//     try {
//       await createSector({
//         nome: nomeSetor,
//       });

//     // Resetar form
//     setNomeSetor('');
//     setIconeEscolhido('Megaphone');
//     setCorEscolhida('#3b82f6');

//     showMessage.success("Setor criado com sucesso!");

//     onClose();
//   } catch (error) {
//     showMessage.error("Ocorreu um erro ao criar o setor.")
//     console.error('Erro ao criar setor:', error);
//   } finally {
//     setIsLoading(false);
//   }
//     }
//   };

//   const getIconeComponent = (iconeName) => {
//     const icone = icones.find(i => i.name === iconeName);
//     return icone ? icone.component : Megaphone;
//   };

//   if (!isOpen) return null;

//   const modalContent = (
//     <div className="fixed inset-0 z-50 flex justify-center p-4 overflow-auto">
//       {/* Backdrop com efeito glass/vidro borrado */}
//       <div 
//         className="absolute inset-0 bg-white/30 backdrop-blur-md"
//         onClick={onClose}
//       />

//       {/* Modal Container */}
//       <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 dark:border-gray-700/20 w-full max-w-lg max-h-[90vh] overflow-auto">
        
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-100/80 dark:bg-blue-500/20 rounded-lg backdrop-blur-sm">
//               <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//               Adicionar Novo Setor
//             </h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors backdrop-blur-sm"
//           >
//             <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
//           </button>
//         </div>

//         {/* Conteúdo */}
//         <div className="p-6 space-y-6">
//           <p className="text-gray-600 dark:text-gray-400">
//             Crie um novo setor para organizar suas tarefas e equipes. O setor aparecerá no menu lateral após ser criado.
//           </p>

//           {/* Nome do Setor */}
//           <div>
//             <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
//               Nome do Setor
//             </label>
//             <input
//               type="text"
//               value={nomeSetor}
//               onChange={(e) => setNomeSetor(e.target.value)}
//               placeholder="Ex: Financeiro, Recursos Humanos, Vendas..."
//               className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
//             />
//           </div>

//           {/* Ícone do Setor */}
//           <div>
//             <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
//               Ícone do Setor
//             </label>
//             <div className="grid grid-cols-6 gap-2">
//               {icones.map((icone) => {
//                 const IconeComponent = icone.component;
//                 return (
//                   <button
//                     key={icone.name}
//                     onClick={() => setIconeEscolhido(icone.name)}
//                     className={`p-3 rounded-lg border-2 backdrop-blur-sm transition-all hover:scale-105 ${
//                       iconeEscolhido === icone.name
//                         ? 'border-blue-500/70 bg-blue-50/70 dark:bg-blue-500/20'
//                         : 'border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300/70 dark:hover:border-gray-600/70 bg-white/30 dark:bg-gray-800/30'
//                     }`}
//                   >
//                     <IconeComponent 
//                       className={`w-5 h-5 mx-auto ${
//                         iconeEscolhido === icone.name 
//                           ? 'text-blue-600 dark:text-blue-400' 
//                           : 'text-gray-600 dark:text-gray-400'
//                       }`} 
//                     />
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Cor do Setor */}
//           <div>
//             <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
//               Cor do Setor (opcional)
//             </label>
//             <div className="flex flex-wrap gap-3">
//               {cores.map((cor) => (
//                 <button
//                   key={cor}
//                   onClick={() => setCorEscolhida(cor)}
//                   className={`w-10 h-10 rounded-full transition-all hover:scale-110 backdrop-blur-sm ${
//                     corEscolhida === cor 
//                       ? 'ring-2 ring-offset-2 ring-white/50 dark:ring-gray-300/50 shadow-lg' 
//                       : 'shadow-md hover:shadow-lg'
//                   }`}
//                   style={{ backgroundColor: cor }}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Preview */}
//           <div className="bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200/30 dark:border-gray-700/30">
//             <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
//               Prévia:
//             </p>
//             <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-lg border border-gray-200/40 dark:border-gray-700/40">
//               <div 
//                 className="p-2 rounded-lg backdrop-blur-sm"
//                 style={{ 
//                   backgroundColor: `${corEscolhida}30`,
//                   color: corEscolhida 
//                 }}
//               >
//                 {(() => {
//                   const IconeComponent = getIconeComponent(iconeEscolhido);
//                   return <IconeComponent className="w-5 h-5" />;
//                 })()}
//               </div>
//               <span className="text-gray-900 dark:text-gray-100 font-medium">
//                 {nomeSetor || 'Nome do Setor'}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end gap-3 p-6 border-t border-gray-200/50 dark:border-gray-700/50">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition backdrop-blur-sm"
//           >
//             Cancelar
//           </button>
//           <button
//             onClick={handleSalvar}
//             disabled={!nomeSetor.trim() || isLoading}
//             className={`px-6 py-2 rounded-lg font-medium transition backdrop-blur-sm ${
//               nomeSetor.trim()
//                 ? 'bg-blue-600/90 hover:bg-blue-700/90 text-white shadow-lg'
//                 : 'bg-gray-300/60 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             {isLoading && (
//               <span className="w-5 h-5 border-t-transparent rounded-full animate-spin" />
//             )}
//             {isLoading ? 'Criando...' : 'Criar Setor'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return createPortal(modalContent, document.body);
// }

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Briefcase, Palette, Globe, Users, Monitor, Zap, BookOpen, Coffee } from 'lucide-react';
import { useSectors } from '../../hooks/useSectors';
import { showMessage } from '../../adapters/showMessage';
import { DropdownUsers } from '../../components/DropdownUsers';

export function AdicionarProjetoModal({ isOpen, onClose }) {
  const [nomeProjeto, setNomeProjeto] = useState('');
  const [iconeEscolhido, setIconeEscolhido] = useState('Briefcase');
  const [corEscolhida, setCorEscolhida] = useState('#3b82f6');
  const [isLoading, setIsLoading] = useState(false);
  const [imagemCustomizada, setImagemCustomizada] = useState(null);

  const { createSector } = useSectors();

  // Fechar modal com ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Bloquear scroll do body quando modal aberto
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
    '#3b82f6', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316'
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

      // Resetar form
      setNomeProjeto('');
      setIconeEscolhido('Briefcase');
      setCorEscolhida('#3b82f6');
      setImagemCustomizada(null);

      showMessage.success("Projeto criado com sucesso!");
      onClose();
    } catch (error) {
      showMessage.error("Ocorreu um erro ao criar o projeto.");
      console.error('Erro ao criar projeto:', error);
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-md" onClick={onClose} />

      {/* Modal Container */}
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
            Cadastre uma nova empresa para centralizar seus projetos, equipes e tarefas em um único espaço de gestão.
          </p>

          {/* Nome do Projeto */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Nome da Empresa
            </label>
            <input
              type="text"
              value={nomeProjeto}
              onChange={(e) => setNomeProjeto(e.target.value)}
              placeholder="Ex: Lançamento Produto, Marketing, Desenvolvimento..."
              className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
            />
          </div>

          {/* Ícone do Projeto */}
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
              
              {/* Botão para Upload de Imagem */}
              <label
                className={`p-3 rounded-lg border-2 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer ${
                  iconeEscolhido === 'custom'
                    ? 'border-blue-500/70 bg-blue-50/70 dark:bg-blue-500/20'
                    : 'border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300/70 dark:hover:border-gray-600/70 bg-white/30 dark:bg-gray-800/30'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagemUpload}
                  className="hidden"
                />
                {imagemCustomizada && iconeEscolhido === 'custom' ? (
                  <img src={imagemCustomizada} alt="Custom" className="w-5 h-5 mx-auto object-cover rounded" />
                ) : (
                  <div className="w-5 h-5 mx-auto flex items-center justify-center">
                    <span className={`text-xl font-light ${
                      iconeEscolhido === 'custom'
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>+</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Cor do Projeto */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Cor do ícone da empresa (opcional)
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
                {iconeEscolhido === 'custom' && imagemCustomizada ? (
                  <img src={imagemCustomizada} alt="Custom icon" className="w-5 h-5 object-cover rounded" />
                ) : (
                  (() => {
                    const IconeComponent = getIconeComponent(iconeEscolhido);
                    return <IconeComponent className="w-5 h-5" />;
                  })()
                )}
              </div>
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {nomeProjeto || 'Nome do Projeto'}
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
            disabled={!nomeProjeto.trim() || isLoading}
            className={`px-6 py-2 rounded-lg font-medium transition backdrop-blur-sm ${
              nomeProjeto.trim()
                ? 'bg-blue-600/90 hover:bg-blue-700/90 text-white shadow-lg'
                : 'bg-gray-300/60 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading && (
              <span className="w-5 h-5 border-t-transparent rounded-full animate-spin" />
            )}
            {isLoading ? 'Criando...' : 'Criar Empresa'}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}