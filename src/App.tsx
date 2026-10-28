import { useState } from 'react';
import { INITIAL_TICKETS } from './data/mockTickets';
import type { Ticket } from './types/ticket';
import { Header } from './components/header';
import { MetricCard } from './components/MetricCard';
import { TicketTable } from './components/TicketTable';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  
  const totalTickets = tickets.length;
  const openedTickets = tickets.filter(t => t.status === 'Aberto').length;
  const inProgressTickets = tickets.filter(t => t.status === 'Em Andamento').length;
  const completedTickets = tickets.filter(t => t.status === 'Concluído').length;

  const handleDeleteTicket = (id: string) => {
    if (confirm('Deseja realmente excluir este chamado?')) {
      setTickets(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleViewDetails = (ticket: Ticket) => {
    alert(`Detalhes do chamado:\n\nTítulo: ${ticket.title}\nSolicitante: ${ticket.authorName}\nStatus: ${ticket.status}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header onOpenNewTicketModal={() => alert('Abrir modal de novo chamado')} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Grid de Indicadores Responsivos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard 
            title="Total de Chamados" 
            value={totalTickets} 
            icon={<ClipboardList size={24} />} 
            textColor="text-slate-900" 
            bgColor="bg-blue-50 text-blue-600" 
          />
          <MetricCard 
            title="Abertos" 
            value={openedTickets} 
            icon={<AlertCircle size={24} />} 
            textColor="text-amber-600" 
            bgColor="bg-amber-50 text-amber-600" 
          />
          <MetricCard 
            title="Em Andamento" 
            value={inProgressTickets} 
            icon={<Clock size={24} />} 
            textColor="text-indigo-600" 
            bgColor="bg-indigo-50 text-indigo-600" 
          />
          <MetricCard 
            title="Concluídos" 
            value={completedTickets} 
            icon={<CheckCircle2 size={24} />} 
            textColor="text-emerald-600" 
            bgColor="bg-emerald-50 text-emerald-600" 
          />
        </div>

        {/* Bloco da Lista / Tabela */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Lista de Solicitações</h2>
            <div className="text-xs sm:text-sm text-slate-500">
              Exibindo {tickets.length} chamados
            </div>
          </div>

          <TicketTable 
            tickets={tickets} 
            onViewDetails={handleViewDetails} 
            onDeleteTicket={handleDeleteTicket} 
          />
        </div>

      </main>
    </div>
  );
}