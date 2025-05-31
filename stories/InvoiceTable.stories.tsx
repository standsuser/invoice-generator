// InvoiceTable.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import InvoiceTable from '../components/InvoiceTable';

const meta: Meta<typeof InvoiceTable> = {
  title: 'Invoice/InvoiceTable',
  component: InvoiceTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Table component that manages multiple line items with automatic calculations for subtotals, taxes, and grand total.'
      }
    }
  },
  argTypes: {
    items: {
      description: 'Array of line items',
      control: { type: 'object' }
    },
    currency: {
      description: 'Currency code for formatting',
      control: { type: 'select' },
      options: ['USD', 'EUR', 'GBP', 'JPY']
    },
    onUpdateItem: { action: 'item updated' },
    onRemoveItem: { action: 'item removed' },
    onAddItem: { action: 'item added' },
    errors: {
      description: 'Validation errors object',
      control: { type: 'object' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof InvoiceTable>;

export const EmptyTable: Story = {
  args: {
    items: [],
    currency: 'USD',
    errors: {}
  }
};

export const SingleItem: Story = {
  args: {
    items: [
      {
        id: 'item-1',
        description: 'Website Design',
        quantity: 1,
        unitPrice: 2500,
        taxRate: 10
      }
    ],
    currency: 'USD',
    errors: {}
  }
};

export const MultipleItems: Story = {
  args: {
    items: [
      {
        id: 'item-1',
        description: 'Website Design',
        quantity: 1,
        unitPrice: 2500,
        taxRate: 10
      },
      {
        id: 'item-2',
        description: 'SEO Optimization',
        quantity: 3,
        unitPrice: 500,
        taxRate: 15
      },
      {
        id: 'item-3',
        description: 'Content Writing',
        quantity: 10,
        unitPrice: 75,
        taxRate: 5
      }
    ],
    currency: 'USD',
    errors: {}
  }
};

export const VariedTaxRatesEUR: Story = {
  args: {
    items: [
      {
        id: 'item-1',
        description: 'Basic Service (No Tax)',
        quantity: 2,
        unitPrice: 100,
        taxRate: 0
      },
      {
        id: 'item-2',
        description: 'Standard Service',
        quantity: 1,
        unitPrice: 300,
        taxRate: 10
      },
      {
        id: 'item-3',
        description: 'Premium Service',
        quantity: 1,
        unitPrice: 500,
        taxRate: 25
      }
    ],
    currency: 'EUR',
    errors: {}
  }
};

export const WithValidationErrors: Story = {
  args: {
    items: [
      {
        id: 'item-1',
        description: '',
        quantity: 0,
        unitPrice: -100,
        taxRate: 10
      },
      {
        id: 'item-2',
        description: 'Valid Item',
        quantity: 2,
        unitPrice: 250,
        taxRate: 15
      }
    ],
    currency: 'USD',
    errors: {
      'item-1-description': 'Description is required',
      'item-1-quantity': 'Quantity must be greater than 0',
      'item-1-unitPrice': 'Unit price cannot be negative'
    }
  }
};
