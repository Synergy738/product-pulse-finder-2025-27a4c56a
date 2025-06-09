
import React from 'react';
import { Card } from '@/components/ui/card';
import { Laptop, Smartphone, Monitor, Headphones, HardDrive, Grid3X3 } from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories = [
  { id: '', label: 'All Products', icon: Grid3X3, gradient: 'from-gray-600 to-gray-700' },
  { id: 'Smartphones', label: 'Smartphones', icon: Smartphone, gradient: 'from-blue-600 to-cyan-600' },
  { id: 'Laptops', label: 'Laptops', icon: Laptop, gradient: 'from-purple-600 to-pink-600' },
  { id: 'Monitors', label: 'Monitors', icon: Monitor, gradient: 'from-green-600 to-emerald-600' },
  { id: 'Headphones', label: 'Audio', icon: Headphones, gradient: 'from-orange-600 to-red-600' },
  { id: 'PC Parts', label: 'PC Parts', icon: HardDrive, gradient: 'from-indigo-600 to-purple-600' }
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategorySelect
}) => {
  return (
    <div className="w-full mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Discover Technology
        </h2>
        <p className="text-gray-400 text-lg">Choose a category to explore premium tech products</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden group ${
                isSelected 
                  ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-400/50 shadow-2xl shadow-blue-500/25' 
                  : 'bg-gray-800/80 border-gray-700/50 hover:bg-gray-700/80 backdrop-blur-sm'
              }`}
              onClick={() => onCategorySelect(category.id)}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative p-6 text-center space-y-4">
                {/* Icon container with glow effect */}
                <div className={`relative mx-auto w-16 h-16 rounded-xl bg-gradient-to-br ${category.gradient} p-3 shadow-lg`}>
                  <IconComponent className="w-full h-full text-white" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                </div>
                
                {/* Category label */}
                <h3 className={`font-bold text-sm transition-colors duration-300 ${
                  isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
                }`}>
                  {category.label}
                </h3>
              </div>
              
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
