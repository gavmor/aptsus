import { test, expect } from '@playwright/test';

test('has title and displays main app content', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Aptsus App/); // From index.html

  // Check for ApartmentHunter text in the header
  const header = page.locator('h1');
  await expect(header).toContainText('ApartmentHunter');

  // Check if "Add New" button is visible
  const addNewBtn = page.getByRole('button', { name: 'Add New' });
  await expect(addNewBtn).toBeVisible();
});

test('can navigate to destinations tab', async ({ page }) => {
  await page.goto('/');
  
  const destBtn = page.getByRole('button', { name: 'Destinations' });
  await destBtn.click();
  
  const heading = page.locator('h2');
  await expect(heading).toContainText('Commute Destinations');
});
