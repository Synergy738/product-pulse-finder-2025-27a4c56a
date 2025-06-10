
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ExternalLink, Filter, Trash2, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { user, signInWithGoogle } = useAuth();
  const { favorites, removeFromFavorites, loading } = useFavorites();
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'date'>('date');

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Your Favorite Tech
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Sign in to save and manage your favorite products from across Cape Town's top tech stores.
          </p>
          <Button
            onClick={signInWithGoogle}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Sign In with Google
          </Button>
        </div>
      </div>
    );
  }

  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return (a.product_price || 0) - (b.product_price || 0);
      case 'name':
        return a.product_name.localeCompare(b.product_name);
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
          My Favorites
        </h1>
        <p className="text-gray-400 text-lg">{favorites.length} saved items</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-12 w-12 text-gray-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-400 mb-4">No favorites yet</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Start browsing our product catalog and save your favorite tech gear to see them here.
          </p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Sort Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500"
              >
                <option value="date">Recently Added</option>
                <option value="name">Name A-Z</option>
                <option value="price">Price Low to High</option>
              </select>
            </div>
          </div>

          {/* Favorites Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedFavorites.map((favorite) => (
              <Card 
                key={favorite.id} 
                className="bg-gray-800/80 border-gray-700/50 group hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm"
              >
                <div className="relative">
                  {favorite.product_image && (
                    <img
                      src={favorite.product_image}
                      alt={favorite.product_name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromFavorites(favorite.product_id)}
                    className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white backdrop-blur-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-white line-clamp-2 mb-1 group-hover:text-red-400 transition-colors">
                      {favorite.product_name}
                    </h3>
                    {favorite.product_brand && (
                      <p className="text-sm text-gray-400">{favorite.product_brand}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {favorite.product_price && (
                      <span className="text-lg font-bold text-white">
                        {favorite.product_currency === 'ZAR' ? 'R' : '$'}
                        {favorite.product_price.toLocaleString()}
                      </span>
                    )}
                    {favorite.product_store && (
                      <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                        {favorite.product_store}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-gray-500">
                      Added {new Date(favorite.created_at).toLocaleDateString()}
                    </span>
                    {favorite.product_store_url && (
                      <Button
                        size="sm"
                        onClick={() => window.open(favorite.product_store_url, '_blank')}
                        className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
