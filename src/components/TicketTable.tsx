import type { Ticket } from '../types/ticket';
import { Eye, Trash2, Calendar, User, Tag } from 'lucide-react';

interface TicketTableProps {
  tickets: Ticket[];
  onViewDetails: (ticket: Ticket) => void;
  onDeleteTicket: (id: string) => void;
}

export function TicketTable({ tickets, onViewDetails, onDeleteTicket }: TicketTableProps) {
  if (tickets.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-slate-500 text-sm">Nenhum chamado encontrado com os filtros atuais.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Visualização em Tabela para Desktop / Tablet */}
      <table className="w-full text-left border-collapse hidden md:table">
        <thead>
          <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <th className="py-3.5 px-6">Título / Setor</th>
            <th className="py-3.5 px-6">Solicitante</th>
            <th className="py-3.5 px-6">Prioridade</th>
            <th className="py-3.5 px-6">Status</th>
            <th className="py-3.5 px-6">Data</th>
            <th className="py-3.5 px-6 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-sm">
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-slate-50/50 transition">
              <td className="py-4 px-6">
                <div className="font-semibold text-slate-900">{ticket.title}</div>
                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <Tag size={12} /> {ticket.sector}
                </div>
              </td>
              <td className="py-4 px-6 text-slate-600">
                <div className="font-medium text-slate-800">{ticket.authorName}</div>
                <div className="text-xs text-slate-400">{ticket.authorEmail}</div>
              </td>
              <td className="py-4 px-6">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  ticket.priority === 'Alta' ? 'bg-red-100 text-red-700' :
                  ticket.priority === 'Média' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                }`}>
                  {ticket.priority}
                </span>
              </td>
              <td className="py-4 px-6">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  ticket.status === 'Aberto' ? 'bg-amber-100 text-amber-700' :
                  ticket.status === 'Em Andamento' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {ticket.status}
                </span>
              </td>
              <td className="py-4 px-6 text-slate-500 text-xs">
                {new Date(ticket.createdAt).toLocaleDateString('pt-BR')}
              </td>
              <td className="py-4 px-6 text-right space-x-1">
                <button 
                  onClick={() => onViewDetails(ticket)}
                  title="Ver detalhes" 
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                >
                  <Eye size={18} />
                </button>
                <button 
                  onClick={() => onDeleteTicket(ticket.id)}
                  title="Excluir" 
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Visualização em Cards para Dispositivos Móveis (Mobile) */}
      <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {ticket.sector}
                </span>
                <h3 className="font-semibold text-slate-900 mt-1">{ticket.title}</h3>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                ticket.status === 'Aberto' ? 'bg-amber-100 text-amber-700' :
                ticket.status === 'Em Andamento' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {ticket.status}
              </span>
            </div>

            <div className="text-xs text-slate-500 space-y-1 border-t border-slate-100 pt-2">
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-slate-400" />
                <span>{ticket.authorName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-400" />
                <span>{new Date(ticket.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                ticket.priority === 'Alta' ? 'bg-red-100 text-red-700' :
                ticket.priority === 'Média' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
              }`}>
                Prioridade: {ticket.priority}
              </span>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => onViewDetails(ticket)}
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                >
                  <Eye size={18} />
                </button>
                <button 
                  onClick={() => onDeleteTicket(ticket.id)}
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}