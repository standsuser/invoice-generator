import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvoiceGenerator from '../components/InvoiceGenerator';

describe('InvoiceGenerator Integration (without PDF export)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders complete invoice generator', () => {
    render(<InvoiceGenerator />);

    expect(screen.getByText('Invoice Generator')).toBeInTheDocument();
    expect(screen.getByTestId('client-name')).toBeInTheDocument();
    expect(screen.getByTestId('add-item-button')).toBeInTheDocument();
    expect(screen.getByTestId('export-pdf-button')).toBeInTheDocument();
  });

  test('generates unique invoice number on render', () => {
    const { unmount } = render(<InvoiceGenerator />);
    const firstInvoiceNumber = screen.getByTestId('invoice-number').value;
    unmount();

    render(<InvoiceGenerator />);
    const secondInvoiceNumber = screen.getByTestId('invoice-number').value;

    expect(firstInvoiceNumber).not.toBe(secondInvoiceNumber);
    expect(firstInvoiceNumber).toMatch(/^INV-\d{6}-\d{3}$/);
  });

  test('currency change updates all displayed amounts', async () => {
    render(<InvoiceGenerator />);

    // Add an item first
    fireEvent.click(screen.getByTestId('add-item-button'));
    
    await waitFor(() => {
      const priceInputs = screen.getAllByPlaceholderText('Unit Price');
      expect(priceInputs).toHaveLength(1);
    });

    const priceInputs = screen.getAllByPlaceholderText('Unit Price');
    fireEvent.change(priceInputs[0], { target: { value: '100' } });

    // Change currency
    fireEvent.change(screen.getByTestId('currency-selector'), { target: { value: 'EUR' } });

    await waitFor(() => {
      expect(screen.getByTestId('subtotal')).toHaveTextContent('€100.00');
      expect(screen.getByTestId('grand-total')).toHaveTextContent('€100.00');
    });
  });

  test('removing line item updates totals', async () => {
    render(<InvoiceGenerator />);

    // Add two items
    fireEvent.click(screen.getByTestId('add-item-button'));
    fireEvent.click(screen.getByTestId('add-item-button'));

    await waitFor(() => {
      const priceInputs = screen.getAllByPlaceholderText('Unit Price');
      expect(priceInputs).toHaveLength(2);
    });

    const priceInputs = screen.getAllByPlaceholderText('Unit Price');
    fireEvent.change(priceInputs[0], { target: { value: '100' } });
    fireEvent.change(priceInputs[1], { target: { value: '200' } });

    await waitFor(() => {
      expect(screen.getByTestId('subtotal')).toHaveTextContent('$300.00');
    });

    const removeButtons = screen.getAllByTestId((testId) => testId.startsWith('remove-item-'));
    fireEvent.click(removeButtons[0]);


    await waitFor(() => {
      expect(screen.getByTestId('subtotal')).toHaveTextContent('$200.00');
    });
  });

});
