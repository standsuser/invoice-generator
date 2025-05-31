import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvoicePreview from '../components/InvoicePreview';

const mockData = {
  clientName: 'John Doe',
  clientEmail: 'john@example.com',
  invoiceNumber: 'INV-123456',
  invoiceDate: '2025-05-31',
  dueDate: '2025-06-30',
  currency: 'USD',
  notes: 'Payment terms: Net 30',
  lineItems: [
    {
      id: 'item-1',
      description: 'Web Development',
      quantity: 10,
      unitPrice: 150,
      taxRate: 10,
    },
    {
      id: 'item-2',
      description: 'Consultation services',
      quantity: 5,
      unitPrice: 200,
      taxRate: 5,
    },
  ],
};

const mockOnExportPDF = jest.fn();

describe('InvoicePreview Component', () => {
  beforeEach(() => {
    mockOnExportPDF.mockClear();
  });

  test('renders client info, invoice number, totals, and currency correctly', () => {
    render(<InvoicePreview data={mockData} onExportPDF={mockOnExportPDF} previewRef={React.createRef()} />);

    // Client info
    expect(screen.getByTestId('preview-client-name')).toHaveTextContent('John Doe');

    expect(screen.getByText(new RegExp(mockData.invoiceNumber))).toBeInTheDocument();

    expect(screen.getByTestId('preview-subtotal').textContent).toMatch(/\$[\d,]+\.?\d{0,2}/);
    expect(screen.getByTestId('preview-tax').textContent).toMatch(/\$[\d,]+\.?\d{0,2}/);
    expect(screen.getByTestId('preview-total').textContent).toMatch(/\$[\d,]+\.?\d{0,2}/);
  });

  test('updates preview dynamically when data changes', () => {
    const { rerender } = render(<InvoicePreview data={{ ...mockData, clientName: '' }} onExportPDF={mockOnExportPDF} previewRef={React.createRef()} />);
    expect(screen.getByTestId('preview-client-name')).toHaveTextContent(/client name/i);

    const updatedData = { ...mockData, clientName: 'Jane Smith' };
    rerender(<InvoicePreview data={updatedData} onExportPDF={mockOnExportPDF} previewRef={React.createRef()} />);
    expect(screen.getByTestId('preview-client-name')).toHaveTextContent('Jane Smith');
  });

  test('calls onExportPDF handler when export button clicked', () => {
    render(<InvoicePreview data={mockData} onExportPDF={mockOnExportPDF} previewRef={React.createRef()} />);
    fireEvent.click(screen.getByTestId('export-pdf-button'));
    expect(mockOnExportPDF).toHaveBeenCalledTimes(1);
  });
});
