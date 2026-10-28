import { Search, X } from 'lucide-react';
interface TicketFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedPriority: string;
  onPriorityChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function TicketFilters({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  onClearFilters,
  hasActiveFilters
}: TicketFiltersProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm mb-6 space-y-4">
      <div className="flex flex-col lg:flex-row items-center gap-4">
        
        {/* Barra de Busca por Texto */}
        <div className="relative w-full flex-1">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar chamados pelo título..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>

        {/* Filtros por Select (Status e Prioridade) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          
          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full sm:w-44 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition cursor-pointer"
          >
            <option value="Todos">Status: Todos</option>
            <option value="Aberto">Aberto</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluído">Concluído</option>
          </select>

          {/* Prioridade */}
          <select
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="w-full sm:w-44 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition cursor-pointer"
          >
            <option value="Todos">Prioridade: Todas</option>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>

          {/* Botão de Limpar Filtros */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer shrink-0"
              title="Limpar filtros"
            >
              <X size={16} />
              <span>Limpar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}