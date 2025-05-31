// InvoiceGenerator.stories.tsx 
import type { Meta, StoryObj } from '@storybook/react';
import InvoiceGenerator from '../components/InvoiceGenerator';

const meta: Meta<typeof InvoiceGenerator> = {
  title: 'Invoice/InvoiceGenerator',
  component: InvoiceGenerator,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete invoice generation workflow combining form input, line item management, and preview functionality with state management and validation.'
      }
    }
  },
  argTypes: {
    initialData: {
      description: 'Initial form data for pre-filling',
      control: { type: 'object' }
    },
    onSave: { action: 'invoice saved' },
    onExport: { action: 'invoice exported' }
  }
};

export default meta;
type Story = StoryObj<typeof InvoiceGenerator>;

export const BlankWorkflow: Story = {
  args: {
    initialData: null
  }
};

export const PrefilledFreelancer: Story = {
  args: {
    initialData: {
      formData: {
        clientName: 'StartupXYZ Inc.',
        clientEmail: 'founders@startupxyz.com',
        invoiceNumber: 'INV-FREELANCE-2025-012',
        invoiceDate: '2025-05-31',
        dueDate: '2025-06-15',
        currency: 'USD',
        notes: 'Freelance development services\nPayment via PayPal or bank transfer',
        lineItems: []
      },
      lineItems: [
        {
          id: 'item-1',
          description: 'React Frontend Development',
          quantity: 40,
          unitPrice: 75,
          taxRate: 0
        },
        {
          id: 'item-2',
          description: 'API Integration & Testing',
          quantity: 16,
          unitPrice: 85,
          taxRate: 0
        },
        {
          id: 'item-3',
          description: 'Code Review & Documentation',
          quantity: 8,
          unitPrice: 65,
          taxRate: 0
        }
      ]
    }
  }
};

export const PrefilledAgency: Story = {
  args: {
    initialData: {
      formData: {
        clientName: 'MegaCorp Industries',
        clientEmail: 'procurement@megacorp.com',
        invoiceNumber: 'INV-AGENCY-2025-Q2-045',
        invoiceDate: '2025-05-31',
        dueDate: '2025-07-01',
        currency: 'USD',
        notes: `Project: Q2 Digital Transformation Initiative
Phase: Implementation & Training
Contract Reference: MC-2025-DT-001

Payment Terms: Net 30 days
Late fees apply after due date
Contact: projects@youragency.com`,
        lineItems: []
      },
      lineItems: [
        {
          id: 'item-1',
          description: 'Project Management & Coordination',
          quantity: 60,
          unitPrice: 125,
          taxRate: 8.5
        },
        {
          id: 'item-2',
          description: 'Senior Developer Hours',
          quantity: 120,
          unitPrice: 165,
          taxRate: 8.5
        },
        {
          id: 'item-3',
          description: 'UI/UX Design Services',
          quantity: 80,
          unitPrice: 145,
          taxRate: 8.5
        },
        {
          id: 'item-4',
          description: 'Quality Assurance & Testing',
          quantity: 40,
          unitPrice: 95,
          taxRate: 8.5
        },
        {
          id: 'item-5',
          description: 'Staff Training & Knowledge Transfer',
          quantity: 24,
          unitPrice: 180,
          taxRate: 8.5
        },
        {
          id: 'item-6',
          description: 'Technical Documentation',
          quantity: 1,
          unitPrice: 2500,
          taxRate: 8.5
        }
      ]
    }
  }
};

export const InternationalClient: Story = {
  args: {
    initialData: {
      formData: {
        clientName: 'Amsterdam Digital BV',
        clientEmail: 'facturen@amsterdamdigital.nl',
        invoiceNumber: 'INV-INT-2025-NL-089',
        invoiceDate: '2025-05-31',
        dueDate: '2025-06-30',
        currency: 'EUR',
        notes: `International Services Agreement
VAT Reverse Charge Applicable
Client VAT: NL123456789B01

Wire Transfer Details:
IBAN: DE89 3704 0044 0532 0130 00
BIC: COBADEFFXXX

Service Period: May 2025
Reference: AMS-DIG-2025-05`,
        lineItems: []
      },
      lineItems: [
        {
          id: 'item-1',
          description: 'Cross-border E-commerce Platform Development',
          quantity: 1,
          unitPrice: 15000,
          taxRate: 0  // Reverse charge
        },
        {
          id: 'item-2',
          description: 'Multi-language Content Management System',
          quantity: 1,
          unitPrice: 8500,
          taxRate: 0  // Reverse charge
        },
        {
          id: 'item-3',
          description: 'Payment Gateway Integration (Multiple EU Countries)',
          quantity: 1,
          unitPrice: 4200,
          taxRate: 0  // Reverse charge
        },
        {
          id: 'item-4',
          description: 'GDPR Compliance Implementation',
          quantity: 32,
          unitPrice: 180,
          taxRate: 0  // Reverse charge
        }
      ]
    }
  }
};

export const SmallBusinessLocal: Story = {
  args: {
    initialData: {
      formData: {
        clientName: "Joe's Local Bakery",
        clientEmail: 'joe@localBakery.com',
        invoiceNumber: 'INV-LOCAL-2025-003',
        invoiceDate: '2025-05-31',
        dueDate: '2025-06-07',
        currency: 'USD',
        notes: `Thank you for supporting local business!
Website launch scheduled for June 15th
Training session included on June 20th`,
        lineItems: []
      },
      lineItems: [
        {
          id: 'item-1',
          description: 'Small Business Website Design',
          quantity: 1,
          unitPrice: 1200,
          taxRate: 7.5
        },
        {
          id: 'item-2',
          description: 'Online Ordering System Setup',
          quantity: 1,
          unitPrice: 800,
          taxRate: 7.5
        },
        {
          id: 'item-3',
          description: 'SEO Optimization & Google My Business',
          quantity: 1,
          unitPrice: 350,
          taxRate: 7.5
        },
        {
          id: 'item-4',
          description: 'Staff Training Session',
          quantity: 2,
          unitPrice: 75,
          taxRate: 7.5
        }
      ]
    }
  }
};

export const RecurringServiceInvoice: Story = {
  args: {
    initialData: {
      formData: {
        clientName: 'TechFlow Solutions',
        clientEmail: 'billing@techflow.com',
        invoiceNumber: 'INV-RECURRING-2025-05-001',
        invoiceDate: '2025-05-31',
        dueDate: '2025-06-15',
        currency: 'USD',
        notes: `Monthly Recurring Services - May 2025
Next invoice: July 1st, 2025
Auto-pay available upon request
Service Level Agreement: 99.9% uptime guaranteed`,
        lineItems: []
      },
      lineItems: [
        {
          id: 'item-1',
          description: 'Cloud Hosting & Infrastructure (Monthly)',
          quantity: 1,
          unitPrice: 450,
          taxRate: 8
        },
        {
          id: 'item-2',
          description: 'Website Maintenance & Updates',
          quantity: 1,
          unitPrice: 350,
          taxRate: 8
        },
        {
          id: 'item-3',
          description: 'Security Monitoring & Backups',
          quantity: 1,
          unitPrice: 200,
          taxRate: 8
        },
        {
          id: 'item-4',
          description: 'Technical Support Hours (5 hours included)',
          quantity: 1,
          unitPrice: 300,
          taxRate: 8
        },
        {
          id: 'item-5',
          description: 'Additional Support Hours Used',
          quantity: 3,
          unitPrice: 95,
          taxRate: 8
        }
      ]
    }
  }
};