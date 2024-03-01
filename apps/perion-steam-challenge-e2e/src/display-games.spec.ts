import { test, expect } from '@playwright/test';

test('should show my games', async ({ page }) => {
  await page.goto('/');

  const steamIdInput = page.getByLabel('Enter your steam Vanity Name')
  const searchButton = page.getByTestId('search')
  const gameList = page.getByTestId('game-list')
  const gameCount = page.getByTestId('game-count')

  await steamIdInput.pressSequentially('monkyyy')
  await searchButton.click()

  await expect(gameList).not.toHaveCount(0)
  await expect(gameCount).not.toHaveCount(0)
})
