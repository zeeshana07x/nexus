// components/Navbar.tsx
import Link from 'next/link';
import { Search, ShoppingCart } from 'lucide-react'; // Lucide icons

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">Nexus</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">
              Home
            </Link>
            <Link href="/shop" className="text-gray-600 hover:text-indigo-600">
              Shop
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-indigo-600">
              Categories
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-indigo-600">
              About
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-6 h-6 text-gray-600" /> {/* Lucide Search icon */}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart className="w-6 h-6 text-gray-600" /> {/* Lucide ShoppingCart icon */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}