
import React, { useState, useCallback, useMemo } from 'react';
import { Trash2, Plus, Download, FileText } from 'lucide-react';
import { formatCurrency, generateInvoiceNumber, calculateLineTotal, CURRENCIES, TAX_RATES } from './invoice';

// InvoiceForm Component
const InvoiceForm: React.FC<{
  data: InvoiceData;
  onUpdate: (updates: Partial<InvoiceData>) => void;
  errors?: { [key: string]: string };
}> = ({ data, onUpdate, errors = {} }) => {
  return (
    <div className="space-y-4 p-6 bg-white rounded-lg border text-black">
      <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Client Name *</label>
          <input
            type="text"
            value={data.clientName}
            onChange={(e) => onUpdate({ clientName: e.target.value })}
            className={`w-full p-2 border rounded ${errors.clientName ? 'border-red-500' : 'border-gray-300'}`}
            data-testid="client-name"
          />
          {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Client Email</label>
          <input
            type="email"
            value={data.clientEmail}
            onChange={(e) => onUpdate({ clientEmail: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            data-testid="client-email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Invoice Number</label>
          <input
            type="text"
            value={data.invoiceNumber}
            onChange={(e) => onUpdate({ invoiceNumber: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded bg-gray-50"
            readOnly
            data-testid="invoice-number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Currency</label>
          <select
            value={data.currency}
            onChange={(e) => onUpdate({ currency: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            data-testid="currency-selector"
          >
            {Object.entries(CURRENCIES).map(([code, info]) => (
              <option key={code} value={code}>
                {info.symbol} {info.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Invoice Date *</label>
          <input
            type="date"
            value={data.invoiceDate}
            onChange={(e) => onUpdate({ invoiceDate: e.target.value })}
            className={`w-full p-2 border rounded ${errors.invoiceDate ? 'border-red-500' : 'border-gray-300'}`}
            data-testid="invoice-date"
          />
          {errors.invoiceDate && <p className="text-red-500 text-xs mt-1">{errors.invoiceDate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Due Date *</label>
          <input
            type="date"
            value={data.dueDate}
            onChange={(e) => onUpdate({ dueDate: e.target.value })}
            className={`w-full p-2 border rounded ${errors.dueDate ? 'border-red-500' : 'border-gray-300'}`}
            data-testid="due-date"
          />
          {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <textarea
          value={data.notes}
          onChange={(e) => onUpdate({ notes: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded h-20"
          placeholder="Additional notes or terms..."
          data-testid="notes"
        />
      </div>
    </div>
  );
};

export default InvoiceForm;
