import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  Store,
  ClipboardList,
} from "lucide-react";

type OrderStatus = "Pending" | "Accepted" | "Rejected" | "Cancelled";

interface OrderDetailsProps {
  itemName: string;
  image: string;
  vendor: string;
  deliveryDate: string;
  deliveryAddress: string;
  requestDate: string;
  status: OrderStatus;
}

export default function OrderDetails({
  itemName,
  image,
  vendor,
  deliveryDate,
  deliveryAddress,
  requestDate,
  status,
}: OrderDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="relative h-64 w-full">
          <Image
            src={image}
            alt={itemName}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {itemName}
              </h2>

              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <Store size={17} />
                <span>{vendor}</span>
              </div>
            </div>

            <span
              className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                status === "Accepted"
                  ? "bg-green-100 text-green-700"
                  : status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : status === "Cancelled"
                      ? "bg-gray-100 text-gray-600"
                      : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {status}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <ClipboardList className="text-orange-500" size={20} />

          <h2 className="text-lg font-bold text-gray-900">
            Order Information
          </h2>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <CalendarDays
              size={19}
              className="mt-0.5 shrink-0 text-orange-500"
            />

            <div>
              <p className="text-sm font-semibold text-gray-800">
                Delivery Date
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {deliveryDate}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarDays
              size={19}
              className="mt-0.5 shrink-0 text-orange-500"
            />

            <div>
              <p className="text-sm font-semibold text-gray-800">
                Request Date
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {requestDate}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:col-span-2">
            <MapPin
              size={19}
              className="mt-0.5 shrink-0 text-orange-500"
            />

            <div>
              <p className="text-sm font-semibold text-gray-800">
                Delivery Address
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {deliveryAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}