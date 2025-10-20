import { HardHat, Wrench, Construction } from "lucide-react";

export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen transition-colors duration-500
                    bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 text-gray-900
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white p-6 text-center">
      
      {/* Ícone principal */}
      <div className="relative mb-8">
        <HardHat className="w-24 h-24 text-yellow-500 dark:text-yellow-400 drop-shadow-lg animate-bounce" />

        {/* Ícone girando */}
        <div className="absolute -bottom-2 -right-2 animate-spin-slow">
          <Wrench className="w-10 h-10 text-gray-500 dark:text-gray-400" />
        </div>
      </div>

      {/* Título */}
      <h1 className="text-4xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">
        Página em Construção 🚧
      </h1>

      {/* Texto descritivo */}
      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-md">
        Estamos trabalhando para trazer uma nova experiência.  
        Volte em breve e confira as novidades! 💪
      </p>

      {/* Ícone decorativo com animação pulsante */}
      <div className="mt-10 animate-pulse">
        <Construction className="w-10 h-10 text-yellow-600 dark:text-yellow-500 mx-auto" />
      </div>
    </div>
  );
}
