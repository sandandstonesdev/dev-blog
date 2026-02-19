import { test, expect } from '@playwright/test';

test.describe('Cookies Consent Banner', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/');
  });

  test.describe('Cookie Banner Visibility', () => {
    test('should display analytics and telemetry checkboxes', async ({ page }) => {
      await expect(page.getByRole('checkbox', { name: /Analytics cookies/i })).toBeVisible();
      await expect(page.getByRole('checkbox', { name: /Telemetry cookies/i })).toBeVisible();
    });

    test('should display save preferences and decline buttons', async ({ page }) => {
      await expect(page.getByRole('button', { name: /Save Preferences/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Decline/i })).toBeVisible();
    });
  });

  test.describe('Analytics Cookie Consent', () => {
    test('should set analytics cookie when checkbox is checked and accepted', async ({ page, context }) => {
      await page.getByRole('checkbox', { name: /Analytics cookies/i }).check();
      await page.getByRole('button', { name: /Save Preferences/i }).click();

      const cookies = await context.cookies();
      const analyticsCookie = cookies.find(c => c.name === 'analyticsConsent');
      expect(analyticsCookie).toBeDefined();
      expect(analyticsCookie?.value).toBe('true');
    });

    test('should not set analytics cookie when checkbox is unchecked', async ({ page, context }) => {
      await page.getByRole('button', { name: /Save Preferences/i }).click();

      const cookies = await context.cookies();
      const analyticsCookie = cookies.find(c => c.name === 'analyticsConsent');
      expect(analyticsCookie?.value).toBe('false');
    });
  });

  test.describe('Telemetry Cookie Consent', () => {
    test('should set telemetry cookie when checkbox is checked and accepted', async ({ page, context }) => {
      await page.getByRole('checkbox', { name: /Telemetry cookies/i }).check();
      await page.getByRole('button', { name: /Save Preferences/i }).click();

      const cookies = await context.cookies();
      const telemetryCookie = cookies.find(c => c.name === 'telemetryConsent');
      expect(telemetryCookie).toBeDefined();
      expect(telemetryCookie?.value).toBe('true');
    });

    test('should not set telemetry cookie when checkbox is unchecked', async ({ page, context }) => {
      await page.getByRole('button', { name: /Save Preferences/i }).click();

      const cookies = await context.cookies();
      const telemetryCookie = cookies.find(c => c.name === 'telemetryConsent');
      expect(telemetryCookie?.value).toBe('false');
    });
  });

  test.describe('Both Cookies Consent', () => {
    test('should set both cookies when both checkboxes are checked', async ({ page, context }) => {
      await page.getByRole('checkbox', { name: /Analytics cookies/i }).check();
      await page.getByRole('checkbox', { name: /Telemetry cookies/i }).check();
      await page.getByRole('button', { name: /Save Preferences/i }).click();

      const cookies = await context.cookies();
      const analyticsCookie = cookies.find(c => c.name === 'analyticsConsent');
      const telemetryCookie = cookies.find(c => c.name === 'telemetryConsent');

      expect(analyticsCookie?.value).toBe('true');
      expect(telemetryCookie?.value).toBe('true');
    });
  });

  test.describe('Reject Cookies', () => {
    test('should not set any cookies when decline is clicked', async ({ page, context }) => {
      await page.getByRole('button', { name: /Decline/i }).click();

      const cookies = await context.cookies();
      // Only allow essential cookies (if any), otherwise expect none
      const nonEssential = cookies.filter(
        c => c.name === 'analyticsConsent' || c.name === 'telemetryConsent'
      );
      expect(nonEssential.length).toBe(0);
    });
  });
});