import React from 'react';

export default function CurrencySelector() {
  const currencies = ['USD', 'CAD', 'EUR'];
  return (
    <select className="text-sm bg-gray-900 text-white rounded-md">
      {currencies.map((currency) => (
        <option key={currency}>{currency}</option>
      ))}
    </select>
  );
}
