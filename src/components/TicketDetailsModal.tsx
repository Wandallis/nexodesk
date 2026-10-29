import type { Ticket } from '../types/ticket';
import { X, Calendar, User, Mail, Building2, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

interface TicketDetailsModalProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (ticketId: string, newStatus: Ticket['status']) => void;
}

export function TicketDetailsModal({ ticket, isOpen, onClose, onUpdateStatus }: TicketDetailsModalProps) {
  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Chamado #{ticket.id}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 rounded-lg transition cursor-pointer"
            title="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Título e Prioridade */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {ticket.title}
              </h2>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                ticket.priority === 'Alta' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                ticket.priority === 'Média' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300' : 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
              }`}>
                {ticket.priority}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Calendar size={14} className="text-slate-400 dark:text-slate-500" />
              <span>Aberto em: {new Date(ticket.createdAt).toLocaleString('pt-BR')}</span>
            </div>
          </div>

          {/* Alteração de Status Interativa */}
          <div className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 p-4 rounded-xl space-y-2">
            <label className="text-xs font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wider block">
              Alterar Status do Chamado
            </label>
            <div className="flex flex-wrap gap-2">
              {(['Aberto', 'Em Andamento', 'Concluído'] as Ticket['status'][]).map((statusOption) => {
                const isSelected = ticket.status === statusOption;
                return (
                  <button
                    key={statusOption}
                    onClick={() => onUpdateStatus(ticket.id, statusOption)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      isSelected 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {statusOption === 'Aberto' && <AlertCircle size={14} />}
                    {statusOption === 'Em Andamento' && <Clock size={14} />}
                    {statusOption === 'Concluído' && <CheckCircle2 size={14} />}
                    {statusOption}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Descrição Completa */}
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Descrição do Problema / Solicitação
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
              {ticket.description}
            </p>
          </div>

          {/* Dados do Solicitante e Setor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-5">
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Solicitante
              </h4>
              <div className="flex items-center gap-2.5 text-sm text-slate-800 dark:text-slate-200">
                <User size={16} className="text-blue-600 shrink-0" />
                <span className="font-medium">{ticket.authorName}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                <Mail size={16} className="text-blue-600 shrink-0" />
                <span className="break-all">{ticket.authorEmail}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Setor Responsável
              </h4>
              <div className="flex items-center gap-2.5 text-sm text-slate-800 dark:text-slate-200">
                <Building2 size={16} className="text-blue-600 shrink-0" />
                <span className="font-medium">{ticket.sector}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg transition cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}