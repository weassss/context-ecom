'use client';

import { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-1 aspect-h-1">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-gray-500 text-sm">{product.description}</p>
        <p className="mt-2 text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <MinusIcon className="h-5 w-5" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
          
          <button
            onClick={() => addToCart(product, quantity)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}