/** Shared menu categories and location suggestions used across the UI.
 *  The category values match `CATEGORIES` on the server (src/constants.js),
 *  which also serves them at GET /api/menu/categories. The server rejects
 *  unknown categories with a 400, so these must stay in sync. */

export const CATEGORIES = [
  "Classic Pizzas",
  "Vegetarian Pizzas",
  "Meat Lovers",
  "Specialty / Gourmet Pizzas",
  "Sides & Appetizers",
  "Beverages & Desserts",
] as const;
export type Category = (typeof CATEGORIES)[number];

/** Suggested areas. The Browse Menu page also merges in any location the API returns. */
export const LOCATIONS = ["Dhanmondi", "Gulshan", "Mirpur", "Uttara", "Banani"];
