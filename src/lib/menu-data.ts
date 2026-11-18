export const CATEGORIES = [
  "Classic Pizzas",
  "Vegetarian Pizzas",
  "Meat Lovers",
  "Specialty / Gourmet Pizzas",
  "Sides & Appetizers",
  "Beverages & Desserts",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const LOCATIONS = ["Dhanmondi", "Gulshan", "Mirpur", "Uttara", "Banani"];

export type MenuItem = {
  id: number;
  vendorId: string;
  vendor: string;
  premium: boolean;
  name: string;
  description: string;
  price: number;
  category: Category;
  location: string;
  images: string[];
  status: "pending" | "approved" | "rejected" | "inactive";
};

const U = (id: string) => `https://images.unsplash.com/photo-${id}?w=900`;
const POOL = [
  U("1579751626657-72bc17010498"),
  U("1628840042765-356cda07504e"),
  U("1513104890138-7c749659a591"),
  U("1574071318508-1cdbab80d002"),
  U("1565299624946-b28f40a0ae38"),
];
const imgs = (i: number) => [0, 1, 2].map((n) => POOL[(i + n) % POOL.length]);

export const menuItems: MenuItem[] = [
  { id: 1, vendorId: "v1", vendor: "Pizza Palace", premium: true, name: "Margherita Pizza", description: "Classic pizza with tomato sauce, mozzarella and fresh basil.", price: 450, category: "Classic Pizzas", location: "Dhanmondi", images: imgs(0), status: "approved" },
  { id: 2, vendorId: "v2", vendor: "Italian Pizza House", premium: false, name: "Pepperoni Pizza", description: "Loaded with spicy pepperoni and melted mozzarella cheese.", price: 550, category: "Meat Lovers", location: "Gulshan", images: imgs(1), status: "approved" },
  { id: 3, vendorId: "v3", vendor: "Food Corner", premium: false, name: "BBQ Chicken Pizza", description: "Smoky BBQ chicken with onion, cheese and special sauce.", price: 650, category: "Meat Lovers", location: "Mirpur", images: imgs(2), status: "approved" },
  { id: 4, vendorId: "v4", vendor: "Green Kitchen", premium: false, name: "Vegetable Pizza", description: "Fresh vegetables, mozzarella and delicious tomato sauce.", price: 400, category: "Vegetarian Pizzas", location: "Dhanmondi", images: imgs(3), status: "approved" },
  { id: 5, vendorId: "v1", vendor: "Pizza Palace", premium: true, name: "Chicken Supreme", description: "Chicken, peppers, onion and cheese on a gourmet base.", price: 700, category: "Specialty / Gourmet Pizzas", location: "Uttara", images: imgs(4), status: "approved" },
  { id: 6, vendorId: "v2", vendor: "Italian Pizza House", premium: false, name: "Four Cheese Pizza", description: "Rich and creamy pizza made with four different cheeses.", price: 750, category: "Specialty / Gourmet Pizzas", location: "Gulshan", images: imgs(0), status: "approved" },
  { id: 7, vendorId: "v3", vendor: "Food Corner", premium: false, name: "Garlic Cheese Bread", description: "Warm garlic bread topped with melted cheese.", price: 220, category: "Sides & Appetizers", location: "Banani", images: imgs(1), status: "approved" },
  { id: 8, vendorId: "v4", vendor: "Sweet Oven", premium: false, name: "Chocolate Lava Cake", description: "Warm chocolate cake with a molten centre.", price: 280, category: "Beverages & Desserts", location: "Banani", images: imgs(2), status: "approved" },
];

// Only approved items are public. Premium vendors are listed first (featured placement).
export const getPublicItems = () => menuItems.filter((i) => i.status === "approved");
export const getFeaturedItems = () =>
  [...getPublicItems()].sort((a, b) => Number(b.premium) - Number(a.premium)).slice(0, 6);
export const getItem = (id: number) => menuItems.find((i) => i.id === id);