import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvoiceForm from '../components/InvoiceForm';

const mockData = {
  clientName: '',
  clientEmail: '',
  invoiceNumber: 'INV-123456-789',
  invoiceDate: '2025-05-31',
  dueDate: '2025-06-30',
  currency: 'USD',
  notes: '',
  lineItems: []
};

const mockOnUpdate = jest.fn();

describe('InvoiceForm', () => {
  beforeEach(() => {
    mockOnUpdate.mockClear();
  });

  test('renders all form fields', () => {
    render(<InvoiceForm data={mockData} onUpdate={mockOnUpdate} />);
    
    expect(screen.getByTestId('client-name')).toBeInTheDocument();
    expect(screen.getByTestId('client-email')).toBeInTheDocument();
    expect(screen.getByTestId('invoice-number')).toBeInTheDocument();
    expect(screen.getByTestId('invoice-date')).toBeInTheDocument();
    expect(screen.getByTestId('due-date')).toBeInTheDocument();
    expect(screen.getByTestId('currency-selector')).toBeInTheDocument();
    expect(screen.getByTestId('notes')).toBeInTheDocument();
  });

  test('shows validation errors for required fields', () => {
    const errors = {
      clientName: 'Client name is required',
      invoiceDate: 'Invoice date is required',
      dueDate: 'Due date is required'
    };

    render(<InvoiceForm data={mockData} onUpdate={mockOnUpdate} errors={errors} />);
    
    expect(screen.getByText('Client name is required')).toBeInTheDocument();
    expect(screen.getByText('Invoice date is required')).toBeInTheDocument();
    expect(screen.getByText('Due date is required')).toBeInTheDocument();
  });

  test('calls onUpdate when client name changes', () => {
    render(<InvoiceForm data={mockData} onUpdate={mockOnUpdate} />);
    
    const clientNameInput = screen.getByTestId('client-name');
    fireEvent.change(clientNameInput, { target: { value: 'John Doe' } });
    
    expect(mockOnUpdate).toHaveBeenCalledWith({ clientName: 'John Doe' });
  });

  test('currency selector shows correct options', () => {
    render(<InvoiceForm data={mockData} onUpdate={mockOnUpdate} />);
    
    const currencySelect = screen.getByTestId('currency-selector');
    expect(currencySelect).toHaveValue('USD');
    
    fireEvent.change(currencySelect, { target: { value: 'EUR' } });
    expect(mockOnUpdate).toHaveBeenCalledWith({ currency: 'EUR' });
  });

  test('invoice number is readonly', () => {
    render(<InvoiceForm data={mockData} onUpdate={mockOnUpdate} />);
    
    const invoiceNumberInput = screen.getByTestId('invoice-number');
    expect(invoiceNumberInput).toHaveAttribute('readonly');
    expect(invoiceNumberInput).toHaveValue('INV-123456-789');
  });

  test('validates due date is not before invoice date', () => {
    const errors = {
      dueDate: 'Due date cannot be before invoice date'
    };

    render(<InvoiceForm data={mockData} onUpdate={mockOnUpdate} errors={errors} />);
    
    expect(screen.getByText('Due date cannot be before invoice date')).toBeInTheDocument();
  });
});