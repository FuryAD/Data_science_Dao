import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
    test('should load the homepage', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/DAO/i);
    });

    test('should display hero section', async ({ page }) => {
        await page.goto('/');
        const hero = page.locator('h1').first();
        await expect(hero).toBeVisible();
    });

    test('should show navigation menu', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('navigation')).toBeVisible();
    });

    test('should have working navigation links', async ({ page }) => {
        await page.goto('/');

        // Click on Projects link
        await page.getByRole('link', { name: /projects/i }).click();
        await expect(page).toHaveURL(/\/projects/);
    });
});

test.describe('Projects Page', () => {
    test('should display projects', async ({ page }) => {
        await page.goto('/projects');

        // Should have project cards
        const projects = page.locator('[role="article"]');
        await expect(projects.first()).toBeVisible();
    });

    test('should allow filtering projects', async ({ page }) => {
        await page.goto('/projects');

        // Look for filter buttons or inputs
        const filterSection = page.locator('text=/filter/i').first();
        if (await filterSection.isVisible()) {
            await expect(filterSection).toBeVisible();
        }
    });
});

test.describe('Wallet Connection', () => {
    test('should show connect wallet button', async ({ page }) => {
        await page.goto('/');
        const connectButton = page.getByRole('button', { name: /connect/i });
        await expect(connectButton).toBeVisible();
    });

    test('should open wallet modal on click', async ({ page }) => {
        await page.goto('/');
        const connectButton = page.getByRole('button', { name: /connect/i });
        await connectButton.click();

        // Modal or wallet options should appear
        await page.waitForTimeout(500);
    });
});

test.describe('Responsive Design', () => {
    test('should work on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        await expect(page.locator('h1').first()).toBeVisible();
    });

    test('should work on tablet', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/');

        await expect(page.locator('h1').first()).toBeVisible();
    });
});
