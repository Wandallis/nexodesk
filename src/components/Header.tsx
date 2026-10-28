import { Plus } from 'lucide-react';

interface HeaderProps {
  onOpenNewTicketModal: () => void;
}

export function Header({ onOpenNewTicketModal }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-sm tracking-wider">
            NX
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-950">NexoDesk</h1>
        </div>
        <button 
          onClick={onOpenNewTicketModal}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition shadow-sm cursor-pointer"
        >
          <Plus size={18} />
          <span>Novo Chamado</span>
        </button>
      </div>
    </header>
  );
}