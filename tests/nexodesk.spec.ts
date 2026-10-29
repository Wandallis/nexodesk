import { test, expect } from '@playwright/test';

test.describe('NexoDesk - Testes E2E', () => {
  
  test('deve carregar a página principal e exibir o título e o dashboard', async ({ page }) => {
   
    await page.goto('http://localhost:5173/');

    //  Verifica se o logotipo/título NexoDesk está visível no Header
    const brandTitle = page.locator('h1', { hasText: 'NexoDesk' });
    await expect(brandTitle).toBeVisible();

    // Verifica se os cards de métricas estão carregados
    const totalMetric = page.locator('text=Total de Chamados');
    await expect(totalMetric).toBeVisible();
  });

  test('deve filtrar os chamados ao digitar na barra de pesquisa', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    const searchInput = page.getByPlaceholder('Buscar chamados pelo título...');
    await expect(searchInput).toBeVisible();

    await searchInput.fill('Erro');

    await expect(page.getByText('Mostrando 1 de 3 chamados')).toBeVisible();
    await expect(page.locator('tbody tr')).toHaveCount(1);
    });

    test('deve enviar um novo chamado com sucesso', async ({ page }) => {
    await page.goto('http://localhost:5173/novo');

    await page.getByPlaceholder('Ex: Erro ao acessar impressora').fill('Teste automatizado');
    await page.getByPlaceholder('Nome completo').fill('Maria Silva');
    await page.getByPlaceholder('email@nexotech.com').fill('maria@nexotech.com');

    await page.locator('select').nth(0).selectOption('TI');
    await page.locator('select').nth(1).selectOption('Alta');

    await page.getByPlaceholder('Descreva o problema...').fill(
        'Chamado criado durante o teste automatizado.'
    );

    await page.getByRole('button', { name: 'Enviar Solicitação' }).click();

    await expect(
        page.getByRole('heading', { name: 'Chamado Registrado com Sucesso!' })
    ).toBeVisible();
    });

});