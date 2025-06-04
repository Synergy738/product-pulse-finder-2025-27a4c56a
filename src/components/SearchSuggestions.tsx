
import React from 'react';
import { Card } from '@/components/ui/card';

interface SearchSuggestionsProps {
  onSuggestionClick: (query: string) => void;
  searchQuery: string;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  onSuggestionClick,
  searchQuery
}) => {
  const suggestions = [
    "budget laptop under R5000 with 4+ stars",
    "smartphone with excellent battery life under R7000",
    "gaming headset with noise cancellation",
    "4K monitor for home office",
    "wireless earbuds with long battery",
    "mechanical keyboard for gaming",
    "webcam for video calls",
    "tablet for digital art"
  ].filter(suggestion => 
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (suggestions.length === 0) return null;

  return (
    <Card className="max-w-3xl mx-auto mt-2 p-4 shadow-lg animate-fade-in">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Popular searches:</h3>
      <div className="space-y-1">
        {suggestions.slice(0, 5).map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors duration-200"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </Card>
  );
};
