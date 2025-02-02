// components/ProductGrid.tsx
import { ProductCard } from './ProductCard';
import { Product } from '@/types/product';

export function ProductGrid({ products }: { products: Product[] }) {
  if (!Array.isArray(products)) {
    return <div>No products available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}