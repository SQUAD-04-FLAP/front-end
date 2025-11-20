// import { useState } from 'react';
// import { Bell, Settings, Shield, Palette, Users, HelpCircle } from 'lucide-react';
// import { useAuth } from '../../hooks/useAuth';

// export default function Configuracoes() {
//   const { user } = useAuth();

//   // Estados para os controles
//   const [notificacoes, setNotificacoes] = useState({
//     email: true,
//     sistema: true,
//     resumoDiario: false,
//     alertasPrazos: true
//   });

//   const [permissoes, setPermissoes] = useState({
//     criacaoProjetos: 'Administradores',
//     edicaoTarefas: 'Criador e Administradores',
//     conviteUsuarios: 'Apenas Administradores',
//     visualizacaoRelatorios: 'Gerentes e Administradores'
//   });

//   const [parametros, setParametros] = useState({
//     idioma: 'Português (Brasil)',
//     fusoHorario: 'Brasília (GMT-3)',
//     formatoData: 'DD/MM/AAAA',
//     formatoHora: '24 horas'
//   });

//   const [seguranca, setSeguranca] = useState({
//     autenticacaoDuasEtapas: true,
//     tempoSessao: '30 minutos'
//   });

//   const [aparencia, setAparencia] = useState({
//     tema: 'Sistema',
//     corPrincipal: '#2563eb',
//     densidadeInterface: 0.5
//   });

//   const [politicaSenha, setPoliticaSenha] = useState({
//     minimo8caracteres: false,
//     incluirNumeros: false,
//     incluirCaracteresEspeciais: false,
//     expirarCada90dias: false
//   });

//   return (
//     <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">

//       <div>
//         {/* Header */}
//         <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//                 Configurações do Sistema
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400 mt-1">
//                 Gerencie as preferências e configurações do FLAP Task Management System
//               </p>
//             </div>
//             <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
//               Salvar Alterações
//             </button>
//           </div>
//         </div>

//         {/* Conteúdo Principal */}
//         <div className="p-6">
//           <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
//             {/* Coluna Principal */}
//             <div className="xl:col-span-2 space-y-6">
              
//               {/* Notificações */}
//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-2 bg-blue-100 dark:bg-blue-500/15 rounded-lg">
//                     <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                   </div>
//                   <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//                     Notificações
//                   </h2>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-medium text-gray-900 dark:text-gray-100">
//                         Notificações por Email
//                       </h3>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">
//                         Receba atualizações de tarefas por email
//                       </p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={notificacoes.email}
//                         onChange={(e) => setNotificacoes(prev => ({...prev, email: e.target.checked}))}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-medium text-gray-900 dark:text-gray-100">
//                         Notificações no Sistema
//                       </h3>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">
//                         Exibir notificações no painel
//                       </p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={notificacoes.sistema}
//                         onChange={(e) => setNotificacoes(prev => ({...prev, sistema: e.target.checked}))}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-medium text-gray-900 dark:text-gray-100">
//                         Resumo Diário
//                       </h3>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">
//                         Receba um resumo diário das atividades
//                       </p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={notificacoes.resumoDiario}
//                         onChange={(e) => setNotificacoes(prev => ({...prev, resumoDiario: e.target.checked}))}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-medium text-gray-900 dark:text-gray-100">
//                         Alertas de Prazos
//                       </h3>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">
//                         Notificações de tarefas próximas do prazo
//                       </p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={notificacoes.alertasPrazos}
//                         onChange={(e) => setNotificacoes(prev => ({...prev, alertasPrazos: e.target.checked}))}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               {user.permissao === "ADMIN" && (
//                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//                   {/* Cabeçalho da seção de permissões */}
//                   <div className="flex items-center gap-3 mb-6">
//                     <div className="p-2 bg-purple-100 dark:bg-purple-500/15 rounded-lg">
//                       <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
//                     </div>
//                     <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//                       Permissões de Usuário
//                     </h2>
//                   </div>

//                   <div className="space-y-4">
//                     {/* Criação de Projetos */}
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="font-medium text-gray-900 dark:text-gray-100">
//                           Criação de Projetos
//                         </h3>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">
//                           Quem pode criar novos projetos
//                         </p>
//                       </div>
//                       <select
//                         value={permissoes.criacaoProjetos}
//                         onChange={(e) =>
//                           setPermissoes((prev) => ({ ...prev, criacaoProjetos: e.target.value }))
//                         }
//                         className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100"
//                       >
//                         <option>Administradores</option>
//                         <option>Gerentes e Administradores</option>
//                         <option>Todos os Usuários</option>
//                       </select>
//                     </div>

//                     {/* Edição de Tarefas */}
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="font-medium text-gray-900 dark:text-gray-100">
//                           Edição de Tarefas
//                         </h3>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">
//                           Quem pode editar tarefas existentes
//                         </p>
//                       </div>
//                       <select
//                         value={permissoes.edicaoTarefas}
//                         onChange={(e) =>
//                           setPermissoes((prev) => ({ ...prev, edicaoTarefas: e.target.value }))
//                         }
//                         className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100"
//                       >
//                         <option>Criador e Administradores</option>
//                         <option>Gerentes e Administradores</option>
//                         <option>Todos os Usuários</option>
//                       </select>
//                     </div>

//                     {/* Convites de Usuários */}
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="font-medium text-gray-900 dark:text-gray-100">
//                           Convites de Usuários
//                         </h3>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">
//                           Quem pode convidar novos usuários
//                         </p>
//                       </div>
//                       <select
//                         value={permissoes.conviteUsuarios}
//                         onChange={(e) =>
//                           setPermissoes((prev) => ({ ...prev, conviteUsuarios: e.target.value }))
//                         }
//                         className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100"
//                       >
//                         <option>Apenas Administradores</option>
//                         <option>Gerentes e Administradores</option>
//                         <option>Todos os Usuários</option>
//                       </select>
//                     </div>

//                     {/* Visualização de Relatórios */}
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="font-medium text-gray-900 dark:text-gray-100">
//                           Visualização de Relatórios
//                         </h3>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">
//                           Quem pode acessar relatórios analíticos
//                         </p>
//                       </div>
//                       <select
//                         value={permissoes.visualizacaoRelatorios}
//                         onChange={(e) =>
//                           setPermissoes((prev) => ({ ...prev, visualizacaoRelatorios: e.target.value }))
//                         }
//                         className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100"
//                       >
//                         <option>Gerentes e Administradores</option>
//                         <option>Apenas Administradores</option>
//                         <option>Todos os Usuários</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               )}   

//               {/* Aparência */}
//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-2 bg-pink-100 dark:bg-pink-500/15 rounded-lg">
//                     <Palette className="w-5 h-5 text-pink-600 dark:text-pink-400" />
//                   </div>
//                   <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
//                     Aparência
//                   </h2>
//                 </div>

//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
//                       Tema do Sistema
//                     </h3>
//                     <div className="flex gap-4">
//                       {['Claro', 'Escuro', 'Sistema'].map((tema) => (
//                         <label key={tema} className="flex items-center">
//                           <input
//                             type="radio"
//                             name="tema"
//                             value={tema}
//                             checked={aparencia.tema === tema}
//                             onChange={(e) => setAparencia(prev => ({...prev, tema: e.target.value}))}
//                             className="mr-2"
//                           />
//                           <span className="text-gray-700 dark:text-gray-300">{tema}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
//                       Cor Principal
//                     </h3>
//                     <div className="flex gap-3">
//                       {['#2563eb', '#059669', '#dc2626', '#ea580c', '#7c3aed'].map((cor) => (
//                         <button
//                           key={cor}
//                           onClick={() => setAparencia(prev => ({...prev, corPrincipal: cor}))}
//                           className={`w-8 h-8 rounded-full ${aparencia.corPrincipal === cor ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
//                           style={{ backgroundColor: cor }}
//                         />
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
//                       Densidade da Interface
//                     </h3>
//                     <div className="flex items-center gap-4">
//                       <span className="text-sm text-gray-600 dark:text-gray-400">Compacta</span>
//                       <input
//                         type="range"
//                         min="0"
//                         max="1"
//                         step="0.1"
//                         value={aparencia.densidadeInterface}
//                         onChange={(e) => setAparencia(prev => ({...prev, densidadeInterface: parseFloat(e.target.value)}))}
//                         className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
//                       />
//                       <span className="text-sm text-gray-600 dark:text-gray-400">Confortável</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Sidebar Direita */}
//             <div className="space-y-6">
//               {/* Parâmetros do Sistema */}
//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-2 bg-green-100 dark:bg-green-500/15 rounded-lg">
//                     <Settings className="w-5 h-5 text-green-600 dark:text-green-400" />
//                   </div>
//                   <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                     Parâmetros do Sistema
//                   </h2>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Idioma
//                     </label>
//                     <select
//                       value={parametros.idioma}
//                       onChange={(e) => setParametros(prev => ({...prev, idioma: e.target.value}))}
//                       className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100"
//                     >
//                       <option>Português (Brasil)</option>
//                       <option>English (US)</option>
//                       <option>Español</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Fuso Horário
//                     </label>
//                     <select
//                       value={parametros.fusoHorario}
//                       onChange={(e) => setParametros(prev => ({...prev, fusoHorario: e.target.value}))}
//                       className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100"
//                     >
//                       <option>Brasília (GMT-3)</option>
//                       <option>São Paulo (GMT-3)</option>
//                       <option>Rio de Janeiro (GMT-3)</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Formato de Data
//                     </label>
//                     <div className="space-y-2">
//                       {['DD/MM/AAAA', 'MM/DD/AAAA'].map((formato) => (
//                         <label key={formato} className="flex items-center">
//                           <input
//                             type="radio"
//                             name="formatoData"
//                             value={formato}
//                             checked={parametros.formatoData === formato}
//                             onChange={(e) => setParametros(prev => ({...prev, formatoData: e.target.value}))}
//                             className="mr-2"
//                           />
//                           <span className="text-sm text-gray-700 dark:text-gray-300">{formato}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Formato de Hora
//                     </label>
//                     <div className="space-y-2">
//                       {['24 horas', '12 horas (AM/PM)'].map((formato) => (
//                         <label key={formato} className="flex items-center">
//                           <input
//                             type="radio"
//                             name="formatoHora"
//                             value={formato}
//                             checked={parametros.formatoHora === formato}
//                             onChange={(e) => setParametros(prev => ({...prev, formatoHora: e.target.value}))}
//                             className="mr-2"
//                           />
//                           <span className="text-sm text-gray-700 dark:text-gray-300">{formato}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Segurança */}
//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="p-2 bg-yellow-100 dark:bg-yellow-500/15 rounded-lg">
//                     <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
//                   </div>
//                   <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                     Segurança
//                   </h2>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-medium text-gray-900 dark:text-gray-100">
//                         Autenticação em Duas Etapas
//                       </h3>
//                       <p className="text-xs text-gray-600 dark:text-gray-400">
//                         Aumenta a segurança da conta
//                       </p>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={seguranca.autenticacaoDuasEtapas}
//                         onChange={(e) => setSeguranca(prev => ({...prev, autenticacaoDuasEtapas: e.target.checked}))}
//                         className="sr-only peer"
//                       />
//                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//                     </label>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                       Tempo de Sessão
//                     </label>
//                     <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
//                       Tempo até logout automático
//                     </p>
//                     <select
//                       value={seguranca.tempoSessao}
//                       onChange={(e) => setSeguranca(prev => ({...prev, tempoSessao: e.target.value}))}
//                       className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100"
//                     >
//                       <option>30 minutos</option>
//                       <option>1 hora</option>
//                       <option>2 horas</option>
//                       <option>4 horas</option>
//                     </select>
//                   </div>

//                   <div>
//                     <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
//                       Política de Senha
//                     </h3>
//                     <div className="space-y-2">
//                       {[
//                         { key: 'minimo8caracteres', label: 'Mínimo 8 caracteres' },
//                         { key: 'incluirNumeros', label: 'Incluir números' },
//                         { key: 'incluirCaracteresEspeciais', label: 'Incluir caracteres especiais' },
//                         { key: 'expirarCada90dias', label: 'Expirar a cada 90 dias' }
//                       ].map((item) => (
//                         <label key={item.key} className="flex items-center">
//                           <input
//                             type="checkbox"
//                             checked={politicaSenha[item.key]}
//                             onChange={(e) => setPoliticaSenha(prev => ({...prev, [item.key]: e.target.checked}))}
//                             className="mr-2"
//                           />
//                           <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Ajuda */}
//               <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
//                 <div className="flex items-center gap-3 mb-4">
//                   <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                   <h3 className="font-semibold text-blue-900 dark:text-blue-100">
//                     Precisa de ajuda?
//                   </h3>
//                 </div>
//                 <p className="text-blue-700 dark:text-blue-200 text-sm mb-4">
//                   Nossa equipe de suporte está disponível para ajudar com qualquer dúvida sobre as configurações do sistema.
//                 </p>
//                 <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
//                   Contatar Suporte
//                 </button>
//               </div>

//               {/* Notificação */}
//               <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
//                 <div className="flex items-start gap-3">
//                   <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
//                   <div>
//                     <h3 className="font-medium text-blue-900 dark:text-blue-100 text-sm">
//                       Notificação
//                     </h3>
//                     <p className="text-blue-700 dark:text-blue-200 text-xs">
//                       Você tem 5 tarefas pendentes para hoje
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// import { useAuth } from '../../hooks/useAuth';

// export default function Configuracoes() {
//   const { user } = useAuth();

//   return (
//     <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">

//       <div>
//         {/* Header */}
//         <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//                 Configurações do Sistema
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400 mt-1">
//                 Gerencie as preferências e configurações do FLAP Task Management System
//               </p>
//             </div>
//           </div>
//         </div>

//         <section class="py-10 dark:bg-gray-900">
//     <div class="w-[96%] md:w-[90%] lg:w-[70%] mx-auto">
//         <div class="shadow-2xl p-6 rounded-2xl bg-white dark:bg-gray-800/40 backdrop-blur-md">
//             <div class="mb-6">
//                 <h1 class="text-3xl font-bold dark:text-white">Perfil</h1>
//                 <p class="text-gray-600 dark:text-gray-400 text-sm">
//                     Gerencie as informações do seu perfil
//                 </p>
//             </div>

//             <form>
//                 <div class="relative w-full h-48 rounded-xl overflow-hidden group">
//                     <img 
//                         src="https://images.unsplash.com/photo-1449844908441-8829872d2607"
//                         class="w-full h-full object-cover"
//                     />

//                     <label
//                         for="upload_cover"
//                         class="absolute right-3 top-3 bg-white/90 px-3 py-1 rounded-md shadow cursor-pointer text-sm font-medium flex items-center gap-1 dark:bg-gray-700 dark:text-gray-200"
//                     >
//                         Alterar Capa
//                         <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" stroke-width="1.5"
//                              viewBox="0 0 24 24">
//                             <path stroke-linecap="round" stroke-linejoin="round"
//                                 d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23..."></path>
//                         </svg>
//                     </label>

//                     <input type="file" hidden id="upload_cover" />
//                 </div>

//                 <div class="flex justify-center -mt-16 mb-6">
//                     <div class="relative">
//                         <img 
//                             src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
//                             class="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
//                         />

//                         <label
//                             for="upload_profile"
//                             class="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer dark:bg-gray-700"
//                         >
//                             <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="1.5"
//                                  viewBox="0 0 24 24">
//                                 <path stroke-linecap="round" stroke-linejoin="round"
//                                     d="M6.827 6.175A2.31 2.31..."></path>
//                             </svg>
//                         </label>

//                         <input type="file" hidden id="upload_profile" />
//                     </div>
//                 </div>

//                 <div class="mb-6">
//                     <label class="dark:text-gray-200 font-medium">Nome</label>
//                     <input
//                         type="text"
//                         placeholder="Seu nome"
//                         class="mt-2 p-4 w-full border rounded-lg dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
//                     />
//                 </div>

//                 <button 
//                     type="submit"
//                     class="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg"
//                 >
//                     Salvar Alterações
//                 </button>

//             </form>
//         </div>
//     </div>
//         </section>

//         <section class="py-10 dark:bg-gray-900">
//     <div class="w-[96%] md:w-[90%] lg:w-[70%] mx-auto">

//         <div class="shadow-2xl rounded-2xl p-6 bg-white dark:bg-gray-800/40 backdrop-blur-md">
//             <h2 class="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
//                 <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5"
//                     viewBox="0 0 24 24">
//                     <path stroke-linecap="round" stroke-linejoin="round"
//                         d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
//                 </svg>
//                 Meu Perfil
//             </h2>

//             <div class="flex flex-col md:flex-row gap-6">

//                 <div class="flex justify-center md:block">
//                     <img 
//                         src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
//                         class="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
//                     />
//                 </div>

//                 <div class="flex-1 grid gap-4">

//                     <div class="flex items-center gap-3 p-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
//                         <svg class="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" stroke-width="1.5"
//                              viewBox="0 0 24 24">
//                             <path stroke-linecap="round" stroke-linejoin="round"
//                                 d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
//                             <path stroke-linecap="round" stroke-linejoin="round"
//                                 d="M4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75..." />
//                         </svg>
//                         <div>
//                             <p class="text-gray-500 text-sm dark:text-gray-400">Nome</p>
//                             <p class="font-semibold text-gray-900 dark:text-gray-200">
//                                 John Doe
//                             </p>
//                         </div>
//                     </div>

//                     <div class="flex items-center gap-3 p-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
//                         <svg class="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" stroke-width="1.5"
//                              viewBox="0 0 24 24">
//                             <path stroke-linecap="round" stroke-linejoin="round"
//                                   d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0..."
//                             />
//                         </svg>

//                         <div>
//                             <p class="text-gray-500 text-sm dark:text-gray-400">Email</p>
//                             <p class="font-semibold text-gray-900 dark:text-gray-200">
//                                 johndoe@example.com
//                             </p>
//                         </div>
//                     </div>

//                     <div class="flex items-center gap-3 p-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
//                         <svg class="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" stroke-width="1.5"
//                              viewBox="0 0 24 24">
//                             <path stroke-linecap="round" stroke-linejoin="round"
//                                   d="M9 12h6m-3-3v6m7.5-6A9.003 9.003 0 0..."
//                             />
//                         </svg>

//                         <div>
//                             <p class="text-gray-500 text-sm dark:text-gray-400">Permissão</p>
//                             <p class="font-semibold text-gray-900 dark:text-gray-200">
//                                 Administrador
//                             </p>
//                         </div>
//                     </div>

//                 </div>

//             </div>

//         </div>
//     </div>
// </section>
//       </div>
//     </section>
//   );
// }

import { Image, Mail, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Configuracoes() {
  const { user } = useAuth();

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10">
      <div className="w-[96%] md:w-[90%] lg:w-[85%] mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Configurações do Sistema
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gerencie as preferências e configurações do FLAP Task Management System
          </p>
        </div>

        {/* Grid: Editar Perfil / Visualizar Perfil */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Seção 1: Visualizar Perfil */}
          <div className="flex-1 shadow-2xl p-6 rounded-2xl bg-white dark:bg-gray-800/40 backdrop-blur-md">
            <h2 className="text-3xl font-bold mb-4 dark:text-white flex items-center gap-2">
              Meu Perfil
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              Visualize suas informações do perfil
            </p>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex justify-center md:block">
                <img 
                  src={user.avatar || "https://ui-avatars.com/api/?name=" + user.nome}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                />
              </div>

              <div className="flex-1 grid gap-4">
                {/* Nome */}
                <div className="flex items-center gap-3 p-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
                  <User className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  <div>
                    <p className="text-gray-500 text-sm dark:text-gray-400">Nome</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-200">{user?.nome || ""}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 p-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
                  <Mail className="w-6 h-6 text-green-600 dark:text-green-300" />
                  <div>
                    <p className="text-gray-500 text-sm dark:text-gray-400">Email</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-200">{user?.email || ""}</p>
                  </div>
                </div>

                {/* Permissão */}
                <div className="flex items-center gap-3 p-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
                  <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                  <div>
                    <p className="text-gray-500 text-sm dark:text-gray-400">Permissão</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-200">{(user?.permissao === "ADMIN" ? "Administrador" : "Membro") || ""}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

         {/* Seção 2: Editar Perfil */}
        <div className="flex-1 shadow-2xl p-6 rounded-2xl bg-white dark:bg-gray-800/40 backdrop-blur-md">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Editar Perfil</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
            Atualize suas informações e foto de perfil
          </p>

          <form className="flex flex-col gap-6">
            {/* Profile Photo */}
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src={user.avatar || "https://ui-avatars.com/api/?name=" + user.nome}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                />
                <label
                  htmlFor="upload_profile"
                  className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer dark:bg-gray-700"
                >
                  <Image className='w-6 h-6 text-blue-600' />
                </label>
                <input type="file" hidden id="upload_profile" />
              </div>
            </div>

            {/* Nome */}
            <div>
              <label className="dark:text-gray-200 font-medium">Nome</label>
              <input
                type="text"
                placeholder="Seu nome"
                className="mt-2 p-4 w-full border rounded-lg dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg"
            >
              Salvar Alterações
            </button>
          </form>
        </div>
        </div>
      </div>
    </section>
  );
}
