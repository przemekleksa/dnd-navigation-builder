import { Page } from '@playwright/test';

export const click = async (page: Page, testId: string): Promise<void> => {
  await page.click(`[data-testid="${testId}"]`);
};

export const addNewMenuItem = async (page: any, name: string, link: string) => {
  await page.fill('input#name', name);
  await page.fill('input[placeholder="Wklej lub wyszukaj"]', link);
  await page.click('[data-testid="submit-button"]');
};
