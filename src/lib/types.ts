export type MenuItemStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "inactive";

export type OrderStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "cancelled";

export type Role = "admin" | "vendor" | "customer";

export type VendorSummary = {
  id: string;
  name: string;
  businessName?: string | null;
  image?: string | null;
  subscriptionPlan?: "free" | "premium";
};

export type MenuItem = {
  id: string;
  itemName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  status: MenuItemStatus;
  vendorId: string;
  createdAt?: string;
  vendor?: VendorSummary;
  isPremiumVendor?: boolean;
};

export type Order = {
  id: string;
  itemId: string;
  vendorId: string;
  customerId: string;
  deliveryDate: string;
  deliveryAddress: string;
  message?: string;
  status: OrderStatus;
  createdAt: string;
  item?: {
    id?: string;
    itemName: string;
    images: string[];
    price: number;
    category: string;
    location: string;
  };
  vendor?: VendorSummary;
  customer?: {
    id?: string;
    name: string;
    email: string;
    image?: string | null;
  };
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: Role;
  isBlocked: boolean;
  businessName?: string | null;
  subscriptionPlan: "free" | "premium";
  subscriptionExpiresAt?: string | null;
  createdAt?: string;
};

export type Transaction = {
  id: string;
  vendorId: string;
  plan: string;
  amount: number;
  currency: string;
  stripeSessionId: string;
  stripeSubscriptionId?: string | null;
  status: string;
  createdAt: string;
  vendor?: {
    id?: string;
    name?: string;
    email?: string;
    businessName?: string | null;
  };
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Paged<T> = { items: T[]; pagination: Pagination };

export type VendorOverview = {
  totalMenuItems: number;
  activeMenuItems: number;
  pendingOrders: number;
  acceptedOrders: number;
  subscriptionPlan: "free" | "premium";
  subscriptionExpiresAt?: string | null;
  weeklyOrders: { date: string; count: number }[];
};

export type CustomerOverview = {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
  cancelled: number;
};

export type AdminOverview = {
  totalUsers: number;
  totalVendors: number;
  totalCustomers: number;
  totalMenuItems: number;
  pendingMenuItems: number;
  totalTransactions: number;
};

export type SubscriptionInfo = {
  plan: "free" | "premium";
  expiresAt?: string | null;
  activeItems: number;
  activeItemLimit: number | null;
};
