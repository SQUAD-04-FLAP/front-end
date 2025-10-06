export function BreadcrumbFramer() {
    return (
        <ul className="flex space-x-4 p-4">
            <li className="text-slate-500 dark:text-slate-400 text-base font-medium cursor-pointer">
                Atualização do Site
            </li>
            <li className="text-slate-500 dark:text-slate-400 text-sm font-medium">/</li>
            <li className="text-slate-500 dark:text-slate-400 text-base font-medium cursor-pointer">
                Onboarding de Novos Funcionários
            </li>
            <li className="text-slate-500 dark:text-slate-400 text-sm font-medium">/</li>
            <li className="text-slate-500 dark:text-slate-400 text-base font-medium cursor-pointer">
                Lançamento Produto X
            </li>
            <li className="text-slate-500 dark:text-slate-400 text-sm font-medium">/</li>
            <li className="text-slate-900 dark:text-white text-base font-semibold cursor-pointer">
                Campanha de Natal
            </li>
        </ul>
    );
}
