'use client';
const formatCurrency = (amount: number, currency: string): string => {
  const currencyInfo = CURRENCIES[currency] || CURRENCIES.USD;
  return `${currencyInfo.symbol}${amount.toFixed(2)}`;
};

const generateInvoiceNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `INV-${timestamp}-${random}`;
};

const calculateLineTotal = (quantity: number, unitPrice: number, taxRate: number): number => {
  const subtotal = quantity * unitPrice;
  const tax = subtotal * (taxRate / 100);
  return subtotal + tax;
};
// Currency configurations
const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', name: 'US Dollar' },
  EUR: { symbol: '€', code: 'EUR', name: 'Euro' },
  GBP: { symbol: '£', code: 'GBP', name: 'British Pound' },
  JPY: { symbol: '¥', code: 'JPY', name: 'Japanese Yen' }
};

const TAX_RATES = [0, 5, 10, 15, 20, 25];
export { formatCurrency, generateInvoiceNumber, calculateLineTotal, CURRENCIES, TAX_RATES };