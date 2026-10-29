import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// Configuração limpa e 100% compatível com as tipagens do MSW
if (typeof window !== 'undefined') {
  worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
}