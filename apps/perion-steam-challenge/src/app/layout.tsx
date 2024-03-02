import './global.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Steam Game Library Analyzer',
  description: 'Find out how much time you spend playing games!',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
