
import React from 'react';
import { Card } from '@/components/ui/card';
import { Laptop, Smartphone, Monitor, Headphones, HardDrive } from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories = [
  { id: 'Smartphones', label: 'Phones', icon: Smartphone, emoji: '📱' },
  { id: 'Laptops', label: 'Laptops', icon: Laptop, emoji: '💻' },
  { id: 'Monitors', label: 'Desktops', icon: Monitor, emoji: '🖥️' },
  { id: 'Headphones', label: 'Gadgets', icon: Headphones, emoji: '🎧' },
  { id: 'PC Parts', label: 'PC Parts', icon: HardDrive, emoji: '🛠️' }
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategorySelect
}) => {
  return (
    <div className="w-full mb-8 animate-fade-in" style={{ animationDelay: '600ms' }}>
      <h2 className="text-xl font-bold text-white mb-4 text-center">Browse by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                isSelected 
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 border-blue-400 shadow-lg shadow-blue-500/25' 
                  : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
              }`}
              onClick={() => onCategorySelect(isSelected ? '' : category.id)}
            >
              <div className="p-6 text-center space-y-3">
                <div className="text-3xl mb-2">{category.emoji}</div>
                <IconComponent 
                  className={`h-8 w-8 mx-auto ${isSelected ? 'text-white' : 'text-gray-300'}`} 
                />
                <h3 className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                  {category.label}
                </h3>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
