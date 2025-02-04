"use client";

import { Navbar } from "@/components/Navbar";
import { useCartStore } from "@/lib/cart-store";
import Link from "next/link";
import Image from "next/image";

// Define your own Button component
function Button({
  className = "",
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`py-2 px-4 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const total = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        {/* Main Cart Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link href="/shop" className="text-indigo-600 hover:text-indigo-700">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              {/* Section Header for Items */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Cart Items
              </h2>
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b py-6">
                  <Image
                    src={item.imagePath}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">${item.price}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center text-gray-800">
                          {item.quantity}
                        </span>
                        <Button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between mb-4">
                <span className="text-gray-800">
                  Subtotal ({items.length} items)
                </span>
                <span className="text-gray-800">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-gray-800">Shipping</span>
                <span className="text-gray-600">
                  Calculated at checkout
                </span>
              </div>
              <div className="flex justify-between font-semibold mb-6">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full mb-4">Checkout</Button>
              <Button className="w-full" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
