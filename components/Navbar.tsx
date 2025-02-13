"use client";

import { useState, useEffect, FormEvent, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X } from "lucide-react";

export function Navbar() {
  // Declare hooks unconditionally
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const items = useCartStore((state) => state.items);

  // Run useEffect to set mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // safe to use other hooks
  const handleSearch = useCallback(
    (e: FormEvent<HTMLFormElement> | string) => {
      if (typeof e === "string") {
        const params = new URLSearchParams(searchParams.toString());
        if (e.trim()) {
          params.set("q", e.trim());
        } else {
          params.delete("q");
        }
        router.push(`${pathname}?${params.toString()}`);
      } else {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchQuery.trim()) {
          params.set("q", searchQuery.trim());
        } else {
          params.delete("q");
        }
        router.push(`${pathname}?${params.toString()}`);
      }
    },
    [searchParams, router, pathname, searchQuery]
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, handleSearch]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Now perform the conditional return
  if (!mounted) return null;

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      className={`text-gray-600 hover:text-indigo-600 ${
        pathname === href ? "text-indigo-600 font-semibold" : ""
      }`}
    >
      {children}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-indigo-600">Nexus</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/shop">Shop</NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>

          {/* Desktop Search and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 text-slate-700 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <button type="submit" className="sr-only">
                Search
              </button>
            </form>
            {/* Updated Cart Button with visible text */}
            <Link
              href="/cart"
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full relative"
            >
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <span className="text-gray-600 font-medium">Cart</span>
              {items.length > 0 && (
                <span className="bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Search className="w-6 h-6 text-gray-600" />
            </button>
            {/* Updated Mobile Cart Button with visible text */}
            <Link
              href="/cart"
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full relative"
            >
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <span className="text-gray-600 font-medium">Cart</span>
              {items.length > 0 && (
                <span className="bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden px-4 pb-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <button type="submit" className="sr-only">
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/shop">Shop</NavLink>
              <NavLink href="/categories">Categories</NavLink>
              <NavLink href="/about">About</NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
