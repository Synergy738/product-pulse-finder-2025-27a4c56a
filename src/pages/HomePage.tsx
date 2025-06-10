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
    setShowProductsSection(true);
    
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

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowProductsSection(true);
    // Trigger search with category filter
    if (category) {
      const categoryQuery = searchQuery || category.toLowerCase();
      handleSearch(categoryQuery);
    } else {
      handleSearch(searchQuery);
    }
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

    if (isFavorite(productId)) {
      await removeFromFavorites(productId);
    } else {
      await addToFavorites(product);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
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

      <CategorySelector 
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {showProductsSection && (
        <div className="flex flex-col lg:flex-row gap-6 mt-6 animate-fade-in">
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
      )}
    </div>
  );
};

export default HomePage;
