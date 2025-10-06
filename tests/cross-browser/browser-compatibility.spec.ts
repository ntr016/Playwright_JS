import { test, expect } from '@playwright/test';

// Cross-browser tests configured via playwright.config.ts projects
// These tests will run across all configured browsers (chromium, firefox, webkit)

test.describe('Cross-Browser Compatibility', () => {
  test('should load homepage correctly', async ({ page, browserName }) => {
    await page.goto('https://playwright.dev');

    // Verify basic page structure loads in all browsers
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();

    console.log(`✓ Homepage loaded successfully in ${browserName}`);
  });

  test('should handle CSS and layout correctly', async ({ page, browserName }) => {
    await page.goto('https://playwright.dev');

    // Test CSS feature support and layout
    const cssCompatibility = await page.evaluate(() => {
      const testElement = document.createElement('div');
      document.body.appendChild(testElement);

      const tests = {
        flexbox: 'flex' in testElement.style,
        grid: 'grid' in testElement.style,
        customProperties: CSS.supports('--custom-property', 'value'),
        transform: 'transform' in testElement.style,
        transition: 'transition' in testElement.style,
        borderRadius: 'borderRadius' in testElement.style,
        boxShadow: 'boxShadow' in testElement.style
      };

      document.body.removeChild(testElement);
      return tests;
    });

    // Modern CSS features should be supported
    expect(cssCompatibility.flexbox).toBeTruthy();
    expect(cssCompatibility.transform).toBeTruthy();
    expect(cssCompatibility.transition).toBeTruthy();
    expect(cssCompatibility.borderRadius).toBeTruthy();

    console.log(`✓ CSS features supported in ${browserName}`);
  });

  test('should handle JavaScript features correctly', async ({ page, browserName }) => {
    await page.goto('https://playwright.dev');

    // Test modern JavaScript features
    const jsCompatibility = await page.evaluate(() => {
      const tests = {
        arrow_functions: (() => true)(),
        promises: typeof Promise !== 'undefined',
        async_await: (async () => true)().constructor.name === 'Promise',
        fetch: typeof fetch !== 'undefined',
        localStorage: typeof localStorage !== 'undefined',
        sessionStorage: typeof sessionStorage !== 'undefined',
        addEventListener: typeof document.addEventListener !== 'undefined'
      };

      return tests;
    });

    // Essential JavaScript features should be supported
    expect(jsCompatibility.promises).toBeTruthy();
    expect(jsCompatibility.fetch).toBeTruthy();
    expect(jsCompatibility.localStorage).toBeTruthy();
    expect(jsCompatibility.addEventListener).toBeTruthy();

    console.log(`✓ JavaScript features supported in ${browserName}`);
  });

  test('should handle navigation and routing', async ({ page, browserName }) => {
    await page.goto('https://playwright.dev');

    // Test navigation to different sections
    await page.getByRole('link', { name: 'Docs' }).click();
    await expect(page).toHaveURL(/.*docs\/intro/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Test back navigation
    await page.goBack();
    await expect(page).toHaveURL('https://playwright.dev/');

    console.log(`✓ Navigation works correctly in ${browserName}`);
  });

  test('should handle responsive design', async ({ page, browserName }) => {
    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('https://playwright.dev');

      // Verify responsive layout
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();

      // Verify content is accessible at all viewport sizes
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }

    console.log(`✓ Responsive design works in ${browserName}`);
  });

  test('should handle events and user interactions', async ({ page, browserName }) => {
    await page.goto('https://playwright.dev');

    // Test click events
    const getStartedLink = page.getByRole('link', { name: 'Get started' });
    await getStartedLink.click();
    await expect(page).toHaveURL(/.*docs\/intro/);

    await page.goto('https://playwright.dev');

    // Test hover events
    const navLinks = page.locator('nav a');
    const firstNavLink = navLinks.first();
    await firstNavLink.hover();

    // Test keyboard events
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();

    console.log(`✓ User interactions work in ${browserName}`);
  });
});

// Cross-browser feature detection tests
test.describe('Cross-Browser Feature Detection', () => {
  test('should detect browser capabilities', async ({ page, browserName }) => {
    await page.goto('https://playwright.dev');

    const browserCapabilities = await page.evaluate(() => {
      const capabilities = {
        userAgent: navigator.userAgent,
        supportsWebGL: !!window.WebGLRenderingContext,
        supportsWebWorkers: typeof Worker !== 'undefined',
        supportsIndexedDB: typeof indexedDB !== 'undefined',
        supportsServiceWorker: 'serviceWorker' in navigator,
        supportsGeolocation: 'geolocation' in navigator,
        supportsFileAPI: typeof FileReader !== 'undefined',
        screenWidth: screen.width,
        screenHeight: screen.height,
        colorDepth: screen.colorDepth,
        pixelRatio: window.devicePixelRatio
      };

      return capabilities;
    });

    console.log(`Browser capabilities for ${browserName}:`, JSON.stringify(browserCapabilities, null, 2));

    // Verify expected capabilities
    expect(browserCapabilities.supportsIndexedDB).toBeTruthy();
    expect(browserCapabilities.supportsFileAPI).toBeTruthy();
    expect(browserCapabilities.screenWidth).toBeGreaterThan(0);
    expect(browserCapabilities.screenHeight).toBeGreaterThan(0);
  });

  test('should handle browser-specific quirks', async ({ page, browserName }) => {
    await page.goto('https://playwright.dev');

    // Test browser-specific behavior
    const quirks = await page.evaluate(() => {
      const testQuirks = {
        scrollBehavior: 'scrollBehavior' in document.documentElement.style,
        smoothScrolling: CSS.supports('scroll-behavior', 'smooth'),
        stickyPositioning: CSS.supports('position', 'sticky'),
        cssGrid: CSS.supports('display', 'grid'),
        cssCustomProperties: CSS.supports('--test', 'value'),
        intersectionObserver: 'IntersectionObserver' in window,
        resizeObserver: 'ResizeObserver' in window
      };

      return testQuirks;
    });

    // Modern features should be supported in current browsers
    expect(quirks.cssCustomProperties).toBeTruthy();
    expect(quirks.intersectionObserver).toBeTruthy();

    // Handle browser-specific features
    if (browserName === 'webkit') {
      // Safari-specific tests
      const safariFeatures = await page.evaluate(() => ({
        webkitAppearance: 'webkitAppearance' in document.documentElement.style,
        webkitTransform: 'webkitTransform' in document.documentElement.style
      }));
      console.log(`Safari-specific features:`, safariFeatures);
    }

    if (browserName === 'firefox') {
      // Firefox-specific tests
      const firefoxFeatures = await page.evaluate(() => ({
        mozAppearance: 'mozAppearance' in document.documentElement.style
      }));
      console.log(`Firefox-specific features:`, firefoxFeatures);
    }

    console.log(`✓ Browser quirks handled for ${browserName}`);
  });
});
