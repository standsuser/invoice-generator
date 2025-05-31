'use client';
import './globals.css';
import InvoiceGenerator from '@/components/InvoiceGenerator';

export default function Home() {
  return (
    <div className="min-h-screen">
      <InvoiceGenerator />
    </div>
  );
}