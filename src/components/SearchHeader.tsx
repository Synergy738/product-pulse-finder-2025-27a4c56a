
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
    onSearch(searchQuery.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    onSearch('');
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
        TechPulse
      </h1>
      <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
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
              className="pl-12 pr-32 py-4 text-lg rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:border-white/40 focus:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
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
              className="absolute right-2 rounded-full px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 text-white font-semibold"
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
