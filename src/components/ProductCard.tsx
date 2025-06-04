
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/Product';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-square bg-gray-100 relative">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-400">Loading...</div>
            </div>
          )}
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount && (
            <Badge variant="destructive" className="text-xs">
              -{product.discount}% OFF
            </Badge>
          )}
          {product.badges?.map((badge, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {badge}
            </Badge>
          ))}
        </div>

        {/* Stock status */}
        <div className="absolute top-3 right-3">
          <Badge variant={product.inStock ? "default" : "secondary"} className="text-xs">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Brand */}
          <p className="text-sm text-gray-500 font-medium">{product.brand}</p>
          
          {/* Product name */}
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Features */}
          <div className="space-y-1">
            {product.features.slice(0, 2).map((feature, i) => (
              <p key={i} className="text-sm text-gray-600">
                • {feature}
              </p>
            ))}
          </div>
          
          {/* Add to cart button */}
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
