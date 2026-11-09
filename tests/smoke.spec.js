const { test, expect } = require('@playwright/test');
const { captureRuntimeErrors, assertNoRuntimeErrors, assertLocalAssetsAndLinks, assertResponsive } = require('./helpers');

test('storefront navigation and local assets load', async ({ page }) => {
  const errors = captureRuntimeErrors(page);
  await page.goto('/');
  await expect(page.getByRole('link', { name: /ver colección/i })).toBeVisible();
  await page.getByRole('link', { name: /ver colección/i }).click();
  await expect(page).toHaveURL(/#collection$/);
  await assertLocalAssetsAndLinks(page);
  await assertNoRuntimeErrors(errors);
});

test('language switch changes visible storefront copy in both directions', async ({ page }) => {
  const errors = captureRuntimeErrors(page);
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('.hero h1')).toContainText('Encuentra algo');
  await page.locator('#language-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('.hero h1')).toContainText('Find something');
  await page.locator('#language-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await assertNoRuntimeErrors(errors);
});

test('category buttons show only matching storefront tiles', async ({ page }) => {
  const errors = captureRuntimeErrors(page);
  await page.goto('/');
  const tiles = page.locator('.tile');
  await expect(tiles).toHaveCount(3);
  await page.locator('[data-filter="beauty"]').click();
  await expect(page.locator('.tile[data-category="beauty"]')).toBeVisible();
  await expect(page.locator('.tile[data-category="clothing"]')).toBeHidden();
  await expect(page.locator('.tile[data-category="accessories"]')).toBeHidden();
  await page.locator('[data-filter="all"]').click();
  await expect(tiles).toHaveCount(3);
  await expect(page.locator('.tile[data-category="clothing"]')).toBeVisible();
  await assertNoRuntimeErrors(errors);
});

test('storefront fits a mobile viewport', async ({ page }) => {
  await assertResponsive(page, '/');
  await expect(page.locator('.categories')).toBeVisible();
});
