import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const fixturesDir = path.resolve("tests/fixtures");
const restaurantsFixture = fs.readFileSync(
  path.join(fixturesDir, "restaurants.json"),
  "utf-8"
);
const menuFixture = fs.readFileSync(
  path.join(fixturesDir, "menu.json"),
  "utf-8"
);

test.beforeEach(async ({ page }) => {
  await page.route("**/dapi/restaurants/list/v5**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: restaurantsFixture,
    });
  });

  await page.route("**/dapi/menu/pl**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: menuFixture,
    });
  });
});

test("home loads with restaurants and filters", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /discover food/i })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: /restaurants with online food delivery/i })
  ).toBeVisible();

  const cards = page.locator('a:has-text("Saffron Street")');
  await expect(cards.first()).toBeVisible();

  await expect(page.getByPlaceholder("Search restaurants...")).toBeVisible();
  await expect(page.getByText("Show Saved")).toBeVisible();
});

test("search filters restaurants", async ({ page }) => {
  await page.goto("/");

  const search = page.getByPlaceholder("Search restaurants...");
  await search.fill("Green Bowl");

  await expect(page.getByText("Green Bowl Co.")).toBeVisible();
  await expect(page.getByText("Saffron Street")).not.toBeVisible();
});

const openMenu = async (page) => {
  await page.goto("/");
  const restaurantLink = page
    .locator('a:has-text("Saffron Street")')
    .first();
  await restaurantLink.scrollIntoViewIfNeeded();
  await restaurantLink.click({ force: true });
  await expect(
    page.getByRole("heading", { name: /saffron street/i })
  ).toBeVisible();

  const categoryRow = page.getByText("Recommended").locator("..");
  await categoryRow.locator("svg").click();
  await expect(page.locator('[data-testid="foodItems"]').first()).toBeVisible();
};

test("navigate to menu and see items", async ({ page }) => {
  await openMenu(page);
  await expect(page.getByText("Chicken Biryani")).toBeVisible();
});

test("cart add and clear flow", async ({ page }) => {
  await openMenu(page);
  const firstItem = page.locator('[data-testid="foodItems"]').first();
  await firstItem.getByRole("button", { name: "Add to cart" }).click({ force: true });
  await page.getByRole("link", { name: /cart/i }).click();

  await expect(page.getByText("Chicken Biryani")).toBeVisible();
  await page.getByRole("button", { name: "Clear Cart" }).click();
  await expect(page.getByText(/cart is empty/i)).toBeVisible();
});

test("auth drawer opens and validates", async ({ page }) => {
  await page.goto("/");

  await page.locator('button:has-text("Sign in")').first().click();
  const drawer = page.locator('div:has(h2:text("Sign In"))').first();
  await expect(drawer).toBeVisible();

  const submitButton = drawer.locator('form button:has-text("Sign In")');
  await submitButton.scrollIntoViewIfNeeded();
  await submitButton.click({ force: true });
  await expect(page.getByText(/Email ID is not valid/i)).toBeVisible();
});

test("auth mock shows signed in state", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.setItem(
      "fooder_mock_user",
      JSON.stringify({ uid: "test-1", email: "test@demo.com", displayName: "Test User" })
    );
  });

  await page.reload();
  await expect(page.getByText("Signed in")).toBeVisible();
  if (testInfo.project.name.includes("Desktop")) {
    await expect(page.getByText("test@demo.com")).toBeVisible();
  }
});

test("performance budget - home navigation timing", async ({ page }) => {
  await page.goto("/");
  const timing = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    return {
      domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
      loadEvent: nav.loadEventEnd - nav.startTime,
    };
  });

  expect(timing.domContentLoaded).toBeLessThan(5000);
  expect(timing.loadEvent).toBeLessThan(8000);
});

test("performance budget - menu navigation", async ({ page }) => {
  await page.goto("/");
  const restaurantLink = page
    .locator('a:has-text("Saffron Street")')
    .first();
  await restaurantLink.scrollIntoViewIfNeeded();
  await restaurantLink.click({ force: true });

  const timing = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    return {
      domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
      loadEvent: nav.loadEventEnd - nav.startTime,
    };
  });

  expect(timing.domContentLoaded).toBeLessThan(5000);
  expect(timing.loadEvent).toBeLessThan(8000);
});

test("visual snapshots - mobile home/menu/cart", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  // Force mobile viewport for this test run, even on desktop project
  await page.setViewportSize({ width: 390, height: 844 });

  await expect(page).toHaveScreenshot("mobile-home.png", {
    fullPage: true,
    maxDiffPixelRatio: 0.02,
  });

  await openMenu(page);
  await expect(page).toHaveScreenshot("mobile-menu.png", {
    fullPage: true,
    maxDiffPixelRatio: 0.02,
  });

  const firstItem = page.locator('[data-testid="foodItems"]').first();
  await firstItem.getByRole("button", { name: "Add to cart" }).click({ force: true });
  await page.getByRole("link", { name: /cart/i }).click();
  await expect(page).toHaveScreenshot("mobile-cart.png", {
    fullPage: true,
    maxDiffPixelRatio: 0.02,
  });
});

test("visual snapshots - home, menu, cart", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page).toHaveScreenshot("home.png", { fullPage: true });

  await openMenu(page);
  await expect(page).toHaveScreenshot("menu.png", { fullPage: true });

  const firstItem = page.locator('[data-testid="foodItems"]').first();
  await firstItem.getByRole("button", { name: "Add to cart" }).click({ force: true });
  await page.getByRole("link", { name: /cart/i }).click();
  await expect(page).toHaveScreenshot("cart.png", { fullPage: true });
});
