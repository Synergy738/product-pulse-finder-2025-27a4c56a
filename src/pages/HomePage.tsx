
import React, { useState, useEffect } from 'react';
import { CategorySelector } from '@/components/CategorySelector';
import { ProductGrid } from '@/components/ProductGrid';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Product } from '@/types/Product';
import { searchProducts } from '@/utils/productSearch';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HomePage = () => {
  const location = useLocation();
  const { user, signInWithGoogle } = useAuth();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showProductsSection, setShowProductsSection] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 50000,
    minRating: 0,
    category: '',
    brand: '',
    storeType: 'all' as 'all' | 'local' | 'international'
  });
  const [sortBy, setSortBy] = useState('relevance');
  const { toast } = useToast();

  // Reset filters when navigating to home page
  useEffect(() => {
    if (location.pathname === '/') {
      setFilters({
        minPrice: 0,
        maxPrice: 50000,
        minRating: 0,
        category: '',
        brand: '',
        storeType: 'all'
      });
      setSelectedCategory('');
      setSearchQuery('');
      setShowProductsSection(false);
      setProducts([]);
      setFilteredProducts([]);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Update filters when category changes
    const updatedFilters = { ...filters, category: selectedCategory };
    setFilters(updatedFilters);
  }, [selectedCategory]);

  useEffect(() => {
    // Apply filters and sorting when they change
    let filtered = products.filter(product => {
      return (
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice &&
        product.rating >= filters.minRating &&
        (filters.category === '' || product.category === filters.category) &&
        (filters.brand === '' || product.brand === filters.brand || product.store === filters.brand) &&
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
    setShowProductsSection(true);
    
    try {
      const results = searchProducts(query, filters);
      setProducts(results);
      
      if (results.length === 0 && query.trim()) {
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

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowProductsSection(true);
    handleSearch(category.toLowerCase());
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleToggleFavorite = async (productId: string) => {
    if (!user) {
      await signInWithGoogle();
      return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) return;

    try {
      if (isFavorite(productId)) {
        const success = await removeFromFavorites(productId);
        if (!success) {
          toast({
            title: "Error",
            description: "Failed to remove from favorites",
            variant: "destructive",
          });
        }
      } else {
        const success = await addToFavorites(product);
        if (!success) {
          toast({
            title: "Error", 
            description: "Failed to add to favorites",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Toggle favorite error:', error);
      toast({
        title: "Error",
        description: "Something went wrong with favorites",
        variant: "destructive",
      });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery.trim());
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    handleSearch('');
  };

  return (
    <div className="min-h-screen">
      {/* Discover Technology Section */}
      <section className="bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Discover Technology
            </h2>
            <p className="text-gray-400 text-lg mb-8">Choose a category to explore premium tech products</p>
            
            {/* Search Box */}
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for products... (e.g., 'budget smartphone' or 'gaming laptop')"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-32 py-3 text-base rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                  />
                  {searchQuery && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleClearSearch}
                      className="absolute right-24 p-2 text-white/70 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    type="submit" 
                    className="absolute right-2 rounded-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-white font-semibold"
                    disabled={loading}
                  >
                    {loading ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          
          <CategorySelector 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </section>

      {/* Products Section */}
      {showProductsSection && (
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
              <div className="lg:w-1/4">
                <div className="bg-gradient-to-br from-slate-800 to-blue-800 rounded-lg border border-slate-600 shadow-xl">
                  <FilterSidebar 
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    productCount={filteredProducts.length}
                  />
                </div>
              </div>
              
              <div className="lg:w-3/4">
                <ProductGrid 
                  products={filteredProducts}
                  loading={loading}
                  searchQuery={searchQuery}
                  user={user ? { 
                    id: user.id, 
                    name: user.email || '', 
                    email: user.email || '',
                    favorites: [] 
                  } : null}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
