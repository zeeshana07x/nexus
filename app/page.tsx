import { Navbar } from '@/components/Navbar';
import { ProductGrid } from '@/components/ProductGrid';
import { getProducts } from '@/lib/api';

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const initialProducts = await getProducts();
  const searchQuery = searchParams.q?.toLowerCase() || '';
  const filteredProducts = initialProducts.filter((product: { name: string; }) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-lg text-gray-600">
            Shop the latest trends with unbeatable prices
          </p>
        </header>
        <ProductGrid products={filteredProducts} />
      </main>
    </div>
  );
}