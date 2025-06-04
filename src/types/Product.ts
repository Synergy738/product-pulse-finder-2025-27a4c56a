
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  description: string;
  features: string[];
  inStock: boolean;
  discount?: number;
  badges?: string[];
}

export interface SearchFilters {
  minPrice: number;
  maxPrice: number;
  minRating: number;
  category: string;
  brand: string;
}
