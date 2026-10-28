import type { Ticket } from '../types/ticket';

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: '1',
    title: 'Erro ao acessar o e-mail corporativo',
    description: 'Não consigo realizar o login no Webmail corporativo desde hoje cedo.',
    authorName: 'Ana Silva',
    authorEmail: 'ana.silva@nexotech.com',
    sector: 'RH',
    priority: 'Alta',
    status: 'Aberto',
    createdAt: '2026-10-28T09:30:00.000Z'
  },
  {
    id: '2',
    title: 'Troca de lâmpada no setor comercial',
    description: 'Lâmpada sobre a mesa 4 está piscando continuamente.',
    authorName: 'Carlos Eduardo',
    authorEmail: 'carlos.eduardo@nexotech.com',
    sector: 'Vendas',
    priority: 'Baixa',
    status: 'Em Andamento',
    createdAt: '2026-10-28T14:15:00.000Z'
  },
  {
    id: '3',
    title: 'Solicitação de nova licença do Figma',
    description: 'Necessário para novos projetos da equipe de produto.',
    authorName: 'Mariana Costa',
    authorEmail: 'mariana.costa@nexotech.com',
    sector: 'Operações',
    priority: 'Média',
    status: 'Concluído',
    createdAt: '2026-10-28T11:00:00.000Z'
  }
];