import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import OrderDetails from "@/components/dashboard/customer/order-details";

export const instant = false;

const orders = [
  {
    id: 1,
    itemName: "Margherita Pizza",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500",
    vendor: "Pizza Palace",
    deliveryDate: "2026-11-20",
    deliveryAddress: "Dhanmondi, Dhaka",
    requestDate: "2026-11-18",
    status: "Pending" as const,
  },
  {
    id: 2,
    itemName: "Pepperoni Pizza",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500",
    vendor: "Italian Pizza House",
    deliveryDate: "2026-11-19",
    deliveryAddress: "Uttara, Dhaka",
    requestDate: "2026-11-17",
    status: "Accepted" as const,
  },
  {
    id: 3,
    itemName: "BBQ Chicken Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
    vendor: "Food Corner",
    deliveryDate: "2026-11-21",
    deliveryAddress: "Mirpur, Dhaka",
    requestDate: "2026-11-16",
    status: "Rejected" as const,
  },
];

export default async function CustomerOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = orders.find((item) => item.id === Number(id));

  if (!order) {
    return (
      <DashboardShell role="customer">
        <div className="space-y-5">
          <Link
            href="/dashboard/customer/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft size={17} />
            Back to My Orders
          </Link>

          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <h1 className="text-xl font-bold text-gray-900">
              Order Not Found
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              The requested order could not be found.
            </p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell role="customer">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <Link
            href="/dashboard/customer/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft size={17} />
            Back to My Orders
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Order Details
          </h1>

          <p className="mt-2 text-gray-500">
            View your order information and current status.
          </p>
        </div>

        <OrderDetails
          itemName={order.itemName}
          image={order.image}
          vendor={order.vendor}
          deliveryDate={order.deliveryDate}
          deliveryAddress={order.deliveryAddress}
          requestDate={order.requestDate}
          status={order.status}
        />
      </div>
    </DashboardShell>
  );
}