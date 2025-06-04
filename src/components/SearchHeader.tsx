
import React, { useState } from 'react';
import { Search } from 'lucide-react';
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

  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 animate-fade-in">
        Cape Town Product Finder
      </h1>
      <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
        Discover the best products from local Cape Town stores and international retailers. 
        Compare prices, ratings, and find exactly what you need.
      </p>
      
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for products... (e.g., 'budget smartphone Cape Town' or 'gaming laptop local stores')"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              className="pl-12 pr-24 py-4 text-lg rounded-full border-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            />
            <Button 
              type="submit" 
              className="absolute right-2 rounded-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
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
