// shop/page.tsx
import { Suspense } from "react";
import { Navbar } from '@/components/Navbar';
import { ProductGrid } from '@/components/ProductGrid';
import { getProducts } from '@/lib/api';
import { NavbarLoading } from '@/components/NavbarLoading';
import { ProductGridLoading } from "@/components/ProductGridLoading";

export default async function ShopPage({
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
      <Suspense fallback={<NavbarLoading />}>
        <Navbar />
      </Suspense>
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">All Products</h1>
        <Suspense fallback={<ProductGridLoading />}>
          <ProductGrid products={filteredProducts} />
        </Suspense>
      </main>
    </div>
  );
}