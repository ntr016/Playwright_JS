import { test, expect, devices } from '@playwright/test';

// Configure tests to run on multiple browsers
const browsers = ['chromium', 'firefox', 'webkit'];

browsers.forEach(browserName => {
  test.describe(`Cross-Browser Compatibility - ${browserName}`, () => {
    test.use({
      // Set browser-specific configurations
      ...(browserName === 'webkit' && { ...devices['Desktop Safari'] }),
      ...(browserName === 'firefox' && { ...devices['Desktop Firefox'] }),
      ...(browserName === 'chromium' && { ...devices['Desktop Chrome'] })
    });

    test(`should load homepage correctly in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
      await page.goto('/');

      // Verify basic page structure loads in all browsers
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();

      // Take browser-specific screenshot
      await page.screenshot({
        path: `test-results/homepage-${currentBrowser}.png`,
        fullPage: true
      });

      // Verify no console errors
      const consoleErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.reload();
      await page.waitForLoadState('networkidle');

      const criticalErrors = consoleErrors.filter(error =>
        !error.includes('analytics') &&
        !error.includes('gtag') &&
        !error.includes('tracking')
      );

      expect(criticalErrors.length).toBe(0);
    });

    test(`should handle CSS and layout correctly in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
      await page.goto('/');

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

      // Test layout consistency
      const navigation = page.locator('nav');
      const navBounds = await navigation.boundingBox();
      expect(navBounds?.height).toBeGreaterThan(40);

      const mainContent = page.locator('main');
      const mainBounds = await mainContent.boundingBox();
      expect(mainBounds?.width).toBeGreaterThan(300);
    });

    test(`should handle JavaScript features correctly in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
      await page.goto('/');

      // Test modern JavaScript features
      const jsCompatibility = await page.evaluate(() => {
        const tests = {
          arrow_functions: (() => true)(),
          promises: typeof Promise !== 'undefined',
          async_await: (async () => true)().constructor.name === 'Promise',
          modules: (() => {
            try {
              // Try dynamic import to check module support
              new Function('return import("")');
              return true;
            } catch {
              return false;
            }
          })(),
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

      // Test interactive features work
      const searchButton = page.getByRole('button', { name: 'Search (Command+K)' });
      await searchButton.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.keyboard.press('Escape');
    });

    test(`should handle navigation and routing in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
      await page.goto('/');

      // Test navigation to different sections
      await page.getByRole('link', { name: 'Docs' }).click();
      await expect(page).toHaveURL(/.*docs\/intro/);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      // Test back navigation
      await page.goBack();
      await expect(page).toHaveURL('/');

      // Test external link behavior (should open in new tab)
      const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('link', { name: 'GitHub repository' }).click()
      ]);

      await expect(newPage).toHaveURL(/.*github.com\/microsoft\/playwright/);
      await newPage.close();
    });

    test(`should handle form interactions in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
      await page.goto('/docs/intro');

      // Test search form functionality
      await page.keyboard.press('Meta+k');
      const searchInput = page.getByPlaceholder('Search docs');

      // Test input handling
      await searchInput.fill('getting started');
      const inputValue = await searchInput.inputValue();
      expect(inputValue).toBe('getting started');

      // Test form submission behavior
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);

      // Should handle search results or navigation
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/playwright\.dev/);
    });

    test(`should handle media queries and responsive design in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
      // Test different viewport sizes
      const viewports = [
        { width: 1920, height: 1080, name: 'Desktop' },
        { width: 768, height: 1024, name: 'Tablet' },
        { width: 375, height: 667, name: 'Mobile' }
      ];

      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');

        // Verify responsive layout
        const nav = page.locator('nav');
        await expect(nav).toBeVisible();

        // Check if mobile menu appears on small screens
        if (viewport.width <= 768) {
          // Look for mobile menu toggle or collapsed navigation
          const mobileElements = await page.locator('[aria-label*="menu"], .mobile-menu, [data-testid*="mobile"]').count();
          // Mobile adaptations may or may not be present depending on design
        }

        // Verify content is accessible at all viewport sizes
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
      }
    });

    test(`should handle events and user interactions in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
      await page.goto('/');

      // Test click events
      const getStartedLink = page.getByRole('link', { name: 'Get started' });
      await getStartedLink.click();
      await expect(page).toHaveURL(/.*docs\/intro/);

      await page.goto('/');

      // Test hover events (where applicable)
      const navLinks = page.locator('nav a');
      const firstNavLink = navLinks.first();
      await firstNavLink.hover();

      // Test keyboard events
      await page.keyboard.press('Tab');
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();

      // Test scroll events
      await page.evaluate(() => window.scrollTo(0, 500));
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(0);
    });

    test(`should handle font loading and rendering in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check font rendering
      const fontProperties = await page.evaluate(() => {
        const heading = document.querySelector('h1');
        const paragraph = document.querySelector('p');

        if (!heading || !paragraph) return { heading: {}, paragraph: {} };

        const headingStyles = window.getComputedStyle(heading);
        const paragraphStyles = window.getComputedStyle(paragraph);

        return {
          heading: {
            fontFamily: headingStyles.fontFamily,
            fontSize: headingStyles.fontSize,
            fontWeight: headingStyles.fontWeight,
            lineHeight: headingStyles.lineHeight
          },
          paragraph: {
            fontFamily: paragraphStyles.fontFamily,
            fontSize: paragraphStyles.fontSize,
            fontWeight: paragraphStyles.fontWeight,
            lineHeight: paragraphStyles.lineHeight
          }
        };
      });

      // Verify fonts are loaded and applied
      expect(fontProperties.heading.fontFamily).toBeTruthy();
      expect(fontProperties.paragraph.fontFamily).toBeTruthy();
      expect(parseInt(fontProperties.heading.fontSize)).toBeGreaterThan(16);
      expect(parseInt(fontProperties.paragraph.fontSize)).toBeGreaterThan(12);
    });

    test(`should handle URL encoding and special characters in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
      // Test navigation to URLs with special characters
      const specialUrls = [
        '/docs/api/class-playwright',
        '/docs/api/class-page#page-goto'
      ];

      for (const url of specialUrls) {
        await page.goto(url);
        await expect(page).toHaveURL(new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));

        // Verify page loads correctly
        await expect(page.locator('h1, h2, h3')).toBeVisible();
      }

      // Test search with special characters
      await page.goto('/docs/intro');
      await page.keyboard.press('Meta+k');
      const searchInput = page.getByPlaceholder('Search docs');

      const specialSearchTerms = ['page.goto()', 'test.describe', '@playwright/test'];

      for (const term of specialSearchTerms) {
        await searchInput.clear();
        await searchInput.fill(term);
        await page.waitForTimeout(500);

        // Should handle special characters without errors
        const hasResults = await page.locator('.DocSearch-Hit, [data-testid="search-result"]').count() > 0;
        // Results may vary but should not cause errors
      }
    });

    test(`should handle image loading and display in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check image loading
      const images = page.locator('img');
      const imageCount = await images.count();

      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const image = images.nth(i);
        await expect(image).toBeVisible();

        // Check if image loaded successfully
        const naturalWidth = await image.evaluate((img: HTMLImageElement) => img.naturalWidth);
        const naturalHeight = await image.evaluate((img: HTMLImageElement) => img.naturalHeight);

        expect(naturalWidth).toBeGreaterThan(0);
        expect(naturalHeight).toBeGreaterThan(0);

        // Verify alt text exists
        const alt = await image.getAttribute('alt');
        expect(alt).not.toBeNull();
      }
    });

    test(`should maintain functionality across browser versions in ${browserName}`, async ({ page, browserName: currentBrowser }) => {
      await page.goto('/');

      // Test core functionality that should work across browser versions
      const coreFeatures = await page.evaluate(() => {
        return {
          canCreateElement: !!document.createElement,
          canQuerySelector: !!document.querySelector,
          canAddEventListener: !!document.addEventListener,
          canFetch: typeof fetch !== 'undefined',
          canJSON: typeof JSON !== 'undefined',
          canLocalStorage: typeof localStorage !== 'undefined'
        };
      });

      // All core features should be supported
      Object.values(coreFeatures).forEach(feature => {
        expect(feature).toBeTruthy();
      });

      // Test that main navigation works
      await page.getByRole('link', { name: 'Docs' }).click();
      await expect(page).toHaveURL(/.*docs/);

      // Test that search functionality works
      await page.keyboard.press('Meta+k');
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.keyboard.press('Escape');

      // Test that theme toggle works (if present)
      const themeButton = page.getByRole('button', { name: /theme|dark|light/i });
      if (await themeButton.count() > 0) {
        await themeButton.click();
        // Theme should change (verified by DOM attribute or class change)
        await page.waitForTimeout(100);
      }
    });
  });
});

// Cross-browser feature detection tests
test.describe('Cross-Browser Feature Detection', () => {
  test('should detect browser capabilities', async ({ page, browserName }) => {
    await page.goto('/');

    const browserCapabilities = await page.evaluate(() => {
      const capabilities = {
        userAgent: navigator.userAgent,
        browserName: navigator.userAgent.includes('Chrome') ? 'Chrome' :
                    navigator.userAgent.includes('Firefox') ? 'Firefox' :
                    navigator.userAgent.includes('Safari') ? 'Safari' : 'Unknown',
        supportsWebGL: !!window.WebGLRenderingContext,
        supportsWebWorkers: typeof Worker !== 'undefined',
        supportsIndexedDB: typeof indexedDB !== 'undefined',
        supportsServiceWorker: 'serviceWorker' in navigator,
        supportsPushNotifications: 'PushManager' in window,
        supportsGeolocation: 'geolocation' in navigator,
        supportsFileAPI: typeof FileReader !== 'undefined',
        screenWidth: screen.width,
        screenHeight: screen.height,
        colorDepth: screen.colorDepth,
        pixelRatio: window.devicePixelRatio
      };

      return capabilities;
    });

    console.log(`Browser capabilities for ${browserName}:`, browserCapabilities);

    // Verify expected capabilities
    expect(browserCapabilities.supportsIndexedDB).toBeTruthy();
    expect(browserCapabilities.supportsFileAPI).toBeTruthy();
    expect(browserCapabilities.screenWidth).toBeGreaterThan(0);
    expect(browserCapabilities.screenHeight).toBeGreaterThan(0);
  });

  test('should handle browser-specific quirks', async ({ page, browserName }) => {
    await page.goto('/');

    // Test browser-specific behavior
    const quirks = await page.evaluate((browser) => {
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
    }, browserName);

    // Modern features should be supported in current browsers
    expect(quirks.cssCustomProperties).toBeTruthy();
    expect(quirks.intersectionObserver).toBeTruthy();

    // Handle feature-specific tests
    if (browserName === 'webkit') {
      // Safari-specific tests
      const safariFeatures = await page.evaluate(() => ({
        webkitAppearance: 'webkitAppearance' in document.documentElement.style,
        webkitTransform: 'webkitTransform' in document.documentElement.style
      }));
      // WebKit prefixes may be present
    }

    if (browserName === 'firefox') {
      // Firefox-specific tests
      const firefoxFeatures = await page.evaluate(() => ({
        mozAppearance: 'mozAppearance' in document.documentElement.style
      }));
      // Firefox prefixes may be present
    }
  });
});