// InvoiceForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import InvoiceForm from '../components/InvoiceForm';

const meta: Meta<typeof InvoiceForm> = {
  title: 'Invoice/InvoiceForm',
  component: InvoiceForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Form component for invoice metadata including client information, dates, currency, and notes.'
      }
    }
  },
  argTypes: {
    data: {
      description: 'Invoice form data object',
      control: { type: 'object' }
    },
    onUpdate: { action: 'form updated' },
    errors: {
      description: 'Form validation errors',
      control: { type: 'object' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof InvoiceForm>;

export const BlankForm: Story = {
  args: {
    data: {
      clientName: '',
      clientEmail: '',
      invoiceNumber: 'INV-123456-789',
      invoiceDate: '',
      dueDate: '',
      currency: 'USD',
      notes: '',
      lineItems: []
    },
    errors: {}
  }
};

export const PreFilledForm: Story = {
  args: {
    data: {
      clientName: 'Acme Corporation',
      clientEmail: 'accounting@acme.com',
      invoiceNumber: 'INV-654321-ABC',
      invoiceDate: '2025-05-31',
      dueDate: '2025-06-30',
      currency: 'USD',
      notes: 'Payment terms: Net 30 days\nThank you for your business!',
      lineItems: []
    },
    errors: {}
  }
};

export const InvalidDateRange: Story = {
  args: {
    data: {
      clientName: 'Test Client',
      clientEmail: 'test@client.com',
      invoiceNumber: 'INV-999999-ERR',
      invoiceDate: '2025-06-15',
      dueDate: '2025-05-31',
      currency: 'EUR',
      notes: '',
      lineItems: []
    },
    errors: {
      dueDate: 'Due date cannot be before invoice date'
    }
  }
};

export const WithValidationErrors: Story = {
  args: {
    data: {
      clientName: '',
      clientEmail: 'invalid-email',
      invoiceNumber: 'INV-000000-000',
      invoiceDate: '',
      dueDate: '',
      currency: 'GBP',
      notes: '',
      lineItems: []
    },
    errors: {
      clientName: 'Client name is required',
      clientEmail: 'Please enter a valid email address',
      invoiceDate: 'Invoice date is required',
      dueDate: 'Due date is required'
    }
  }
};

export const JapaneseYenCurrency: Story = {
  args: {
    data: {
      clientName: 'Tokyo Software Inc.',
      clientEmail: 'contracts@tokyosoft.jp',
      invoiceNumber: 'INV-JP-2025-001',
      invoiceDate: '2025-05-31',
      dueDate: '2025-07-15',
      currency: 'JPY',
      notes: 'お支払いありがとうございます。\nPayment in Japanese Yen.',
      lineItems: []
    },
    errors: {}
  }
};

export const LongNotesSection: Story = {
  args: {
    data: {
      clientName: 'Enterprise Solutions Ltd.',
      clientEmail: 'billing@enterprise.com',
      invoiceNumber: 'INV-ENT-2025-042',
      invoiceDate: '2025-05-31',
      dueDate: '2025-06-15',
      currency: 'USD',
      notes: `Payment Terms: Net 15 days
Late Payment: 1.5% per month on overdue amounts
Bank Details: 
  Account Name: Your Company Name
  Account Number: 1234567890
  Routing Number: 987654321
  Swift Code: ABCDUS33

Thank you for choosing our services. We appreciate your business and look forward to continuing our partnership.

For any questions regarding this invoice, please contact our billing department at billing@yourcompany.com or call (555) 123-4567.`,
      lineItems: []
    },
    errors: {}
  }
};