import { Moon, Plus, Sun } from 'lucide-react';

interface HeaderProps {
  onOpenNewTicketModal: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function Header({ onOpenNewTicketModal, isDarkMode, onToggleTheme }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-sm tracking-wider">
            NX
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-slate-100">NexoDesk</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDarkMode ? 'Ativar tema claro' : 'Ativar tema escuro'}
            aria-pressed={isDarkMode}
            title={isDarkMode ? 'Ativar tema claro' : 'Ativar tema escuro'}
            className="inline-flex items-center justify-center p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition cursor-pointer"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={onOpenNewTicketModal}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition shadow-sm cursor-pointer"
          >
            <Plus size={18} />
            <span>Novo Chamado</span>
          </button>
        </div>
      </div>
    </header>
  );
}