import { test, expect } from '@playwright/test';

test('deployment verification', async ({ page }) => {
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  await page.goto('http://www.gavmor.com/aptsus/', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Verify that the page content contains the main app name
  await expect(page.getByText('ApartmentHunter')).toBeVisible({ timeout: 10000 });
});
