// components/ProductCard.tsx
import { Product } from '@/types/product';
import Image from 'next/image';
import { Heart } from 'lucide-react'; // Optional: Add a favorite button

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={product.imagePath} // Updated from `image` to `imagePath`
        alt={product.name}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
        <p className="text-gray-600">${product.price}</p> {/* Price is a string */}
        <p className="text-sm text-gray-500 mt-2">{product.description}</p>
        <button className="mt-2 p-2 hover:bg-gray-100 rounded-full">
          <Heart className="w-5 h-5 text-gray-600" /> {/* Optional: Add a favorite button */}
        </button>
      </div>
    </div>
  );
}