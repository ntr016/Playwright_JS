import { test, expect } from '@playwright/test';

test.describe('Bellatrix E-commerce Demo', () => {
  test('should load homepage and display products', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Bellatrix/);

    // Verify heading and products are displayed
    await expect(page.getByRole('heading', { name: 'Shop' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Falcon 9' })).toBeVisible();
  });

  test('should add product to cart', async ({ page }) => {
    await page.goto('/');

    // Add Falcon 9 to cart
    await page.getByRole('link', { name: 'Add "Falcon 9" to your cart' }).click();

    // Verify cart shows 1 item
    await expect(page.getByRole('link', { name: /1 item/ })).toBeVisible();
  });

  test('should navigate to cart page', async ({ page }) => {
    await page.goto('/');

    // Add product to cart first
    await page.getByRole('link', { name: 'Add "Falcon 9" to your cart' }).click();

    // Navigate to cart
    await page.getByRole('link', { name: 'Cart' }).first().click();

    // Verify on cart page
    await expect(page).toHaveURL(/.*cart/);
    await expect(page.getByRole('heading', { name: 'Cart' })).toBeVisible();
  });
});
