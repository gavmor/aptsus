import { test, expect } from '@playwright/test';

test('Smart Import flow with authentication', async ({ page }) => {
  // Mock the gateway endpoints
  await page.route('**/session', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
      headers: { 'Set-Cookie': 'session=valid-session-token; Path=/' }
    });
  });

  let extractionCount = 0;
  await page.route('**/extract-listing', async route => {
    extractionCount++;
    if (extractionCount === 1) {
      await route.fulfill({ status: 401 });
    } else {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          address: "456 E2E Lane",
          price: 3000,
          beds: 2,
          sqft: 1100
        })
      });
    }
  });

  await page.goto('/');

  // Navigate to Add New tab
  await page.getByRole('button', { name: 'Add New' }).click();

  // Enter text into Smart Import
  const importInput = page.getByPlaceholder(/Paste text like/i);
  await importInput.fill('2bd apartment for $3000 at 456 E2E Lane');

  // Listen for the prompt
  page.on('dialog', async dialog => {
    if (dialog.message().includes('enter the gateway password')) {
      await dialog.accept('test-password');
    }
  });

  // Trigger Extract
  await page.getByRole('button', { name: 'Extract' }).click();

  // Verify form population
  // Helper to find input by direct label text
  // The structure is: div > label, div > div > input
  const getInputByLabel = (label: string) => 
    page.locator('div').filter({ has: page.locator('label').filter({ hasText: new RegExp(`^${label}$`, 'i') }) }).last().locator('input');

  // Using .last() as a workaround if there's still nesting issues, 
  // but let's try to be even more specific with placeholders if this fails.
  
  await expect(page.getByPlaceholder('e.g. 123 Sunset Blvd, Apt 4B')).toHaveValue('456 E2E Lane');
  await expect(page.getByPlaceholder('2500')).toHaveValue('3000');
  await expect(page.getByPlaceholder('1', { exact: true })).toHaveValue('2');
  await expect(page.getByPlaceholder('800')).toHaveValue('1100');
});
