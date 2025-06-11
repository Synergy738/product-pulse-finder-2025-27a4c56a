
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchHeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  loading: boolean;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  onSearch,
  searchQuery,
  setSearchQuery,
  showSuggestions,
  setShowSuggestions,
  loading
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    // Reset to show all products or clear results
    onSearch('');
  };

  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4 animate-fade-in">
        TechPulse
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
        Discover the best tech products from Cape Town stores and international retailers. 
        Compare prices, ratings, and find exactly what you need.
      </p>
      
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for products... (e.g., 'budget smartphone' or 'gaming laptop')"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              className="pl-12 pr-32 py-4 text-lg rounded-full border-2 border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-red-500 focus:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleClearSearch}
                className="absolute right-24 p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button 
              type="submit" 
              className="absolute right-2 rounded-full px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
