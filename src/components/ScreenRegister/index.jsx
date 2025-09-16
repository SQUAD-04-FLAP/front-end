import React, { useState } from "react";
import { Users, ChevronDown, Check } from 'lucide-react';

export function ScreenRegister() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    perfilAcesso: ''
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({
    nomeCompleto: '',
    email: '',
    perfilAcesso: ''
  });

  const profiles = [
    { value: 'administrador', label: 'Administrador' },
    { value: 'gerente', label: 'Gerente' },
    { value: 'usuario', label: 'Usuário' },
    { value: 'visualizador', label: 'Visualizador' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleProfileSelect = (profile) => {
    handleInputChange('perfilAcesso', profile.value);
    setIsDropdownOpen(false);
  };

  const handleSubmit = () => {

    const newErrors = {};

    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = 'Nome completo deve ter pelo menos 2 caracteres';
    } else if (formData.nomeCompleto.trim().length < 2) {
      newErrors.nomeCompleto = 'Nome completo deve ter pelo menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail deve ter um formato válido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail deve ter um formato válido';
    }

    if (!formData.perfilAcesso) {
      newErrors.perfilAcesso = 'Por favor selecione um perfil de acesso!';
    }

    setErrors(newErrors);


    if (Object.keys(newErrors).length > 0) {
      return;
    }


    console.log('Dados do formulário:', formData);
    alert('Usuário cadastrado com sucesso!');
  };

  const handleClear = () => {
    setFormData({
      nomeCompleto: '',
      email: '',
      perfilAcesso: ''
    });
    setErrors({
      nomeCompleto: '',
      email: '',
      perfilAcesso: ''
    });
  };

  const getSelectedProfileLabel = () => {
    const selected = profiles.find(p => p.value === formData.perfilAcesso);
    return selected ? selected.label : 'Selecione o perfil de acesso';
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Cadastro de Usuários</h1>
              <p className="text-gray-600">Adicione novos usuários e defina suas permissões de acesso</p>
            </div>
          </div>
        </div>


        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

          <div className="bg-blue-500 px-6 py-4">
            <h2 className="text-lg font-medium text-white">Informações do Usuário</h2>
            <p className="text-blue-100 text-sm mt-1">Preencha os dados abaixo para criar uma nova conta de usuário</p>
          </div>


          <div className="p-6">
            <div className="space-y-6">

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4" />
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formData.nomeCompleto}
                  onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                  placeholder="Digite o nome completo"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.nomeCompleto ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.nomeCompleto && (
                  <div className="flex items-center gap-1 mt-1">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-red-500">{errors.nomeCompleto}</span>
                  </div>
                )}
              </div>


              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  E-mail *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Digite o e-mail"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <div className="flex items-center gap-1 mt-1">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-red-500">{errors.email}</span>
                  </div>
                )}
              </div>


              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Perfil de Acesso *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-4 py-3 border bg-white text-left transition-colors flex items-center justify-between ${
                      isDropdownOpen ? 'rounded-t-lg border-b-0' : 'rounded-lg'
                    } ${errors.perfilAcesso ? 'border-red-300' : 'border-gray-300'}`}
                  >
                    <span className={formData.perfilAcesso ? 'text-gray-900' : 'text-gray-500'}>
                      {getSelectedProfileLabel()}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className={`border border-t-0 rounded-b-lg bg-white ${errors.perfilAcesso ? 'border-red-300' : 'border-gray-300'}`}>
                      {profiles.map((profile, index) => (
                        <button
                          key={profile.value}
                          type="button"
                          onClick={() => handleProfileSelect(profile)}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700 ${
                            index === profiles.length - 1 ? 'rounded-b-lg' : 'border-b border-gray-200'
                          } ${formData.perfilAcesso === profile.value ? 'bg-blue-50 text-blue-700' : ''}`}
                        >
                          {profile.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.perfilAcesso && (
                  <div className="flex items-center gap-1 mt-1">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-red-500">{errors.perfilAcesso}</span>
                  </div>
                )}
              </div>
            </div>


            <div className="flex gap-3 mt-8">
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 rounded-lg font-medium focus:ring-2 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
              >
                <Check className="w-4 h-4" />
                Cadastrar Usuário
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Limpar
              </button>
            </div>
          </div>
        </div>


        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Informações sobre perfis:</h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="font-medium text-blue-600 min-w-28">Administrador:</span>
              <span className="text-gray-600">Acesso total ao sistema</span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium text-green-600 min-w-28">Gerente:</span>
              <span className="text-gray-600">Acesso a relatórios e gerenciamento de equipe</span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium text-orange-600 min-w-28">Usuário:</span>
              <span className="text-gray-600">Acesso padrão às funcionalidades principais</span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium text-gray-600 min-w-28">Visualizador:</span>
              <span className="text-gray-600">Acesso apenas para consulta</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}