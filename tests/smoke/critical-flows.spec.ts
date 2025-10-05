import { test, expect } from '@playwright/test';

/**
 * SMOKE TEST SUITE - Critical User Journeys
 * Target: <5 minutes runtime
 * Runs on: Every PR
 * Coverage: Journey 1, 2, 3, 5 (see docs/strategy/user-journeys.md)
 */

test.describe('Smoke Tests - Critical Flows @smoke', () => {

  // Journey 5: Cart Management
  test('should add product to cart and update count', async ({ page }) => {
    await page.goto('/');

    // Verify homepage loads
    await expect(page.getByRole('heading', { name: 'Shop' })).toBeVisible();

    // Add product to cart
    await page.getByRole('link', { name: 'Add "Falcon 9" to your cart' }).click();

    // Verify cart updates
    await expect(page.getByRole('link', { name: /1 item/ })).toBeVisible({ timeout: 5000 });
  });

  test('should navigate to cart and display added items', async ({ page }) => {
    await page.goto('/');

    // Add product
    await page.getByRole('link', { name: 'Add "Falcon 9" to your cart' }).click();
    await expect(page.getByRole('link', { name: /1 item/ })).toBeVisible();

    // Navigate to cart
    await page.getByRole('link', { name: 'Cart' }).first().click();

    // Verify cart page
    await expect(page).toHaveURL(/.*cart/);
    await expect(page.getByRole('heading', { name: 'Cart' })).toBeVisible();
  });

  // Journey 1: Guest Checkout (Critical Path)
  test('should proceed from cart to checkout', async ({ page }) => {
    await page.goto('/');

    // Add product and go to cart
    await page.getByRole('link', { name: 'Add "Saturn V" to your cart' }).click();
    await page.getByRole('link', { name: 'Cart' }).first().click();

    // Verify cart has items
    await expect(page.getByRole('heading', { name: 'Cart' })).toBeVisible();

    // Proceed to checkout
    const checkoutButton = page.getByRole('link', { name: /Proceed to checkout/i }).or(
      page.getByRole('link', { name: /Checkout/i }).first()
    );
    await checkoutButton.click();

    // Verify checkout page loads
    await expect(page).toHaveURL(/.*checkout/);
  });

  test('should display product details correctly', async ({ page }) => {
    await page.goto('/');

    // Click on a product
    await page.getByRole('heading', { name: 'Falcon 9' }).click();

    // Verify product page loads with details
    await expect(page).toHaveURL(/.*product\/falcon-9/);
    await expect(page.getByRole('heading', { name: 'Falcon 9' })).toBeVisible();
  });

  test('should update cart quantity', async ({ page }) => {
    await page.goto('/');

    // Add product twice
    await page.getByRole('link', { name: 'Add "Falcon 9" to your cart' }).click();
    await page.waitForTimeout(1000); // Wait for first add to complete
    await page.goto('/'); // Return to homepage
    await page.getByRole('link', { name: 'Add "Falcon 9" to your cart' }).click();

    // Verify cart shows 2 items
    await expect(page.getByRole('link', { name: /2 item/ })).toBeVisible({ timeout: 5000 });
  });

  // Journey 2: User Authentication
  test('should navigate to account/login page', async ({ page }) => {
    await page.goto('/');

    // Click My Account
    await page.getByRole('link', { name: 'My account' }).first().click();

    // Verify account page loads
    await expect(page).toHaveURL(/.*my-account/);
  });

  test('should display homepage with all key elements', async ({ page }) => {
    await page.goto('/');

    // Verify critical elements are visible
    await expect(page.getByRole('heading', { name: 'Shop' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cart' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'My account' })).toBeVisible();

    // Verify products are displayed
    await expect(page.getByRole('heading', { name: 'Falcon 9' })).toBeVisible();
  });

  test('should load homepage within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Verify page loads in under 3 seconds
    expect(loadTime).toBeLessThan(3000);

    // Verify page is interactive
    await expect(page.getByRole('heading', { name: 'Shop' })).toBeVisible();
  });
});
