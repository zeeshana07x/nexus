// about/page.tsx
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="h-16 bg-white shadow-sm">Loading...</div>}>
        <Navbar />
      </Suspense>
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Nexus</h1>
          <div className="space-y-6 text-gray-600">
            <p>
              At Nexus, we&apos;re passionate about bringing you the finest selection of modern
              furniture and home decor. Founded in 2023, our mission is to help you
              create spaces that inspire and delight.
            </p>
            <p>
              Our carefully curated collection features pieces from renowned designers
              and emerging talents alike. We believe in quality craftsmanship,
              sustainable materials, and timeless design.
            </p>
            <p>
              Whether you&apos;re furnishing a new home or refreshing your current space,
              we&apos;re here to help you find pieces that tell your unique story.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}