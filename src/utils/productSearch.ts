
import { Product } from '@/types/Product';

// Mock product data - in a real app, this would come from an API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    price: 24999,
    currency: 'ZAR',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
    category: 'smartphones',
    rating: 4.8,
    reviewCount: 1250,
    store: 'iStore',
    storeUrl: 'https://www.istore.co.za',
    isLocal: true,
    description: 'Latest iPhone with Pro camera system',
    features: ['A17 Pro chip', '48MP camera system', 'Titanium design', '5G connectivity'],
    inStock: true
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 26999,
    currency: 'ZAR',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300',
    category: 'smartphones',
    rating: 4.7,
    reviewCount: 980,
    store: 'Incredible Connection',
    storeUrl: 'https://www.incredible.co.za',
    isLocal: true,
    description: 'Premium Android flagship with S Pen',
    features: ['S Pen included', '200MP camera', '6.8" Dynamic AMOLED', 'Galaxy AI features'],
    inStock: true
  },
  {
    id: '3',
    name: 'MacBook Pro 14" M3',
    brand: 'Apple',
    price: 45999,
    currency: 'ZAR',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300',
    category: 'laptops',
    rating: 4.9,
    reviewCount: 750,
    store: 'iStore',
    storeUrl: 'https://www.istore.co.za',
    isLocal: true,
    description: 'Professional laptop with M3 chip',
    features: ['M3 Pro chip', '14.2" Liquid Retina XDR', '18-hour battery', 'ProRes video'],
    inStock: true
  },
  {
    id: '4',
    name: 'Dell XPS 15',
    brand: 'Dell',
    price: 35999,
    currency: 'ZAR',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300',
    category: 'laptops',
    rating: 4.6,
    reviewCount: 420,
    store: 'Evetech',
    storeUrl: 'https://www.evetech.co.za',
    isLocal: true,
    description: 'High-performance ultrabook',
    features: ['13th Gen Intel Core', '15.6" 4K OLED', 'RTX 4050 graphics', 'Premium build'],
    inStock: true
  },
  {
    id: '5',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    price: 7999,
    currency: 'ZAR',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300',
    category: 'audio',
    rating: 4.8,
    reviewCount: 890,
    store: 'Incredible Connection',
    storeUrl: 'https://www.incredible.co.za',
    isLocal: true,
    description: 'Premium noise-cancelling headphones',
    features: ['Industry-leading noise cancellation', '30-hour battery', 'Multipoint connection', 'Quick charge'],
    inStock: true
  },
  {
    id: '6',
    name: 'LG 27" 4K Monitor',
    brand: 'LG',
    price: 8999,
    currency: 'ZAR',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300',
    category: 'monitors',
    rating: 4.5,
    reviewCount: 320,
    store: 'Evetech',
    storeUrl: 'https://www.evetech.co.za',
    isLocal: true,
    description: '4K UHD monitor for professionals',
    features: ['4K UHD resolution', 'HDR10 support', 'USB-C connectivity', 'Ergonomic stand'],
    inStock: true
  },
  {
    id: '7',
    name: 'NVIDIA RTX 4080',
    brand: 'NVIDIA',
    price: 22999,
    currency: 'ZAR',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300',
    category: 'pc-parts',
    rating: 4.9,
    reviewCount: 650,
    store: 'Evetech',
    storeUrl: 'https://www.evetech.co.za',
    isLocal: true,
    description: 'High-end graphics card for gaming',
    features: ['Ada Lovelace architecture', 'DLSS 3 support', '16GB GDDR6X', 'Ray tracing'],
    inStock: true
  },
  {
    id: '8',
    name: 'iPad Pro 12.9"',
    brand: 'Apple',
    price: 19999,
    currency: 'ZAR',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
    category: 'tablets',
    rating: 4.7,
    reviewCount: 540,
    store: 'iStore',
    storeUrl: 'https://www.istore.co.za',
    isLocal: true,
    description: 'Professional tablet with M2 chip',
    features: ['M2 chip performance', '12.9" Liquid Retina XDR', 'Apple Pencil support', 'ProRes video'],
    inStock: true
  }
];

export const searchProducts = (query: string, filters: any): Product[] => {
  let results = mockProducts;

  // Filter by search query
  if (query.trim()) {
    const searchTerm = query.toLowerCase();
    results = results.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  // Apply additional filters
  if (filters.category) {
    results = results.filter(product => product.category === filters.category);
  }

  if (filters.brand) {
    results = results.filter(product => 
      product.brand.toLowerCase().includes(filters.brand.toLowerCase()) ||
      product.store.toLowerCase().includes(filters.brand.toLowerCase())
    );
  }

  if (filters.storeType !== 'all') {
    results = results.filter(product => 
      filters.storeType === 'local' ? product.isLocal : !product.isLocal
    );
  }

  return results;
};
