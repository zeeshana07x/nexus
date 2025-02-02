// lib/api.ts
export async function getProducts() {
  const res = await fetch('https://next-ecommerce-template-4.vercel.app/api/product');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  return data.products || []; // Extract the `products` array from the response
}