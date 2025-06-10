import React, { useState, useEffect } from 'react';
import { SearchHeader } from '@/components/SearchHeader';
import { CategorySelector } from '@/components/CategorySelector';
import { ProductGrid } from '@/components/ProductGrid';
import { FilterSidebar } from '@/components/FilterSidebar';
import { SearchSuggestions } from '@/components/SearchSuggestions';
import { AuthModal } from '@/components/AuthModal';
import { FavoritesModal } from '@/components/FavoritesModal';
import { TechPulseHeader } from '@/components/TechPulseHeader';
import { Button } from '@/components/ui/button';
import { Heart, User, LogOut } from 'lucide-react';
import { Product, User as UserType } from '@/types/Product';
import { searchProducts } from '@/utils/productSearch';
import { useToast } from '@/hooks/use-toast';
import HomePage from './HomePage';

// Keep this for backward compatibility
const Index = () => <HomePage />;

export default Index;
