import React from 'react';
import { Download } from 'lucide-react';
import { formatCurrency, calculateLineTotal } from './invoice';

const InvoicePreview: React.FC<{
  data: InvoiceData;
  onExportPDF: () => void;
  previewRef: React.RefObject<HTMLDivElement>;
}> = ({ data, onExportPDF, previewRef }) => {
  // Calculate subtotal, tax, total
  const subtotal = data.lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const totalTax = data.lineItems.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.unitPrice;
    return sum + (itemSubtotal * (item.taxRate / 100));
  }, 0);
  const grandTotal = subtotal + totalTax;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-black">
        <h2 className="text-xl font-bold">Invoice Preview</h2>
        <button
          onClick={onExportPDF}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          data-testid="export-pdf-button"
        >
          <Download size={16} />
          Export PDF
        </button>
      </div>

      <div
        ref={previewRef}
        className="p-8 bg-white rounded-lg border print:shadow-none text-black"
        data-testid="invoice-preview"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
            <p className="text-gray-600 mt-2">Invoice #{data.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Invoice Date: {data.invoiceDate || 'Not set'}</p>
            <p className="text-sm text-gray-600">Due Date: {data.dueDate || 'Not set'}</p>
          </div>
        </div>

        {/* Client Info */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-2">Bill To:</h3>
          <p className="text-gray-700" data-testid="preview-client-name">
            {data.clientName || 'Client Name'}
          </p>
          {data.clientEmail && (
            <p className="text-gray-600 text-sm">{data.clientEmail}</p>
          )}
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2 font-semibold">Description</th>
                <th className="text-center py-2 font-semibold w-20">Qty</th>
                <th className="text-right py-2 font-semibold w-24">Unit Price</th>
                <th className="text-center py-2 font-semibold w-20">Tax</th>
                <th className="text-right py-2 font-semibold w-24">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.lineItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No items added
                  </td>
                </tr>
              ) : (
                data.lineItems.map(item => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-2">{item.description || 'Item description'}</td>
                    <td className="text-center py-2">{item.quantity}</td>
                    <td className="text-right py-2">
                      {formatCurrency(item.unitPrice, data.currency)}
                    </td>
                    <td className="text-center py-2">{item.taxRate}%</td>
                    <td className="text-right py-2">
                      {formatCurrency(calculateLineTotal(item), data.currency)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="text-right">
        <p data-testid="preview-subtotal">
            <span className="font-semibold">Subtotal: </span>
            {formatCurrency(subtotal, data.currency)}
        </p>
        <p data-testid="preview-tax">
            <span className="font-semibold">Tax: </span>
            {formatCurrency(totalTax, data.currency)}
        </p>
        <p data-testid="preview-total" className="font-semibold text-lg">
            Total: {formatCurrency(grandTotal, data.currency)}
        </p>
        </div>


        {/* Notes */}
        {data.notes && (
          <div className="mt-8 border-t pt-4 text-gray-700 whitespace-pre-wrap">
            <strong>Notes:</strong>
            <p>{data.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicePreview;
