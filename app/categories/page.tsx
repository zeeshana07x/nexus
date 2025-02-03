import { Navbar } from '@/components/Navbar';
import { ProductGrid } from '@/components/ProductGrid';
import { getProducts } from '@/lib/api';

import { Product } from '@/types/product';

// Use the correct type for Next.js 13+ app router page props
export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const initialProducts = await getProducts() as Product[];
  const searchQuery = (
    typeof searchParams.q === 'string' ? searchParams.q : ''
  ).toLowerCase();

  const filteredProducts = initialProducts.filter((product: Product) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Product Categories</h1>
        <ProductGrid products={filteredProducts} />
      </main>
    </div>
  );
}