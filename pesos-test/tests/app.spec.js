const { test, expect } = require('@playwright/test');
const path = require('path');
const localUrl = `file://${path.join(__dirname, '../index.html')}`;
const tasasUrl = `file://${path.join(__dirname, '../tasas.html')}`;

test.describe('Pruebas Automatizadas - App Pesos', () => {

  // --- PRUEBAS DE UI ---

  test('1. Prueba de navegación entre páginas (Index a Tasas)', async ({ page }) => {
    await page.goto(localUrl);
    await page.click('nav a[href="tasas.html"]');
    await expect(page).toHaveURL(/tasas\.html/);
    await expect(page.locator('h1')).toHaveText('Pesos - Monitoreo de Divisas');
  });

  test('2. Prueba de formulario: Agregar movimiento exitoso', async ({ page }) => {
    await page.goto(localUrl);
    await page.fill('#description', 'Café de la mañana');
    await page.fill('#amount', '150');
    await page.click('#btn-submit');
    
    const listItem = page.locator('#transaction-list li');
    await expect(listItem).toContainText('Café de la mañana');
    await expect(listItem).toContainText('$150.00');
  });

  test('3. Prueba de validación de campos vacíos', async ({ page }) => {
    await page.goto(localUrl);
    
    // Quitamos temporalmente el 'required' del input para probar que nuestro JS muestra el mensaje de error
    await page.evaluate(() => {
      document.getElementById('description').removeAttribute('required');
      document.getElementById('amount').removeAttribute('required');
    });

    await page.click('#btn-submit');
    const errorMsg = page.locator('#error-msg');
    await expect(errorMsg).toBeVisible();
  });

  // --- PRUEBAS DE API / RED ---

  test('4. Prueba de petición API simulada (Exitosa 200)', async ({ page }) => {
    // Simulamos la respuesta de la API para que sea 100% estable y rápida
    await page.route('https://restcountries.com/v3.1/currency/dop', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{
          name: { common: "Dominican Republic" },
          currencies: { DOP: { name: "Dominican peso", symbol: "RD$" } }
        }])
      });
    });

    await page.goto(tasasUrl);
    await page.click('#btn-fetch-api');

    await expect(page.locator('#api-status')).toContainText('Éxito');
    await expect(page.locator('#api-data')).toContainText('Dominican Republic');
  });

  test('5. Prueba de manejo de error de API (Simulación 404)', async ({ page }) => {
    await page.goto(tasasUrl);

    await page.route('https://restcountries.com/v3.1/currency/dop', route => {
      route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ error: "Not Found" })
      });
    });

    await page.click('#btn-fetch-api');

    await expect(page.locator('#api-status')).toContainText('Fallido');
    await expect(page.locator('#api-data')).toContainText('Error en la petición: 404');
  });

});