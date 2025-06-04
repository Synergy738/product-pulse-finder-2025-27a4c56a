
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { SearchFilters } from '@/types/Product';

interface FilterSidebarProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  productCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  sortBy,
  setSortBy,
  productCount
}) => {
  const categories = [
    'All Categories',
    'Smartphones',
    'Laptops',
    'Headphones',
    'Monitors',
    'PC Parts',
    'Tablets',
    'Cameras'
  ];

  const capeTownStores = [
    'All Stores',
    'Takealot',
    'iStore',
    'Vodacom',
    'MTN',
    'Cell C',
    'Cash Crusaders',
    'Samsung',
    'Evetech',
    'Incredible Connection'
  ];

  const brands = [
    'All Brands',
    'Apple',
    'Samsung',
    'Acer',
    'HP',
    'Dell',
    'Sony',
    'Logitech',
    'Razer',
    'ASUS',
    'MSI',
    'NVIDIA',
    'AMD'
  ];

  const handlePriceChange = (values: number[]) => {
    onFilterChange({
      ...filters,
      minPrice: values[0],
      maxPrice: values[1]
    });
  };

  const handleRatingChange = (values: number[]) => {
    onFilterChange({
      ...filters,
      minRating: values[0]
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">Sort & Filter</CardTitle>
          <p className="text-sm text-gray-400">{productCount} products found</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sort By */}
          <div>
            <Label className="text-sm font-medium text-gray-300">Sort by</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium text-gray-300">
              Price Range: R{filters.minPrice} - R{filters.maxPrice}
            </Label>
            <Slider
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={handlePriceChange}
              max={50000}
              min={0}
              step={500}
              className="mt-3"
            />
          </div>

          {/* Rating */}
          <div>
            <Label className="text-sm font-medium text-gray-300">
              Minimum Rating: {filters.minRating}+ stars
            </Label>
            <Slider
              value={[filters.minRating]}
              onValueChange={handleRatingChange}
              max={5}
              min={0}
              step={0.1}
              className="mt-3"
            />
          </div>

          {/* Category */}
          <div>
            <Label className="text-sm font-medium text-gray-300">Category</Label>
            <Select 
              value={filters.category || 'All Categories'} 
              onValueChange={(value) => onFilterChange({
                ...filters,
                category: value === 'All Categories' ? '' : value
              })}
            >
              <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cape Town Stores */}
          <div>
            <Label className="text-sm font-medium text-gray-300">Cape Town Stores</Label>
            <Select 
              value={filters.brand || 'All Stores'} 
              onValueChange={(value) => onFilterChange({
                ...filters,
                brand: value === 'All Stores' ? '' : value
              })}
            >
              <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {capeTownStores.map(store => (
                  <SelectItem key={store} value={store}>
                    {store}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Brand */}
          <div>
            <Label className="text-sm font-medium text-gray-300">Brand</Label>
            <Select 
              value={filters.brand || 'All Brands'} 
              onValueChange={(value) => onFilterChange({
                ...filters,
                brand: value === 'All Brands' ? '' : value
              })}
            >
              <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
