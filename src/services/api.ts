import type { Ticket, CreateTicketDTO } from '../types/ticket';

// GET /tickets — Listar chamados
export async function fetchTickets(): Promise<Ticket[]> {
  const response = await fetch('/tickets');
  if (!response.ok) throw new Error('Falha ao carregar os chamados.');
  return response.json();
}

// GET /tickets/:id — Detalhes do chamado
export async function fetchTicketById(id: string): Promise<Ticket> {
  const response = await fetch(`/tickets/${id}`);
  if (!response.ok) throw new Error('Chamado não encontrado.');
  return response.json();
}

// POST /tickets — Criar novo chamado
export async function createTicket(data: CreateTicketDTO): Promise<Ticket> {
  const response = await fetch('/tickets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Falha ao criar o chamado.');
  return response.json();
}

// PATCH /tickets/:id — Atualizar status
export async function updateTicketStatus(id: string, newStatus: Ticket['status']): Promise<Ticket> {
  const response = await fetch(`/tickets/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  });
  if (!response.ok) throw new Error('Falha ao atualizar o status.');
  return response.json();
}

// DELETE /tickets/:id — Excluir chamado
export async function deleteTicket(id: string): Promise<void> {
  const response = await fetch(`/tickets/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Falha ao excluir o chamado.');
}