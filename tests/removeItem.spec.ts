import { expect, test } from '@playwright/test';
import { addNewMenuItem, click } from './helpers';

test.describe('RemoveItem', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Should remove an Item', async ({ page }) => {
    click(page, 'add-menu-item-button');
    await page.waitForSelector('[data-testid="add-menu-item-button"]', {
      state: 'visible',
    });
    addNewMenuItem(page, 'google', 'https://www.google.com');

    await expect(
      page.locator('div[role="alert"]:has-text("Pozycja dodana")')
    ).toBeVisible();

    await page.evaluate(() => {
      const toast = document.querySelector('.Toastify__toast-container');
      if (toast) {
        (toast as HTMLElement).style.pointerEvents = 'none';
      }
    });

    click(page, 'remove-item');
  });
});
