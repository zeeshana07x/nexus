// [category]/page.tsx
import { Navbar } from '@/components/Navbar';
import { ProductGrid } from '@/components/ProductGrid';
import { getProducts } from '@/lib/api';
import { Product } from '@/types/product';

interface PageProps {
  params: {
    category: string;
  };
  searchParams: {
    q?: string;
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const initialProducts: Product[] = await getProducts();
  const searchQuery = searchParams.q?.toLowerCase() ?? '';
  const category = params.category.replace(/-/g, ' ');

  // Filter products by category and search query
  const filteredProducts = initialProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery);
    const matchesCategory = product.category.toLowerCase() === category.toLowerCase(); // Added toLowerCase() for case-insensitive comparison
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
        <ProductGrid products={filteredProducts} />
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const products: Product[] = await getProducts();
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  return categories.map(category => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}