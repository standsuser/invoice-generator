// LineItem.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import  LineItem  from '../components/LineItem';

const mockItem = {
  id: 'item-1',
  description: 'Test Service',
  quantity: 2,
  unitPrice: 100,
  taxRate: 10
};

const mockOnUpdate = jest.fn();
const mockOnRemove = jest.fn();

describe('LineItem', () => {
  beforeEach(() => {
    mockOnUpdate.mockClear();
    mockOnRemove.mockClear();
  });

  test('renders line item fields with correct values', () => {
    render(
      <LineItem
        item={mockItem}
        currency="USD"
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByTestId('description-item-1')).toHaveValue('Test Service');
    expect(screen.getByTestId('quantity-item-1')).toHaveValue(2);
    expect(screen.getByTestId('unitPrice-item-1')).toHaveValue(100);
    expect(screen.getByTestId('taxRate-item-1')).toHaveValue('10');
  });

  test('calculates line total correctly with tax', () => {
    render(
      <LineItem
        item={mockItem}
        currency="USD"
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
      />
    );

    // quantity(2) * unitPrice(100) = 200, tax(10%) = 20, total = 220
    expect(screen.getByTestId('lineTotal-item-1')).toHaveTextContent('$220.00');
  });

  test('calculates line total correctly without tax', () => {
    const itemWithoutTax = { ...mockItem, taxRate: 0 };
    
    render(
      <LineItem
        item={itemWithoutTax}
        currency="USD"
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
      />
    );

    // quantity(2) * unitPrice(100) = 200, no tax = 200
    expect(screen.getByTestId('lineTotal-item-1')).toHaveTextContent('$200.00');
  });

  test('calls onUpdate when description changes', () => {
    render(
      <LineItem
        item={mockItem}
        currency="USD"
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
      />
    );

    const descriptionInput = screen.getByTestId('description-item-1');
    fireEvent.change(descriptionInput, { target: { value: 'Updated Service' } });

    expect(mockOnUpdate).toHaveBeenCalledWith('item-1', { description: 'Updated Service' });
  });

  test('calls onUpdate when quantity changes', () => {
    render(
      <LineItem
        item={mockItem}
        currency="USD"
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
      />
    );

    const quantityInput = screen.getByTestId('quantity-item-1');
    fireEvent.change(quantityInput, { target: { value: '3' } });

    expect(mockOnUpdate).toHaveBeenCalledWith('item-1', { quantity: 3 });
  });

  test('calls onUpdate when unit price changes', () => {
    render(
      <LineItem
        item={mockItem}
        currency="USD"
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
      />
    );

    const unitPriceInput = screen.getByTestId('unitPrice-item-1');
    fireEvent.change(unitPriceInput, { target: { value: '150' } });

    expect(mockOnUpdate).toHaveBeenCalledWith('item-1', { unitPrice: 150 });
  });

  test('calls onUpdate when tax rate changes', () => {
    render(
      <LineItem
        item={mockItem}
        currency="USD"
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
      />
    );

    const taxRateSelect = screen.getByTestId('taxRate-item-1');
    fireEvent.change(taxRateSelect, { target: { value: '15' } });

    expect(mockOnUpdate).toHaveBeenCalledWith('item-1', { taxRate: 15 });
  });

  test('calls onRemove when remove button is clicked', () => {
    render(
      <LineItem
        item={mockItem}
        currency="USD"
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
      />
    );

    const removeButton = screen.getByTestId('remove-item-1');
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith('item-1');
  });

  test('shows validation errors', () => {
    const errors = {
      'item-1-description': 'Description is required',
      'item-1-quantity': 'Quantity must be greater than 0',
      'item-1-unitPrice': 'Unit price cannot be negative'
    };

    render(
      <LineItem
        item={mockItem}
        currency="USD"
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
        errors={errors}
      />
    );

    expect(screen.getByText('Description is required')).toBeInTheDocument();
    expect(screen.getByText('Quantity must be greater than 0')).toBeInTheDocument();
    expect(screen.getByText('Unit price cannot be negative')).toBeInTheDocument();
  });

  test('formats currency correctly for different currencies', () => {
    render(
      <LineItem
        item={mockItem}
        currency="EUR"
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByTestId('lineTotal-item-1')).toHaveTextContent('€220.00');
  });
});