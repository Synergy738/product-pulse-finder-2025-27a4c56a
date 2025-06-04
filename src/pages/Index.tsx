import React, { useState, useEffect } from 'react';
import { SearchHeader } from '@/components/SearchHeader';
import { ProductGrid } from '@/components/ProductGrid';
import { FilterSidebar } from '@/components/FilterSidebar';
import { SearchSuggestions } from '@/components/SearchSuggestions';
import { Product } from '@/types/Product';
import { searchProducts } from '@/utils/productSearch';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 50000,
    minRating: 0,
    category: '',
    brand: ''
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load sample products on initial load
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
        (filters.brand === '' || product.brand === filters.brand)
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
        // Keep original relevance order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, filters, sortBy]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    setShowSuggestions(false);
    
    try {
      const results = searchProducts(query);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
