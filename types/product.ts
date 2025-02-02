// types/product.ts
export type Product = {
  id: string;
  name: string;
  imagePath: string; // Updated from `image` to `imagePath`
  price: string; // Price is a string in the API response
  description: string;
  discountPercentage: number;
  isFeaturedProduct: boolean;
  stockLevel: number;
  category: string;
};