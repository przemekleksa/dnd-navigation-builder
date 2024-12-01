import { expect, test } from '@playwright/test';
import { addNewMenuItem, click } from './helpers';

test.describe('EditItem', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Should Edit an Item', async ({ page }) => {
    click(page, 'add-menu-item-button');
    await page.waitForSelector('[data-testid="add-menu-item-button"]', {
      state: 'visible',
    });
    addNewMenuItem(page, 'google', 'https://www.google.com');

    await expect(
      page.locator('div[role="alert"]:has-text("Pozycja dodana")')
    ).toBeVisible();

    click(page, 'edit-item');
    await page.fill('input#name', 'Edit');
    await page.fill(
      'input[placeholder="Wklej lub wyszukaj"]',
      'https://example.com'
    );
    await page.click('[data-testid="submit-button"]');
    const nameLabel = page.locator('[data-testid="item-name"]');
    await expect(nameLabel).toHaveText('Edit');

    const linkLabel = page.locator('[data-testid="item-link"]');
    await expect(linkLabel).toHaveText('https://example.com');
  });
});
