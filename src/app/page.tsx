'use client';

import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { useSearch } from '../context/SearchContext';

// Mock data - replace with actual API call in production
const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    description: 'High-quality wireless headphones with noise cancellation',
    image: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: '2',
    name: 'Smartwatch',
    price: 199.99,
    description: 'Feature-rich smartwatch with health tracking',
    image: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: '3',
    name: 'Laptop',
    price: 999.99,
    description: 'Powerful laptop for work and entertainment',
    image: 'https://picsum.photos/400/300?random=3'
  }
];

export default function Home() {
  const { searchTerm } = useSearch();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  );
}