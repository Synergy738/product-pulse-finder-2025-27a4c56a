
import React from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Product, User } from '@/types/Product';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  searchQuery: string;
  user: User | null;
  onToggleFavorite: (productId: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  searchQuery,
  user,
  onToggleFavorite
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-700 rounded-lg h-64 mb-4"></div>
            <div className="bg-gray-700 rounded h-4 mb-2"></div>
            <div className="bg-gray-700 rounded h-4 w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No products found</h3>
        <p className="text-gray-500">
          {searchQuery 
            ? `Try adjusting your search "${searchQuery}" or filters`
            : 'Try searching for a product or adjusting your filters'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          index={index}
          isFavorite={user?.favorites.includes(product.id) || false}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};
