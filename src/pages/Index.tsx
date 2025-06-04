
import React, { useState, useEffect } from 'react';
import { SearchHeader } from '@/components/SearchHeader';
import { ProductGrid } from '@/components/ProductGrid';
import { FilterSidebar } from '@/components/FilterSidebar';
import { SearchSuggestions } from '@/components/SearchSuggestions';
import { AuthModal } from '@/components/AuthModal';
import { FavoritesModal } from '@/components/FavoritesModal';
import { Button } from '@/components/ui/button';
import { Heart, User, LogOut } from 'lucide-react';
import { Product, User as UserType } from '@/types/Product';
import { searchProducts } from '@/utils/productSearch';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 50000,
    minRating: 0,
    category: '',
    brand: '',
    storeType: 'all' as 'all' | 'local' | 'international'
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user on load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Show auth modal for new users
      setShowAuthModal(true);
    }

    // Load sample products
    const sampleProducts = searchProducts('');
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  useEffect(() => {
    // Apply filters and sorting when they change
    let filtered = products.filter(product => {
      return (
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice &&
        product.rating >= filters.minRating &&
        (filters.category === '' || product.category === filters.category) &&
        (filters.brand === '' || product.brand === filters.brand) &&
        (filters.storeType === 'all' || 
         (filters.storeType === 'local' && product.isLocal) ||
         (filters.storeType === 'international' && !product.isLocal))
      );
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, filters, sortBy]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    setShowSuggestions(false);
    
    try {
      const results = searchProducts(query, filters);
      setProducts(results);
      
      if (results.length === 0) {
        toast({
          title: "No products found",
          description: "Try adjusting your search terms or filters",
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleAuth = (newUser: UserType) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  const handleToggleFavorite = (productId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const updatedUser = { ...user };
    if (updatedUser.favorites.includes(productId)) {
      updatedUser.favorites = updatedUser.favorites.filter(id => id !== productId);
    } else {
      updatedUser.favorites.push(productId);
    }
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const favoriteProducts = products.filter(p => user?.favorites.includes(p.id) || false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => user ? setShowFavoritesModal(true) : setShowAuthModal(true)}
              className="text-white hover:text-red-400 transition-colors"
            >
              <Heart className={`h-6 w-6 ${user?.favorites.length ? 'fill-current text-red-400' : ''}`} />
            </Button>
            {user && (
              <span className="text-sm text-gray-400">
                {user.favorites.length} favorites
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">Welcome, {user.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-white hover:text-red-400"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setShowAuthModal(true)}
                className="text-white hover:text-blue-400"
              >
                <User className="h-5 w-5 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>

        <SearchHeader 
          onSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          loading={loading}
        />
        
        {showSuggestions && (
          <SearchSuggestions 
            onSuggestionClick={handleSearch}
            searchQuery={searchQuery}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="lg:w-1/4">
            <FilterSidebar 
              filters={filters}
              onFilterChange={handleFilterChange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              productCount={filteredProducts.length}
            />
          </div>
          
          <div className="lg:w-3/4">
            <ProductGrid 
              products={filteredProducts}
              loading={loading}
              searchQuery={searchQuery}
              user={user}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
      />

      <FavoritesModal
        isOpen={showFavoritesModal}
        onClose={() => setShowFavoritesModal(false)}
        user={user}
        favoriteProducts={favoriteProducts}
        onRemoveFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default Index;
