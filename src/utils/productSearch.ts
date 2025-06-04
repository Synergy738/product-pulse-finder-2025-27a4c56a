
import { Product } from '@/types/Product';

// Sample product data for Cape Town tech retailers only
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
    id: '4',
    name: 'Samsung Galaxy S23 Ultra',
    brand: 'Samsung',
    price: 24999,
    rating: 4.8,
    reviewCount: 892,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
    category: 'Smartphones',
    description: 'Premium flagship with S Pen functionality',
    features: [
      'S Pen included',
      '200MP camera system',
      '6.8" Dynamic AMOLED 2X',
      '256GB storage'
    ],
    inStock: true,
    badges: ['Flagship', 'S Pen'],
    store: 'Vodacom',
    storeUrl: 'https://www.vodacom.co.za',
    isLocal: true,
    currency: 'ZAR'
  },
  {
    id: '5',
    name: 'MacBook Air M2',
    brand: 'Apple',
    price: 21999,
    rating: 4.9,
    reviewCount: 567,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
    category: 'Laptops',
    description: 'Ultra-thin laptop with Apple M2 chip',
    features: [
      'Apple M2 chip',
      '13.6" Liquid Retina display',
      '256GB SSD storage',
      'All-day battery life'
    ],
    inStock: true,
    badges: ['Premium', 'Ultra-thin'],
    store: 'iStore',
    storeUrl: 'https://www.istores.co.za',
    isLocal: true,
    currency: 'ZAR'
  },
  {
    id: '6',
    name: 'Sony WH-1000XM5 Headphones',
    brand: 'Sony',
    price: 6999,
    originalPrice: 7999,
    rating: 4.8,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Headphones',
    description: 'Premium noise-canceling headphones',
    features: [
      'Industry-leading noise canceling',
      '30-hour battery life',
      'Premium comfort',
      'Multi-device pairing'
    ],
    inStock: true,
    discount: 13,
    badges: ['Audio', 'Noise Canceling'],
    store: 'Takealot',
    storeUrl: 'https://www.takealot.com',
    isLocal: true,
    currency: 'ZAR'
  },
  {
    id: '7',
    name: 'Dell XPS 13 Plus',
    brand: 'Dell',
    price: 18999,
    rating: 4.6,
    reviewCount: 289,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
    category: 'Laptops',
    description: 'Ultra-premium business laptop',
    features: [
      'Intel Core i7 processor',
      '13.4" InfinityEdge display',
      '16GB RAM, 512GB SSD',
      'Sleek design'
    ],
    inStock: true,
    badges: ['Business', 'Premium'],
    store: 'MTN',
    storeUrl: 'https://www.mtn.co.za',
    isLocal: true,
    currency: 'ZAR'
  },
  {
    id: '8',
    name: 'NVIDIA RTX 4060 Graphics Card',
    brand: 'NVIDIA',
    price: 7499,
    rating: 4.7,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop',
    category: 'PC Parts',
    description: 'High-performance graphics card for gaming',
    features: [
      'DLSS 3 technology',
      '8GB GDDR6 memory',
      'Ray tracing support',
      'Efficient cooling'
    ],
    inStock: true,
    badges: ['Gaming', 'Ray Tracing'],
    store: 'Evetech',
    storeUrl: 'https://www.evetech.co.za',
    isLocal: true,
    currency: 'ZAR'
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
      if (product.price > budget) return false;
    }

    // Check for rating constraints
    const ratingMatch = query.match(/(\d+\.?\d*)\+?\s*stars?/i);
    if (ratingMatch) {
      const minRating = parseFloat(ratingMatch[1]);
      if (product.rating < minRating) return false;
    }

    // General text search
    return searchableText.includes(lowerQuery) ||
           lowerQuery.split(' ').some(term => searchableText.includes(term));
  });

  // Apply additional filters if provided
  if (filters?.category && filters.category !== '') {
    filteredProducts = filteredProducts.filter(p => p.category === filters.category);
  }

  if (filters?.storeType && filters.storeType !== 'all') {
    if (filters.storeType === 'local') {
      filteredProducts = filteredProducts.filter(p => p.isLocal);
    }
  }

  // Sort by relevance (rating + review count)
  return filteredProducts.sort((a, b) => {
    const aScore = a.rating * Math.log(a.reviewCount + 1);
    const bScore = b.rating * Math.log(b.reviewCount + 1);
    return bScore - aScore;
  });
};

export const getProductRecommendation = (product: Product): string => {
  const price = `R${product.price.toLocaleString()}`;
  return `The **${product.name}** is available at **${product.store}** for **${price}**, rated **${product.rating} stars**. Click 'View' to visit the store.`;
};

export const getSearchSuggestions = (query: string): string[] => {
  const suggestions = [
    "budget smartphone under R5000",
    "gaming laptop with RTX graphics",
    "iPhone latest models Cape Town",
    "Samsung Galaxy series phones",
    "MacBook Air for students",
    "gaming headset with microphone",
    "wireless earbuds under R2000",
    "4K monitor for home office",
    "mechanical keyboard for gaming",
    "graphics card RTX 4060",
    "SSD storage 1TB",
    "laptop under R15000"
  ];

  if (!query.trim()) return suggestions.slice(0, 6);
  
  return suggestions
    .filter(suggestion => 
      suggestion.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 6);
};
