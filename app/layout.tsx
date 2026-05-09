import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MS100 Store | Smart Home, Relax & Kitchen',
  description: 'Productos útiles para hacer tu casa más cómoda, ordenada y agradable.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
