import { expect, test } from '@playwright/test';
import { click } from './helpers';

test.describe('AddItem', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the form when "Dodaj pozycję menu" button is clicked', async ({
    page,
  }) => {
    click(page, 'add-menu-item-button');
    await expect(page.locator('form')).toBeVisible();
  });

  test('should allow adding a new menu item', async ({ page }) => {
    click(page, 'add-menu-item-button');

    await page.fill('input#name', 'Promocje');
    await page.fill(
      'input[placeholder="Wklej lub wyszukaj"]',
      'https://example.com'
    );

    await page.click('[data-testid="submit-button"]');

    await expect(
      page.locator('div[role="alert"]:has-text("Pozycja dodana")')
    ).toBeVisible();

    const nameLabel = page.locator('[data-testid="item-name"]');
    await expect(nameLabel).toHaveText('Promocje');

    const linkLabel = page.locator('[data-testid="item-link"]');
    await expect(linkLabel).toHaveText('https://example.com');
  });

  test('should allow reseting a form', async ({ page }) => {
    click(page, 'add-menu-item-button');

    await page.fill('input#name', 'Promocje');
    await page.fill(
      'input[placeholder="Wklej lub wyszukaj"]',
      'https://example.com'
    );

    click(page, 'form-reset');

    await page.waitForFunction(() => {
      const nameInput = document.querySelector(
        'input#name'
      ) as HTMLInputElement;
      const linkInput = document.querySelector(
        'input[placeholder="Wklej lub wyszukaj"]'
      ) as HTMLInputElement;

      return nameInput.value === '' && linkInput.value === '';
    });

    const nameValue = await page.inputValue('input#name');
    expect(nameValue).toBe('');

    const linkValue = await page.inputValue(
      'input[placeholder="Wklej lub wyszukaj"]'
    );
    expect(linkValue).toBe('');
  });

  test('should get back to empty list when canceled', async ({ page }) => {
    click(page, 'add-menu-item-button');

    await page.fill('input#name', 'Promocje');
    await page.fill(
      'input[placeholder="Wklej lub wyszukaj"]',
      'https://example.com'
    );

    click(page, 'cancel-submit-button');
    const button = page.locator('[data-testid="add-menu-item-button"]');
    await expect(button).toBeVisible();
  });
});
