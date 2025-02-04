"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";

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

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* Image Container */}
      <div className="relative w-full h-48">
        <Image
          src={product.imagePath}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
        <p className="text-gray-600">${product.price}</p>
        {/* The flex-grow on this paragraph pushes the button to the bottom */}
        <p className="text-sm text-gray-500 mt-2 flex-grow">
          {product.description}
        </p>
        <Button
          className="w-full mt-4"
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              imagePath: product.imagePath,
              price: product.price,
              quantity: 0,
            })
          }
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
