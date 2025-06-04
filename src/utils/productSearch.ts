
import { Product } from '@/types/Product';

// Sample product data for Cape Town stores
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Samsung Galaxy A14 5G',
    brand: 'Samsung',
    price: 3999,
    originalPrice: 4499,
    rating: 4.5,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
    category: 'Smartphones',
    description: 'Budget-friendly smartphone with excellent performance',
    features: [
      '5000mAh long-lasting battery',
      '50MP triple camera system',
      '6.6" Full HD+ display',
      '128GB storage'
    ],
    inStock: true,
    discount: 11,
    badges: ['Local Store', 'Best Value'],
    store: 'Cash Crusaders',
    storeUrl: 'https://www.cashcrusaders.co.za',
    isLocal: true,
    currency: 'ZAR'
  },
  {
    id: '2',
    name: 'ASUS ROG Strix G15 Gaming Laptop',
    brand: 'ASUS',
    price: 24999,
    rating: 4.7,
    reviewCount: 456,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
    category: 'Laptops',
    description: 'High-performance gaming laptop for serious gamers',
    features: [
      'AMD Ryzen 7 processor',
      'RTX 3060 graphics card',
      '16GB RAM, 512GB SSD',
      '15.6" 144Hz display'
    ],
    inStock: true,
    badges: ['Gaming', 'High Performance'],
    store: 'Takealot',
    storeUrl: 'https://www.takealot.com',
    isLocal: true,
    currency: 'ZAR'
  },
  {
    id: '3',
    name: 'Alienware M15 R7 Gaming Laptop',
    brand: 'Dell',
    price: 1499,
    rating: 4.8,
    reviewCount: 892,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
    category: 'Laptops',
    description: 'Premium gaming laptop with exceptional build quality',
    features: [
      'Intel Core i7 processor',
      'RTX 3070 graphics card',
      '32GB RAM, 1TB SSD',
      '15.6" QHD 240Hz display'
    ],
    inStock: true,
    badges: ['Premium', 'International'],
    store: 'Amazon',
    storeUrl: 'https://www.amazon.com',
    isLocal: false,
    currency: 'USD'
  },
  {
    id: '4',
    name: 'MSI Katana GF66 Gaming Laptop',
    brand: 'MSI',
    price: 18500,
    rating: 4.6,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
    category: 'Laptops',
    description: 'Used gaming laptop in excellent condition',
    features: [
      'Intel Core i5 processor',
      'RTX 3050 graphics card',
      '8GB RAM, 256GB SSD',
      '15.6" Full HD display'
    ],
    inStock: true,
    badges: ['Used', 'Great Deal'],
    store: 'OLX Cape Town',
    storeUrl: 'https://www.olx.co.za',
    isLocal: true,
    currency: 'ZAR'
  },
  {
    id: '5',
    name: 'iPhone 14 Pro Max',
    brand: 'Apple',
    price: 28999,
    rating: 4.9,
    reviewCount: 1834,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
    category: 'Smartphones',
    description: 'Latest iPhone with premium features',
    features: [
      'A16 Bionic chip',
      'Pro camera system',
      '6.7" Super Retina XDR',
      '256GB storage'
    ],
    inStock: true,
    badges: ['Premium', 'Latest'],
    store: 'iStore',
    storeUrl: 'https://www.istores.co.za',
    isLocal: true,
    currency: 'ZAR'
  },
  {
    id: '6',
    name: 'Nike Air Force 1 Sneakers',
    brand: 'Nike',
    price: 45,
    originalPrice: 65,
    rating: 4.4,
    reviewCount: 2156,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
    category: 'Footwear',
    description: 'Classic white sneakers at unbeatable price',
    features: [
      'Genuine leather upper',
      'Air-Sole unit cushioning',
      'Rubber outsole',
      'Multiple sizes available'
    ],
    inStock: true,
    discount: 31,
    badges: ['Fashion', 'International Deal'],
    store: 'Shein',
    storeUrl: 'https://www.shein.com',
    isLocal: false,
    currency: 'USD'
  }
];

export const searchProducts = (query: string, filters?: any): Product[] => {
  if (!query.trim()) {
    return sampleProducts;
  }

  const lowerQuery = query.toLowerCase();
  
  let filteredProducts = sampleProducts.filter(product => {
    const searchableText = [
      product.name,
      product.brand,
      product.category,
      product.description,
      product.store,
      ...product.features
    ].join(' ').toLowerCase();

    // Check if query contains budget/price constraints
    const budgetMatch = query.match(/under?\s*r?(\d+)/i);
    if (budgetMatch) {
      const budget = parseInt(budgetMatch[1]);
      if (product.currency === 'ZAR' && product.price > budget) return false;
    }

    // Check for rating constraints
    const ratingMatch = query.match(/(\d+\.?\d*)\+?\s*stars?/i);
    if (ratingMatch) {
      const minRating = parseFloat(ratingMatch[1]);
      if (product.rating < minRating) return false;
    }

    // Check for store type preference
    if (query.includes('local') && !product.isLocal) return false;
    if (query.includes('international') && product.isLocal) return false;

    // General text search
    return searchableText.includes(lowerQuery) ||
           lowerQuery.split(' ').some(term => searchableText.includes(term));
  });

  // Apply store type filter if provided
  if (filters?.storeType) {
    if (filters.storeType === 'local') {
      filteredProducts = filteredProducts.filter(p => p.isLocal);
    } else if (filters.storeType === 'international') {
      filteredProducts = filteredProducts.filter(p => !p.isLocal);
    }
  }

  // Sort by relevance (rating + review count for similar prices)
  return filteredProducts.sort((a, b) => {
    // Prioritize local stores for similar products
    if (a.name === b.name && a.isLocal && !b.isLocal) return -1;
    if (a.name === b.name && !a.isLocal && b.isLocal) return 1;
    
    const aScore = a.rating * Math.log(a.reviewCount + 1);
    const bScore = b.rating * Math.log(b.reviewCount + 1);
    return bScore - aScore;
  });
};

export const getProductRecommendation = (product: Product): string => {
  const price = product.currency === 'ZAR' ? `R${product.price.toLocaleString()}` : `$${product.price.toLocaleString()}`;
  return `The **${product.name}** is available at **${product.store}** for **${price}**, rated **${product.rating} stars**. Click 'View' to visit the store.`;
};
