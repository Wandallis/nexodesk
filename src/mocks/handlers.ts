import { http, HttpResponse } from 'msw';
import { INITIAL_TICKETS } from '../data/mockTickets';
import type { Ticket, CreateTicketDTO } from '../types/ticket';

const STORAGE_KEY = '@nexodesk:tickets_db';

// Helper para manter o "banco de dados" sincronizado no localStorage
function getDb(): Ticket[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TICKETS));
    return INITIAL_TICKETS;
  }
  return JSON.parse(stored);
}

function saveDb(tickets: Ticket[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

export const handlers = [
  // 1. GET /tickets — Listar todos os chamados
  http.get('/tickets', () => {
    const ticketsDb = getDb();
    return HttpResponse.json(ticketsDb);
  }),

  // 2. GET /tickets/:id — Detalhes de um chamado específico
  http.get('/tickets/:id', ({ params }) => {
    const { id } = params;
    const ticketsDb = getDb();
    const ticket = ticketsDb.find((t) => t.id === id);

    if (!ticket) {
      return new HttpResponse(null, { status: 404, statusText: 'Chamado não encontrado' });
    }

    return HttpResponse.json(ticket);
  }),

  // 3. POST /tickets — Criar novo chamado
  http.post('/tickets', async ({ request }) => {
    const body = (await request.json()) as CreateTicketDTO;
    const ticketsDb = getDb();

    const newTicket: Ticket = {
      ...body,
      id: String(Date.now()),
      status: 'Aberto',
      createdAt: new Date().toISOString(),
    };

    const updatedDb = [newTicket, ...ticketsDb];
    saveDb(updatedDb);

    return HttpResponse.json(newTicket, { status: 201 });
  }),

  // 4. PATCH /tickets/:id — Atualizar status do chamado
  http.patch('/tickets/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as { status: Ticket['status'] };
    const ticketsDb = getDb();

    let updatedTicket: Ticket | null = null;

    const updatedDb = ticketsDb.map((ticket) => {
      if (ticket.id === id) {
        updatedTicket = { ...ticket, status: body.status };
        return updatedTicket;
      }
      return ticket;
    });

    if (!updatedTicket) {
      return new HttpResponse(null, { status: 404, statusText: 'Chamado não encontrado' });
    }

    saveDb(updatedDb);
    return HttpResponse.json(updatedTicket);
  }),

  // 5. DELETE /tickets/:id — Excluir chamado
  http.delete('/tickets/:id', ({ params }) => {
    const { id } = params;
    const ticketsDb = getDb();
    const ticketExists = ticketsDb.some((t) => t.id === id);

    if (!ticketExists) {
      return new HttpResponse(null, { status: 404, statusText: 'Chamado não encontrado' });
    }

    const updatedDb = ticketsDb.filter((t) => t.id !== id);
    saveDb(updatedDb);

    return new HttpResponse(null, { status: 204 });
  }),
];