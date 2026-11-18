import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Store } from "lucide-react";

export const instant = false;

type MenuItem = {
  id: number;
  name: string;
  vendor: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Margherita Pizza",
    vendor: "Pizza Palace",
    description:
      "Classic pizza with tomato sauce, mozzarella and fresh basil.",
    price: 450,
    category: "Classic",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1000",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    vendor: "Italian Pizza House",
    description:
      "Loaded with spicy pepperoni and melted mozzarella cheese.",
    price: 550,
    category: "Classic",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=1000",
  },
  {
    id: 3,
    name: "BBQ Chicken Pizza",
    vendor: "Food Corner",
    description:
      "Smoky BBQ chicken with onion, cheese and special sauce.",
    price: 650,
    category: "Chicken",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000",
  },
  {
    id: 4,
    name: "Vegetable Pizza",
    vendor: "Green Kitchen",
    description:
      "Fresh vegetables, mozzarella and delicious tomato sauce.",
    price: 400,
    category: "Vegetarian",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1000",
  },
  {
    id: 5,
    name: "Chicken Supreme",
    vendor: "Pizza Palace",
    description:
      "A delicious combination of chicken, peppers, onion and cheese.",
    price: 700,
    category: "Chicken",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000",
  },
  {
    id: 6,
    name: "Four Cheese Pizza",
    vendor: "Italian Pizza House",
    description:
      "Rich and creamy pizza made with four different cheeses.",
    price: 750,
    category: "Cheese",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1000",
  },
];

export default async function MenuDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = menuItems.find(
    (menuItem) => menuItem.id === Number(id)
  );

  if (!item) {
    return (
      <main className="min-h-screen bg-orange-50 px-5 py-12">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Menu Item Not Found
          </h1>

          <p className="mt-2 text-gray-500">
            The menu item you are looking for does not exist.
          </p>

          <Link
            href="/menu"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white"
          >
            <ArrowLeft size={18} />
            Back to Menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/menu"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-gray-600 transition hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back to Menu
        </Link>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="grid min-h-80 grid-cols-3 gap-2 bg-orange-50 p-2 md:min-h-120 md:grid-cols-1">
              {[item.image, item.image.replace("w=1000", "w=900"), item.image.replace("w=1000", "w=800")].map((image, index) => (
                <div key={image} className={`relative overflow-hidden rounded-2xl ${index === 0 ? "col-span-3 md:col-span-1 md:row-span-2" : ""}`}>
                  <Image
                    src={image}
                    alt={`${item.name} view ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center p-8 md:p-12">
              <span className="w-fit rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
                {item.category}
              </span>

              <h1 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl">
                {item.name}
              </h1>

              <div className="mt-4 flex items-center gap-2 text-gray-600">
                <Store size={19} className="text-primary" />
                <span>{item.vendor}</span>
              </div>

              <p className="mt-6 leading-7 text-gray-600">
                {item.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-gray-600">
                <MapPin size={19} className="text-primary" />
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="mt-8 flex items-center justify-between border-t pt-6">
                <div>
                  <p className="text-sm text-gray-500">
                    Price
                  </p>

                  <p className="text-3xl font-bold text-primary">
                    ৳{item.price}
                  </p>
                </div>

                <Link
                  href={`/menu/${item.id}/order`}
                  className="rounded-xl bg-primary px-6 py-3 font-bold text-white transition hover:bg-red-700"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}