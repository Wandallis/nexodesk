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
        <p className="text-slate-500 dark:text-slate-400 text-sm">Nenhum chamado encontrado com os filtros atuais.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Visualização em Tabela para Desktop / Tablet */}
      <table className="w-full text-left border-collapse hidden md:table">
        <thead>
          <tr className="bg-slate-50/75 dark:bg-slate-800/75 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <th className="py-3.5 px-6">Título / Setor</th>
            <th className="py-3.5 px-6">Solicitante</th>
            <th className="py-3.5 px-6">Prioridade</th>
            <th className="py-3.5 px-6">Status</th>
            <th className="py-3.5 px-6">Data</th>
            <th className="py-3.5 px-6 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition">
              <td className="py-4 px-6">
                <div className="font-semibold text-slate-900 dark:text-slate-100">{ticket.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                  <Tag size={12} /> {ticket.sector}
                </div>
              </td>
              <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                <div className="font-medium text-slate-800 dark:text-slate-200">{ticket.authorName}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500">{ticket.authorEmail}</div>
              </td>
              <td className="py-4 px-6">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  ticket.priority === 'Alta' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' :
                  ticket.priority === 'Média' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300' : 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                }`}>
                  {ticket.priority}
                </span>
              </td>
              <td className="py-4 px-6">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  ticket.status === 'Aberto' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                  ticket.status === 'Em Andamento' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                }`}>
                  {ticket.status}
                </span>
              </td>
              <td className="py-4 px-6 text-slate-500 dark:text-slate-400 text-xs">
                {new Date(ticket.createdAt).toLocaleDateString('pt-BR')}
              </td>
              <td className="py-4 px-6 text-right space-x-1">
                <button 
                  onClick={() => onViewDetails(ticket)}
                  title="Ver detalhes" 
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition cursor-pointer"
                >
                  <Eye size={18} />
                </button>
                <button 
                  onClick={() => onDeleteTicket(ticket.id)}
                  title="Excluir" 
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition cursor-pointer"
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
          <div key={ticket.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                  {ticket.sector}
                </span>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mt-1">{ticket.title}</h3>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                ticket.status === 'Aberto' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                ticket.status === 'Em Andamento' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
              }`}>
                {ticket.status}
              </span>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-100 dark:border-slate-800 pt-2">
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-slate-400 dark:text-slate-500" />
                <span>{ticket.authorName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-400 dark:text-slate-500" />
                <span>{new Date(ticket.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                ticket.priority === 'Alta' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' :
                ticket.priority === 'Média' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300' : 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
              }`}>
                Prioridade: {ticket.priority}
              </span>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => onViewDetails(ticket)}
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition"
                >
                  <Eye size={18} />
                </button>
                <button 
                  onClick={() => onDeleteTicket(ticket.id)}
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition"
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