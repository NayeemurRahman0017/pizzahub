export type StoredOrder = {
  id: number;
  itemId: number;
  itemName: string;
  image: string;
  vendor: string;
  deliveryDate: string;
  deliveryAddress: string;
  message: string;
  requestDate: string;
  status: "Pending" | "Accepted" | "Rejected" | "Cancelled";
};

const KEY = "pizzahub-orders";

export function loadOrders(): StoredOrder[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}
const save = (o: StoredOrder[]) => localStorage.setItem(KEY, JSON.stringify(o));

export function hasActiveDuplicate(itemId: number, deliveryDate: string) {
  return loadOrders().some(
    (o) => o.itemId === itemId && o.deliveryDate === deliveryDate && (o.status === "Pending" || o.status === "Accepted")
  );
}
export function addOrder(order: StoredOrder) {
  save([order, ...loadOrders()]);
}
export function cancelStoredOrder(id: number) {
  save(loadOrders().map((o) => (o.id === id && o.status === "Pending" ? { ...o, status: "Cancelled" } : o)));
}