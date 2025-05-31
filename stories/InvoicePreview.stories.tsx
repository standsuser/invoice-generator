// InvoicePreview.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import InvoicePreview from '../components/InvoicePreview';

const meta: Meta<typeof InvoicePreview> = {
  title: 'Invoice/InvoicePreview',
  component: InvoicePreview,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Preview component that displays a formatted, print-ready invoice with all details and calculations.'
      }
    }
  },
  argTypes: {
    data: {
      description: 'Invoice data (client info, items, notes)',
      control: { type: 'object' }
    },
    onExportPDF: {
      action: 'exportPDF triggered'
    }
  }
};

export default meta;
type Story = StoryObj<typeof InvoicePreview>;

export const EmptyInvoice: Story = {
  args: {
    data: {
      clientName: '',
      clientEmail: '',
      invoiceNumber: 'INV-000000-000',
      invoiceDate: '',
      dueDate: '',
      currency: 'USD',
      notes: '',
      lineItems: []
    },
    onExportPDF: () => {}
  }
};

export const CompleteInvoiceUSD: Story = {
  args: {
    data: {
      clientName: 'Acme Corporation',
      clientEmail: 'accounting@acme.com',
      invoiceNumber: 'INV-2025-001',
      invoiceDate: '2025-05-31',
      dueDate: '2025-06-30',
      currency: 'USD',
      notes: 'Payment terms: Net 30 days\nThank you for your business!',
      lineItems: [
        {
          id: 'item-1',
          description: 'Website Design & Development',
          quantity: 1,
          unitPrice: 3500,
          taxRate: 10
        },
        {
          id: 'item-2',
          description: 'SEO Optimization Package',
          quantity: 2,
          unitPrice: 750,
          taxRate: 10
        },
        {
          id: 'item-3',
          description: 'Monthly Maintenance (6 months)',
          quantity: 6,
          unitPrice: 200,
          taxRate: 8
        }
      ]
    },
    onExportPDF: () => {}
  }
};

export const InvoiceWithLongDescriptions: Story = {
  args: {
    data: {
      clientName: 'Global Enterprises International LLC',
      clientEmail: 'procurement.department@globalenterprises.com',
      invoiceNumber: 'INV-LONG-2025-042',
      invoiceDate: '2025-05-31',
      dueDate: '2025-07-15',
      currency: 'EUR',
      notes: 'Extended payment terms negotiated due to project complexity and international banking requirements.',
      lineItems: [
        {
          id: 'item-1',
          description:
            'Custom Enterprise Resource Planning (ERP) System Development including user authentication, role management, inventory tracking, financial reporting, and integration with existing legacy systems',
          quantity: 1,
          unitPrice: 45000,
          taxRate: 20
        },
        {
          id: 'item-2',
          description:
            'Comprehensive staff training program covering system administration, end-user workflows, troubleshooting procedures, and best practice implementation across multiple departments',
          quantity: 8,
          unitPrice: 1200,
          taxRate: 20
        },
        {
          id: 'item-3',
          description:
            'Technical documentation package including system architecture diagrams, API documentation, user manuals, administrator guides, and maintenance procedures',
          quantity: 1,
          unitPrice: 5500,
          taxRate: 15
        }
      ]
    },
    onExportPDF: () => {}
  }
};

export const MultiCurrencyEUR: Story = {
  args: {
    data: {
      clientName: 'European Tech Solutions',
      clientEmail: 'finance@eurotech.eu',
      invoiceNumber: 'INV-EU-2025-067',
      invoiceDate: '2025-05-31',
      dueDate: '2025-06-20',
      currency: 'EUR',
      notes: 'VAT included as per EU regulations\nSEPA payment preferred',
      lineItems: [
        {
          id: 'item-1',
          description: 'Cloud Infrastructure Setup',
          quantity: 3,
          unitPrice: 850,
          taxRate: 21
        },
        {
          id: 'item-2',
          description: 'Database Migration Services',
          quantity: 1,
          unitPrice: 2200,
          taxRate: 21
        }
      ]
    },
    onExportPDF: () => {}
  }
};

export const JapaneseYenInvoice: Story = {
  args: {
    data: {
      clientName: 'Tokyo Digital Agency',
      clientEmail: 'billing@tokyodigital.jp',
      invoiceNumber: 'INV-JP-2025-100',
      invoiceDate: '2025-05-31',
      dueDate: '2025-06-30',
      currency: 'JPY',
      notes: '消費税込み価格\nお支払いをお待ちしております。',
      lineItems: [
        {
          id: 'item-1',
          description: 'Mobile App Development',
          quantity: 1,
          unitPrice: 580000,
          taxRate: 10
        },
        {
          id: 'item-2',
          description: 'UI/UX Design Services',
          quantity: 2,
          unitPrice: 95000,
          taxRate: 10
        }
      ]
    },
    onExportPDF: () => {}
  }
};

export const BritishPoundInvoice: Story = {
  args: {
    data: {
      clientName: 'London Consulting Group',
      clientEmail: 'accounts@londonconsulting.co.uk',
      invoiceNumber: 'INV-UK-2025-234',
      invoiceDate: '2025-05-31',
      dueDate: '2025-06-14',
      currency: 'GBP',
      notes: 'VAT Registration Number: GB123456789\nPayment by BACS preferred',
      lineItems: [
        {
          id: 'item-1',
          description: 'Strategic Business Consultation',
          quantity: 12,
          unitPrice: 300,
          taxRate: 20
        },
        {
          id: 'item-2',
          description: 'Market Research Analysis',
          quantity: 1,
          unitPrice: 1800,
          taxRate: 20
        }
      ]
    },
    onExportPDF: () => {}
  }
};
