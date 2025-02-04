import { Navbar } from "@/components/Navbar";
import { getProducts } from "@/lib/api";
import Link from "next/link";
import { Product } from "@/types/product";

export default async function CategoriesPage() {
  const products: Product[] = await getProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        {/* Main Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          All Categories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category: string) => (
            <Link
              key={category}
              href={`/categories/${category.toLowerCase().replace(/\s+/g, "-")}`}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {category}
              </h2>
              <p className="text-gray-800">
                {products.filter((p) => p.category === category).length} products
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
