import type { Ticket, CreateTicketDTO } from '../types/ticket';
import { INITIAL_TICKETS } from '../data/mockTickets';

const STORAGE_KEY = '@nexodesk:tickets';

// Função auxiliar para carregar os chamados (simula GET /tickets)
export function getStoredTickets(): Ticket[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TICKETS));
    return INITIAL_TICKETS;
  }
  return JSON.parse(stored);
}

// Salva a lista atualizada no localStorage
function saveTickets(tickets: Ticket[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

// Simula: GET /tickets/:id
export function getTicketById(id: string): Ticket | null {
  const tickets = getStoredTickets();
  return tickets.find(t => t.id === id) || null;
}

// Simula: POST /tickets (Criar Chamado)
export function createTicket(data: CreateTicketDTO): Ticket {
  const tickets = getStoredTickets();
  
  const newTicket: Ticket = {
    id: String(Date.now()), 
    ...data,
    status: 'Aberto', 
    createdAt: new Date().toISOString() 
  };

  const updatedTickets = [newTicket, ...tickets];
  saveTickets(updatedTickets);
  return newTicket;
}


export function updateTicketStatus(id: string, newStatus: Ticket['status']): Ticket[] {
  const tickets = getStoredTickets();
  const updatedTickets = tickets.map(t => 
    t.id === id ? { ...t, status: newStatus } : t
  );
  saveTickets(updatedTickets);
  return updatedTickets;
}


export function deleteTicket(id: string): Ticket[] {
  const tickets = getStoredTickets();
  const updatedTickets = tickets.filter(t => t.id !== id);
  saveTickets(updatedTickets);
  return updatedTickets;
}