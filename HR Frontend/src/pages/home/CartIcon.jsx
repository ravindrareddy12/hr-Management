import React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function CartIcon() {
  return (
    <div className="flex items-center">
      <ShoppingBagIcon className="h-6 w-6 text-gray-700" />
      <span className="ml-2">0</span>
    </div>
  );
}
