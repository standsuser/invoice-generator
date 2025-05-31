'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Trash2, Plus, Download, FileText } from 'lucide-react';
import InvoiceForm from './InvoiceForm';
import InvoiceTable from './InvoiceTable';
import InvoicePreview from './InvoicePreview';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  formatCurrency,
  generateInvoiceNumber,
  calculateLineTotal,
  CURRENCIES,
  TAX_RATES
} from './invoice';

// Main InvoiceGenerator Component
const InvoiceGenerator: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(() => ({
    clientName: '',
    clientEmail: '',
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    currency: 'USD',
    notes: '',
    lineItems: []
  }));

  // Ref to invoice preview container for PDF export
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInvoiceData(prev => ({
      ...prev,
      invoiceNumber: generateInvoiceNumber(),
      invoiceDate: new Date().toISOString().split('T')[0],
    }));
  }, []);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = useCallback((): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!invoiceData.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }
    if (!invoiceData.invoiceDate) {
      newErrors.invoiceDate = 'Invoice date is required';
    }
    if (!invoiceData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else if (invoiceData.invoiceDate && invoiceData.dueDate < invoiceData.invoiceDate) {
      newErrors.dueDate = 'Due date cannot be before invoice date';
    }

    invoiceData.lineItems.forEach(item => {
      if (!item.description.trim()) {
        newErrors[`${item.id}-description`] = 'Description is required';
      }
      if (item.quantity <= 0) {
        newErrors[`${item.id}-quantity`] = 'Quantity must be greater than 0';
      }
      if (item.unitPrice < 0) {
        newErrors[`${item.id}-unitPrice`] = 'Unit price cannot be negative';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [invoiceData]);

  const updateInvoiceData = useCallback((updates: Partial<InvoiceData>) => {
    setInvoiceData(prev => ({ ...prev, ...updates }));
  }, []);

  const updateLineItem = useCallback((id: string, updates: Partial<LineItem>) => {
    setInvoiceData(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    }));
  }, []);

  const addLineItem = useCallback(() => {
    const newItem: LineItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      description: '',
      quantity: 1,
      unitPrice: 0,
      taxRate: 0
    };

    setInvoiceData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, newItem]
    }));
  }, []);

  const removeLineItem = useCallback((id: string) => {
    setInvoiceData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id)
    }));
  }, []);

  const handleExportPDF = useCallback(async () => {
    if (!validateForm()) {
      alert('Please fix the validation errors before exporting.');
      return;
    }

    if (!previewRef.current) {
      alert('Invoice preview is not available for PDF export.');
      return;
    }

    try {
      const element = previewRef.current;

      // Use html2canvas to render the preview div to a canvas
      const canvas = await html2canvas(element, { scale: 2 });

      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        unit: 'pt',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${invoiceData.invoiceNumber || 'export'}.pdf`);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('An error occurred while exporting the PDF.');
    }
  }, [invoiceData, validateForm]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Invoice Generator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form and Table */}
          <div className="space-y-6">
            <InvoiceForm
              data={invoiceData}
              onUpdate={updateInvoiceData}
              errors={errors}
            />

            <div className="p-6 bg-white rounded-lg border">
              <InvoiceTable
                items={invoiceData.lineItems}
                currency={invoiceData.currency}
                onUpdateItem={updateLineItem}
                onRemoveItem={removeLineItem}
                onAddItem={addLineItem}
                errors={errors}
              />
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-4">
            <InvoicePreview
              data={invoiceData}
              onExportPDF={handleExportPDF}
              previewRef={previewRef} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
