
import React, { useState, useEffect } from 'react';
import { SearchHeader } from '@/components/SearchHeader';
import { CategorySelector } from '@/components/CategorySelector';
import { ProductGrid } from '@/components/ProductGrid';
import { FilterSidebar } from '@/components/FilterSidebar';
import { SearchSuggestions } from '@/components/SearchSuggestions';
import { Product } from '@/types/Product';
import { searchProducts } from '@/utils/productSearch';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

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
  const [showSuggestions, setShowSuggestions] = useState(false);
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
    setShowSuggestions(false);
    
    // If query is empty, still show products section but with all products
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
    // Perform search with the selected category
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero/Search Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-12">
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
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Discover Technology</h2>
            <p className="text-slate-300">Choose a category to explore premium tech products</p>
          </div>
          <CategorySelector 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </section>

      {/* Products Section */}
      {showProductsSection && (
        <section className="bg-gradient-to-br from-slate-900 to-purple-900 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
              <div className="lg:w-1/4">
                <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg border border-slate-600 shadow-xl">
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
