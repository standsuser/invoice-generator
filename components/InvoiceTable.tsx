

import React, { useState, useCallback, useMemo } from 'react';
import { Trash2, Plus, Download, FileText } from 'lucide-react';
import LineItem from './LineItem';
import { formatCurrency, generateInvoiceNumber, calculateLineTotal, CURRENCIES, TAX_RATES } from './invoice';

// InvoiceTable Component
const InvoiceTable: React.FC<{
  items: LineItem[];
  currency: string;
  onUpdateItem: (id: string, updates: Partial<LineItem>) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: () => void;
  errors?: { [key: string]: string };
}> = ({ items, currency, onUpdateItem, onRemoveItem, onAddItem, errors }) => {
  const calculations = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const totalTax = items.reduce((sum, item) => {
      const itemSubtotal = item.quantity * item.unitPrice;
      return sum + (itemSubtotal * (item.taxRate / 100));
    }, 0);
    const grandTotal = subtotal + totalTax;

    return { subtotal, totalTax, grandTotal };
  }, [items]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-black">
        <h3 className="text-lg font-semibold">Invoice Items</h3>
        <button
          onClick={onAddItem}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          data-testid="add-item-button"
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-2 p-2 bg-gray-50 text-black font-semibold text-sm">
          <div className="col-span-4">Description</div>
          <div className="col-span-2">Quantity</div>
          <div className="col-span-2">Unit Price</div>
          <div className="col-span-2">Tax Rate</div>
          <div className="col-span-1 text-right">Total</div>
          <div className="col-span-1"></div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8 text-black" data-testid="empty-table">
            No items added yet. Click "Add Item" to get started.
          </div>
        ) : (
          items.map(item => (
            <LineItem
              key={item.id}
              item={item}
              currency={currency}
              onUpdate={onUpdateItem}
              onRemove={onRemoveItem}
              errors={errors}
            />
          ))
        )}
      </div>

      <div className="border-t pt-4 space-y-2 text-black">
        <div className="flex justify-between text-lg">
          <span>Subtotal:</span>
          <span data-testid="subtotal">{formatCurrency(calculations.subtotal, currency)}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Tax:</span>
          <span data-testid="total-tax">{formatCurrency(calculations.totalTax, currency)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold border-t pt-2">
          <span>Grand Total:</span>
          <span data-testid="grand-total">{formatCurrency(calculations.grandTotal, currency)}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
