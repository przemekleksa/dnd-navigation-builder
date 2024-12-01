import test, { expect } from '@playwright/test';
import { addNewMenuItem, click } from './helpers';

test.describe('Add Subchild', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Should add an item and the add a child to this item', async ({
    page,
  }) => {
    click(page, 'add-menu-item-button');
    await page.waitForSelector('[data-testid="add-menu-item-button"]', {
      state: 'visible',
    });
    addNewMenuItem(page, 'google', 'https://www.google.com');

    await expect(
      page.locator('div[role="alert"]:has-text("Pozycja dodana")')
    ).toBeVisible();

    const closeButton = page.locator('.Toastify__close-button');
    await closeButton.click();

    const nameLabel = page.locator('[data-testid="item-name"]');
    await expect(nameLabel).toHaveText('google');

    const linkLabel = page.locator('[data-testid="item-link"]');
    await expect(linkLabel).toHaveText('https://www.google.com');

    click(page, 'add-sub-child');
    await page.waitForTimeout(1000);

    await page.fill('input#name', 'WP');
    await page.fill(
      'input[placeholder="Wklej lub wyszukaj"]',
      'https://www.wp.pl'
    );

    click(page, 'submit-button');

    const name = page.locator('[data-testid="item-name"]').nth(1);
    console.log(name);
    await expect(name).toHaveText('WP');

    const link = page.locator('[data-testid="item-link"]').nth(1);
    await expect(link).toHaveText('https://www.wp.pl');
  });
});
