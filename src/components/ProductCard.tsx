
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Heart, ExternalLink } from 'lucide-react';
import { Product } from '@/types/Product';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  index, 
  isFavorite, 
  onToggleFavorite 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toast } = useToast();

  const handleToggleFavorite = () => {
    onToggleFavorite(product.id);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${product.name} ${isFavorite ? 'removed from' : 'added to'} your favorites`,
    });
  };

  const handleViewProduct = () => {
    window.open(product.storeUrl, '_blank');
  };

  const formatPrice = (price: number, currency: string) => {
    const symbol = currency === 'ZAR' ? 'R' : '$';
    return `${symbol}${price.toLocaleString()}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <Card 
      className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in overflow-hidden bg-gray-800 border-gray-700"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-square bg-gray-700 relative">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
              <div className="text-gray-500">Loading...</div>
            </div>
          )}
        </div>
        
        {/* Heart icon for favorites */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleFavorite}
          className={`absolute top-3 left-3 ${
            isFavorite 
              ? 'text-red-400 bg-red-400/20 hover:bg-red-400/30' 
              : 'text-gray-400 bg-black/20 hover:bg-black/40'
          } backdrop-blur-sm transition-all duration-300`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.discount && (
            <Badge variant="destructive" className="text-xs">
              -{product.discount}% OFF
            </Badge>
          )}
          {product.badges?.map((badge, i) => (
            <Badge key={i} variant="secondary" className="text-xs bg-gray-700/80 text-white">
              {badge}
            </Badge>
          ))}
        </div>

        {/* Store badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant={product.isLocal ? "default" : "secondary"} className="text-xs">
            {product.store}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 bg-gray-800 text-white">
        <div className="space-y-3">
          {/* Brand */}
          <p className="text-sm text-gray-400 font-medium">{product.brand}</p>
          
          {/* Product name */}
          <h3 className="font-bold text-lg text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-sm text-gray-400">
              {product.rating} ({product.reviewCount.toLocaleString()})
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.originalPrice, product.currency)}
              </span>
            )}
          </div>
          
          {/* Features */}
          <div className="space-y-1">
            {product.features.slice(0, 2).map((feature, i) => (
              <p key={i} className="text-sm text-gray-400">
                • {feature}
              </p>
            ))}
          </div>
          
          {/* Large View button */}
          <Button 
            onClick={handleViewProduct}
            disabled={!product.inStock}
            className="w-full mt-4 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            {product.inStock ? 'View' : 'Out of Stock'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
