"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search, ShoppingCart } from 'lucide-react';

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        router.push(`${pathname}?q=${encodeURIComponent(searchQuery)}`);
      } else {
        router.push(pathname);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-indigo-600">Nexus</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-gray-600 hover:text-indigo-600 ${
                pathname === '/' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`text-gray-600 hover:text-indigo-600 ${
                pathname === '/shop' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Shop
            </Link>
            <Link
              href="/categories"
              className={`text-gray-600 hover:text-indigo-600 ${
                pathname === '/categories' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className={`text-gray-600 hover:text-indigo-600 ${
                pathname === '/about' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              About
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}