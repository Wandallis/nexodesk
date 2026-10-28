import { useState, useEffect, useMemo } from 'react';
import type { Ticket } from './types/ticket';
import { fetchTickets, updateTicketStatus, deleteTicket } from './services/api';
import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { TicketTable } from './components/TicketTable';
import { TicketFilters } from './components/TicketFilters';
import { TicketDetailsModal } from './components/TicketDetailsModal';
import { NewTicketPage } from './pages/NewTicketPage';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function App() {

  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados dos Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedPriority, setSelectedPriority] = useState('Todos');

  // Estados do Modal de Detalhes
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Carrega os chamados via API REST (interceptada pelo MSW)
  const loadTickets = async () => {
    try {
      setIsLoading(true);
      const data = await fetchTickets();
      setTickets(data);
    } catch (error) {
      console.error('Erro ao carregar chamados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleViewDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedTicket(null);
    setIsDetailsModalOpen(false);
  };

  // Contadores globais do dashboard
  const totalTickets = tickets.length;
  const openedTickets = tickets.filter(t => t.status === 'Aberto').length;
  const inProgressTickets = tickets.filter(t => t.status === 'Em Andamento').length;
  const completedTickets = tickets.filter(t => t.status === 'Concluído').length;

  // Lógica de Filtros Combinados (Busca, Status e Prioridade)
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'Todos' || ticket.status === selectedStatus;
      const matchesPriority = selectedPriority === 'Todos' || ticket.priority === selectedPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, searchTerm, selectedStatus, selectedPriority]);

  const hasActiveFilters = searchTerm !== '' || selectedStatus !== 'Todos' || selectedPriority !== 'Todos';

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('Todos');
    setSelectedPriority('Todos');
  };

  const handleUpdateStatus = async (ticketId: string, newStatus: Ticket['status']) => {
    try {
      await updateTicketStatus(ticketId, newStatus);
      await loadTickets();
      setSelectedTicket(prev => prev ? { ...prev, status: newStatus } : null);
      alert(`Sucesso! Status atualizado para "${newStatus}".`);
    } catch (error) {
      alert('Erro ao atualizar status.');
      console.error(error);
    }
  };

  const handleDeleteTicket = async (id: string) => {
    if (confirm('Deseja realmente excluir este chamado?')) {
      try {
        await deleteTicket(id);
        await loadTickets();
        alert('Chamado excluído com sucesso.');
      } catch (error) {
        alert('Erro ao excluir chamado.');
        console.error(error);
      }
    }
  };

  // Navega para a rota dedicada de novo chamado
  const handleOpenNewTicketRoute = () => {
    window.history.pushState({}, '', '/novo');
    window.location.reload();
  };

 if (window.location.pathname === '/novo') {
    return <NewTicketPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header onOpenNewTicketModal={handleOpenNewTicketRoute} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Grid de Indicadores */}
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

        {/* Filtros e Busca */}
        <TicketFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Tabela de Chamados */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Lista de Solicitações</h2>
            <div className="text-xs sm:text-sm text-slate-500">
              {isLoading ? 'Carregando chamados...' : `Mostrando ${filteredTickets.length} de ${tickets.length} chamados`}
            </div>
          </div>

          <TicketTable 
            tickets={filteredTickets} 
            onViewDetails={handleViewDetails} 
            onDeleteTicket={handleDeleteTicket} 
          />
        </div>

      </main>

      {/* Modal de Detalhes */}
      <TicketDetailsModal 
        ticket={selectedTicket}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}