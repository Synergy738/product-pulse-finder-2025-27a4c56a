
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
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
        Smart Product Finder
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Discover the perfect products with AI-powered search. Find exactly what you need with intelligent recommendations.
      </p>
      
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for products... (e.g., 'budget laptop under R5000 with 4+ stars')"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              className="pl-12 pr-24 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            />
            <Button 
              type="submit" 
              className="absolute right-2 rounded-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
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
