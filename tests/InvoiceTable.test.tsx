// InvoiceTable.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import  InvoiceTable  from '../components/InvoiceTable';

const mockItems = [
  {
    id: 'item-1',
    description: 'Service 1',
    quantity: 2,
    unitPrice: 100,
    taxRate: 10
  },
  {
    id: 'item-2',
    description: 'Service 2',
    quantity: 1,
    unitPrice: 200,
    taxRate: 5
  }
];

const mockCallbacks = {
  onUpdateItem: jest.fn(),
  onRemoveItem: jest.fn(),
  onAddItem: jest.fn()
};

describe('InvoiceTable', () => {
  beforeEach(() => {
    Object.values(mockCallbacks).forEach(fn => fn.mockClear());
  });

  test('renders empty state when no items', () => {
    render(
      <InvoiceTable
        items={[]}
        currency="USD"
        {...mockCallbacks}
      />
    );

    expect(screen.getByTestId('empty-table')).toHaveTextContent('No items added yet');
  });

  test('renders items correctly', () => {
    render(
      <InvoiceTable
        items={mockItems}
        currency="USD"
        {...mockCallbacks}
      />
    );

    expect(screen.getByTestId('description-item-1')).toHaveValue('Service 1');
    expect(screen.getByTestId('description-item-2')).toHaveValue('Service 2');
  });

  test('calculates subtotal correctly', () => {
    render(
      <InvoiceTable
        items={mockItems}
        currency="USD"
        {...mockCallbacks}
      />
    );

    // item1: 2*100 = 200, item2: 1*200 = 200, subtotal = 400
    expect(screen.getByTestId('subtotal')).toHaveTextContent('$400.00');
  });

  test('calculates total tax correctly', () => {
    render(
      <InvoiceTable
        items={mockItems}
        currency="USD"
        {...mockCallbacks}
      />
    );

    // item1 tax: 200*0.1 = 20, item2 tax: 200*0.05 = 10, total tax = 30
    expect(screen.getByTestId('total-tax')).toHaveTextContent('$30.00');
  });

  test('calculates grand total correctly', () => {
    render(
      <InvoiceTable
        items={mockItems}
        currency="USD"
        {...mockCallbacks}
      />
    );

    // subtotal(400) + tax(30) = 430
    expect(screen.getByTestId('grand-total')).toHaveTextContent('$430.00');
  });

  test('calls onAddItem when add button is clicked', () => {
    render(
      <InvoiceTable
        items={mockItems}
        currency="USD"
        {...mockCallbacks}
      />
    );

    const addButton = screen.getByTestId('add-item-button');
    fireEvent.click(addButton);

    expect(mockCallbacks.onAddItem).toHaveBeenCalled();
  });

  test('updates totals when items change', () => {
    const { rerender } = render(
      <InvoiceTable
        items={[mockItems[0]]}
        currency="USD"
        {...mockCallbacks}
      />
    );

    // With one item: subtotal = 200, tax = 20, total = 220
    expect(screen.getByTestId('subtotal')).toHaveTextContent('$200.00');
    expect(screen.getByTestId('total-tax')).toHaveTextContent('$20.00');
    expect(screen.getByTestId('grand-total')).toHaveTextContent('$220.00');

    // Add second item
    rerender(
      <InvoiceTable
        items={mockItems}
        currency="USD"
        {...mockCallbacks}
      />
    );

    // With both items: subtotal = 400, tax = 30, total = 430
    expect(screen.getByTestId('subtotal')).toHaveTextContent('$400.00');
    expect(screen.getByTestId('total-tax')).toHaveTextContent('$30.00');
    expect(screen.getByTestId('grand-total')).toHaveTextContent('$430.00');
  });

  test('formats currency correctly for different currencies', () => {
    render(
      <InvoiceTable
        items={mockItems}
        currency="EUR"
        {...mockCallbacks}
      />
    );

    expect(screen.getByTestId('subtotal')).toHaveTextContent('€400.00');
    expect(screen.getByTestId('total-tax')).toHaveTextContent('€30.00');
    expect(screen.getByTestId('grand-total')).toHaveTextContent('€430.00');
  });
});