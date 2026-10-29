export type TicketStatus = 'Aberto' | 'Em Andamento' | 'Concluído';
export type TicketPriority = 'Baixa' | 'Média' | 'Alta';
export type TicketSector = 'TI' | 'Financeiro' | 'RH' | 'Vendas' | 'Operações';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  authorName: string;
  authorEmail: string;
  sector: TicketSector;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
}

export type CreateTicketDTO = Omit<Ticket, 'id' | 'status' | 'createdAt'>;