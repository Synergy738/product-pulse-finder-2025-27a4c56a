
import { Product } from '@/types/Product';

// Sample product data for demonstration
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Acer Aspire 5 Slim Laptop',
    brand: 'Acer',
    price: 4999,
    originalPrice: 5999,
    rating: 4.3,
    reviewCount: 1247,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
    category: 'Laptops',
    description: 'Perfect budget laptop for students and daily computing',
    features: [
      'AMD Ryzen 5 processor',
      '8GB RAM, 256GB SSD',
      '15.6" Full HD display',
      'Up to 8 hours battery life'
    ],
    inStock: true,
    discount: 17,
    badges: ['Best Seller', 'Student Choice']
  },
  {
    id: '2',
    name: 'Samsung Galaxy A54 5G',
    brand: 'Samsung',
    price: 6499,
    rating: 4.7,
    reviewCount: 2156,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
    category: 'Smartphones',
    description: 'Exceptional battery life and performance for intensive daily use',
    features: [
      '5000mAh long-lasting battery',
      '108MP triple camera system',
      '6.4" Super AMOLED display',
      '128GB storage, expandable'
    ],
    inStock: true,
    badges: ['5G Ready', 'Editor\'s Choice']
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    brand: 'Sony',
    price: 8999,
    originalPrice: 9999,
    rating: 4.8,
    reviewCount: 892,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Headphones',
    description: 'Industry-leading noise cancellation with premium sound quality',
    features: [
      'Advanced noise cancellation',
      '30-hour battery life',
      'Quick charge: 3 min = 3 hours',
      'Multipoint Bluetooth connection'
    ],
    inStock: true,
    discount: 10,
    badges: ['Premium Audio', 'Noise Cancelling']
  },
  {
    id: '4',
    name: 'HP 24" Full HD Monitor',
    brand: 'HP',
    price: 2299,
    rating: 4.4,
    reviewCount: 567,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    category: 'Monitors',
    description: 'Perfect for home office and productivity work',
    features: [
      '24" Full HD (1920x1080)',
      'IPS panel for wide viewing',
      'HDMI and VGA connectivity',
      'Adjustable tilt stand'
    ],
    inStock: true,
    badges: ['Office Essential']
  },
  {
    id: '5',
    name: 'Apple iPad (10th Gen)',
    brand: 'Apple',
    price: 8999,
    rating: 4.6,
    reviewCount: 1834,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop',
    category: 'Tablets',
    description: 'Versatile tablet perfect for creativity and productivity',
    features: [
      '10.9" Liquid Retina display',
      'A14 Bionic chip',
      'All-day battery life',
      'USB-C connectivity'
    ],
    inStock: true,
    badges: ['Creative Pro', 'Premium Build']
  },
  {
    id: '6',
    name: 'Logitech MX Master 3S Wireless Mouse',
    brand: 'Logitech',
    price: 1899,
    rating: 4.5,
    reviewCount: 743,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    category: 'Mice',
    description: 'Advanced wireless mouse for professionals',
    features: [
      'Darkfield tracking technology',
      '70-day battery life',
      'Customizable buttons',
      'Multi-device connectivity'
    ],
    inStock: true,
    badges: ['Productivity']
  }
];

export const searchProducts = (query: string): Product[] => {
  if (!query.trim()) {
    return sampleProducts;
  }

  const lowerQuery = query.toLowerCase();
  
  // Enhanced search logic
  const filteredProducts = sampleProducts.filter(product => {
    const searchableText = [
      product.name,
      product.brand,
      product.category,
      product.description,
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

  // Sort by relevance (rating + review count for similar prices)
  return filteredProducts.sort((a, b) => {
    const priceDiff = Math.abs(a.price - b.price);
    if (priceDiff < 500) { // Similar pricing
      const aScore = a.rating * Math.log(a.reviewCount + 1);
      const bScore = b.rating * Math.log(b.reviewCount + 1);
      return bScore - aScore;
    }
    return 0; // Keep original order for different price ranges
  });
};

export const getProductRecommendation = (product: Product): string => {
  const features = product.features.slice(0, 2).join(', ');
  return `The ${product.name} is available for ${formatPrice(product.price)}, boasts a ${product.rating}-star rating from over ${product.reviewCount.toLocaleString()} reviews, and is ideal for ${features.toLowerCase()}.`;
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
