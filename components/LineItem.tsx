
import React, { useState, useCallback, useMemo } from 'react';
import { Trash2, Plus, Download, FileText } from 'lucide-react';
import { formatCurrency, generateInvoiceNumber, calculateLineTotal, CURRENCIES, TAX_RATES } from './invoice';

// LineItem Component
const LineItem: React.FC<{
  item: LineItem;
  currency: string;
  onUpdate: (id: string, updates: Partial<LineItem>) => void;
  onRemove: (id: string) => void;
  errors?: { [key: string]: string };
}> = ({ item, currency, onUpdate, onRemove, errors = {} }) => {
  const lineTotal = calculateLineTotal(item.quantity, item.unitPrice, item.taxRate);

  return (
    <div className="grid grid-cols-12 gap-2 items-start p-2 border rounded-lg bg-white text-black">
      <div className="col-span-4">
        <input
          type="text"
          placeholder="Description"
          value={item.description}
          onChange={(e) => onUpdate(item.id, { description: e.target.value })}
          className={`w-full p-2 border rounded ${errors[`${item.id}-description`] ? 'border-red-500' : 'border-gray-300'}`}
          data-testid={`description-${item.id}`}
        />
        {errors[`${item.id}-description`] && (
          <p className="text-red-500 text-xs mt-1">{errors[`${item.id}-description`]}</p>
        )}
      </div>
      
      <div className="col-span-2">
        <input
          type="number"
          placeholder="Qty"
          value={item.quantity || ''}
          onChange={(e) => onUpdate(item.id, { quantity: parseFloat(e.target.value) || 0 })}
          className={`w-full p-2 border rounded ${errors[`${item.id}-quantity`] ? 'border-red-500' : 'border-gray-300'}`}
          min="0"
          step="0.01"
          data-testid={`quantity-${item.id}`}
        />
        {errors[`${item.id}-quantity`] && (
          <p className="text-red-500 text-xs mt-1">{errors[`${item.id}-quantity`]}</p>
        )}
      </div>

      <div className="col-span-2">
        <input
          type="number"
          placeholder="Unit Price"
          value={item.unitPrice || ''}
          onChange={(e) => onUpdate(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
          className={`w-full p-2 border rounded ${errors[`${item.id}-unitPrice`] ? 'border-red-500' : 'border-gray-300'}`}
          min="0"
          step="0.01"
          data-testid={`unitPrice-${item.id}`}
        />
        {errors[`${item.id}-unitPrice`] && (
          <p className="text-red-500 text-xs mt-1">{errors[`${item.id}-unitPrice`]}</p>
        )}
      </div>

      <div className="col-span-2">
        <select
          value={item.taxRate}
          onChange={(e) => onUpdate(item.id, { taxRate: parseFloat(e.target.value) })}
          className="w-full p-2 border border-gray-300 rounded"
          data-testid={`taxRate-${item.id}`}
        >
          {TAX_RATES.map(rate => (
            <option key={rate} value={rate}>{rate}%</option>
          ))}
        </select>
      </div>

      <div className="col-span-1 text-right font-semibold">
        <span data-testid={`lineTotal-${item.id}`}>
          {formatCurrency(lineTotal, currency)}
        </span>
      </div>

      <div className="col-span-1">
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded"
          data-testid={`remove-${item.id}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};


export default LineItem;