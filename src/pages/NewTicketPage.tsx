import { useState, type FormEvent } from 'react';
import { ArrowLeft, Send, CheckCircle2, Loader2 } from 'lucide-react';
import type { TicketPriority, TicketSector } from '../types/ticket';
import { createTicket } from '../services/api';

export function NewTicketPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [sector, setSector] = useState<TicketSector | ''>('');
  const [priority, setPriority] = useState<TicketPriority | ''>('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    authorName?: string;
    authorEmail?: string;
    sector?: string;
    priority?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!title.trim() || title.trim().length < 5) {
      newErrors.title = 'O título é obrigatório e deve ter no mínimo 5 caracteres.';
    }
    if (!description.trim() || description.trim().length < 10) {
      newErrors.description = 'A descrição é obrigatória e deve ter no mínimo 10 caracteres.';
    }
    if (!authorName.trim() || authorName.trim().length < 3) {
      newErrors.authorName = 'O nome do solicitante é obrigatório (mín. 3 caracteres).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!authorEmail.trim() || !emailRegex.test(authorEmail)) {
      newErrors.authorEmail = 'Informe um e-mail corporativo válido.';
    }
    if (!sector) {
      newErrors.sector = 'Selecione o setor responsável.';
    }
    if (!priority) {
      newErrors.priority = 'Selecione o nível de prioridade.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsLoading(true);
      await createTicket({
        title: title.trim(),
        description: description.trim(),
        authorName: authorName.trim(),
        authorEmail: authorEmail.trim(),
        sector: sector as TicketSector,
        priority: priority as TicketPriority,
      });

      setSubmittedSuccess(true);
    } catch (error) {
      alert('Erro ao enviar o chamado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    window.location.pathname = '/';
  };

  const handleResetForm = () => {
    setTitle('');
    setDescription('');
    setAuthorName('');
    setAuthorEmail('');
    setSector('');
    setPriority('');
    setErrors({});
    setSubmittedSuccess(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        
        {/* Botão para voltar */}
        <button
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-4 transition cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Voltar ao painel de suporte</span>
        </button>

        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Header compacto */}
          <div className="bg-blue-600 px-6 py-5 text-white">
            <span className="bg-blue-500 text-xs font-bold px-2.5 py-0.5 rounded inline-block mb-1">NexoTech Portal</span>
            <h1 className="text-xl sm:text-2xl font-bold">Abrir Novo Chamado de Suporte</h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-0.5">
              Sua solicitação será encaminhada automaticamente com status <span className="font-semibold underline">Aberto</span>.
            </p>
          </div>

          {submittedSuccess ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Chamado Registrado com Sucesso!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Sua solicitação foi enviada para a fila de atendimento via API.
              </p>
              
              {/* Botões de Ação */}
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={handleResetForm}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition cursor-pointer"
                >
                  Registrar Outro Chamado
                </button>
                <button
                  onClick={handleGoBack}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition shadow-sm cursor-pointer"
                >
                  Ir para o Painel de Suporte
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
              
              {/* Título */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Título do Chamado *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Erro ao acessar impressora"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white"
                />
                {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
              </div>

              {/* Nome e E-mail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Seu Nome *</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Nome completo"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white"
                  />
                  {errors.authorName && <p className="text-xs text-red-600 mt-1">{errors.authorName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">E-mail *</label>
                  <input
                    type="email"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    placeholder="email@nexotech.com"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white"
                  />
                  {errors.authorEmail && <p className="text-xs text-red-600 mt-1">{errors.authorEmail}</p>}
                </div>
              </div>

              {/* Setor e Prioridade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Setor *</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value as TicketSector)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white cursor-pointer"
                  >
                    <option value="">Selecione...</option>
                    <option value="TI">TI</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="RH">RH</option>
                    <option value="Vendas">Vendas</option>
                    <option value="Operações">Operações</option>
                  </select>
                  {errors.sector && <p className="text-xs text-red-600 mt-1">{errors.sector}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Prioridade *</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TicketPriority)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white cursor-pointer"
                  >
                    <option value="">Selecione...</option>
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                  </select>
                  {errors.priority && <p className="text-xs text-red-600 mt-1">{errors.priority}</p>}
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Descrição *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Descreva o problema..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:bg-white resize-none"
                />
                {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
              </div>

              {/* Botão de Envio */}
              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-2.5 rounded-xl font-medium text-sm transition shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  <span>Enviar Solicitação</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}