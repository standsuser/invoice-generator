// LineItem.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import LineItem from '../components/LineItem';

const meta: Meta<typeof LineItem> = {
  title: 'Invoice/LineItem',
  component: LineItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A reusable line item component for invoice entries with quantity, price, tax calculations and validation.'
      }
    }
  },
  argTypes: {
    item: {
      description: 'Line item data object',
      control: { type: 'object' }
    },
    currency: {
      description: 'Currency code for formatting',
      control: { type: 'select' },
      options: ['USD', 'EUR', 'GBP', 'JPY']
    },
    onUpdate: { action: 'updated' },
    onRemove: { action: 'removed' },
    errors: {
      description: 'Validation errors object',
      control: { type: 'object' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof LineItem>;

export const Default: Story = {
  args: {
    item: {
      id: 'item-1',
      description: '',
      quantity: 1,
      unitPrice: 0,
      taxRate: 0
    },
    currency: 'USD',
    errors: {}
  }
};

export const PreFilled: Story = {
  args: {
    item: {
      id: 'item-1',
      description: 'Web Development Services',
      quantity: 10,
      unitPrice: 150,
      taxRate: 10
    },
    currency: 'USD',
    errors: {}
  }
};

export const WithValidationErrors: Story = {
  args: {
    item: {
      id: 'item-1',
      description: '',
      quantity: -1,
      unitPrice: -50,
      taxRate: 0
    },
    currency: 'USD',
    errors: {
      'item-1-description': 'Description is required',
      'item-1-quantity': 'Quantity must be greater than 0',
      'item-1-unitPrice': 'Unit price cannot be negative'
    }
  }
};

export const HighTaxRate: Story = {
  args: {
    item: {
      id: 'item-1',
      description: 'Luxury Consulting',
      quantity: 5,
      unitPrice: 500,
      taxRate: 25
    },
    currency: 'EUR',
    errors: {}
  }
};

export const FractionalQuantity: Story = {
  args: {
    item: {
      id: 'item-1',
      description: 'Hourly Consulting (2.5 hours)',
      quantity: 2.5,
      unitPrice: 120,
      taxRate: 15
    },
    currency: 'GBP',
    errors: {}
  }
};