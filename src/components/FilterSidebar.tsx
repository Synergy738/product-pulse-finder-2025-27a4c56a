
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
    'Laptops',
    'Smartphones',
    'Headphones',
    'Monitors',
    'Keyboards',
    'Mice',
    'Tablets',
    'Cameras'
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
    'Razer'
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
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Sort & Filter</CardTitle>
          <p className="text-sm text-gray-600">{productCount} products found</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sort By */}
          <div>
            <Label className="text-sm font-medium">Sort by</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
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
            <Label className="text-sm font-medium">
              Price Range: R{filters.minPrice} - R{filters.maxPrice}
            </Label>
            <Slider
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={handlePriceChange}
              max={50000}
              min={0}
              step={100}
              className="mt-3"
            />
          </div>

          {/* Rating */}
          <div>
            <Label className="text-sm font-medium">
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
            <Label className="text-sm font-medium">Category</Label>
            <Select 
              value={filters.category || 'All Categories'} 
              onValueChange={(value) => onFilterChange({
                ...filters,
                category: value === 'All Categories' ? '' : value
              })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Brand */}
          <div>
            <Label className="text-sm font-medium">Brand</Label>
            <Select 
              value={filters.brand || 'All Brands'} 
              onValueChange={(value) => onFilterChange({
                ...filters,
                brand: value === 'All Brands' ? '' : value
              })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
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
