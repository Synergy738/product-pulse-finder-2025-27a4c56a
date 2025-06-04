
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, X, ExternalLink, Filter } from 'lucide-react';
import { Product, User } from '@/types/Product';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  favoriteProducts: Product[];
  onRemoveFavorite: (productId: string) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  user,
  favoriteProducts,
  onRemoveFavorite
}) => {
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');

  if (!isOpen) return null;

  const sortedProducts = [...favoriteProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] bg-gray-900 border-gray-700 text-white animate-scale-in overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-700">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              My Favorites
            </CardTitle>
            <p className="text-gray-400 mt-1">{favoriteProducts.length} saved items</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-800 border-gray-600 rounded px-2 py-1 text-sm"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 overflow-y-auto">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No favorites yet</h3>
              <p className="text-gray-500">Start browsing and save your favorite products!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedProducts.map((product) => (
                <Card key={product.id} className="bg-gray-800 border-gray-700 group hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveFavorite(product.id)}
                      className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                  
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-white line-clamp-2 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-400">{product.brand}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-white">
                        {product.currency === 'ZAR' ? 'R' : '$'}{product.price.toLocaleString()}
                      </span>
                      <Badge variant={product.isLocal ? "default" : "secondary"} className="text-xs">
                        {product.store}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-yellow-400">★ {product.rating}</span>
                      <Button
                        size="sm"
                        onClick={() => window.open(product.storeUrl, '_blank')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
