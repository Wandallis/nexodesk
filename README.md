# NexoDesk

Aplicação web para gerenciamento de chamados de suporte. O painel permite acompanhar solicitações, filtrar chamados, consultar detalhes, atualizar status e cadastrar novos tickets.

## Funcionalidades

- Dashboard com indicadores de chamados por status.
- Busca por título, nome do solicitante ou setor.
- Filtros por status e prioridade.
- Tabela para desktop e cartões para dispositivos móveis.
- Modal com detalhes e atualização do status do chamado.
- Cadastro e exclusão de chamados.
- Tema claro e escuro, com preferência salva no navegador.
- API simulada com MSW durante o desenvolvimento.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS
- MSW
- Playwright

## Requisitos

- Git
- Node.js LTS compatível com Vite 8
- npm

## Clonar e instalar

Clone o repositório e entre na pasta:

```bash
git clone https://github.com/Wandallis/nexodesk.git
cd nexodesk
```

Instale as dependências:

```bash
npm ci
```

## Executar em desenvolvimento

Inicie o servidor local:

```bash
npm run dev
```

Abra no navegador o endereço informado pelo Vite, normalmente [http://localhost:5173](http://localhost:5173).

A rota principal exibe o painel. A página para cadastro de chamado fica em [http://localhost:5173/novo](http://localhost:5173/novo).

## Dados de demonstração

No desenvolvimento, o MSW intercepta as chamadas HTTP e simula a API. Os dados iniciais estão em `src/data/mockTickets.ts`, e os endpoints simulados ficam em `src/mocks/handlers.ts`.

Os chamados criados, atualizados ou excluídos ficam salvos no `localStorage` do navegador. Para restaurar os dados de demonstração, limpe os dados do site no navegador ou remova a chave `@nexodesk:tickets_db` do `localStorage` e recarregue a página.

A preferência de tema é armazenada separadamente na chave `nexodesk-theme`.

## Testes E2E

Os testes usam Playwright e estão em `tests/`. Instale os navegadores necessários uma vez:

```bash
npx playwright install
```

O servidor de desenvolvimento precisa estar ativo na porta `5173`. Em um terminal, execute `npm run dev`; em outro, rode:

```bash
npx playwright test
```

Para executar apenas no Chromium:

```bash
npx playwright test --project=chromium
```

Para abrir o relatório HTML após a execução:

```bash
npx playwright show-report
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Verifica os tipos TypeScript e gera a versão de produção |
| `npm run preview` | Serve localmente a versão de produção |
| `npm run lint` | Executa o Oxlint |

## Build de produção

Gere os arquivos de produção:

```bash
npm run build
```

Para visualizar o build localmente:

```bash
npm run preview
```

## Estrutura do projeto

```text
src/
├── components/       # Componentes do painel, filtros, tabela e modal
├── data/             # Dados iniciais para demonstração
├── mocks/            # Configuração e handlers do MSW
├── pages/            # Páginas da aplicação, incluindo novo chamado
├── services/         # Chamadas à API
├── types/            # Tipos TypeScript
├── App.tsx           # Estado e composição principal da aplicação
└── main.tsx          # Inicialização do React e do MSW
tests/                # Testes end-to-end do Playwright
```
