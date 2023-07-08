import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Chat from '@/components/Chat';
// import Chat from './components/Chat';
const inter = Inter({ subsets: ['latin'] });
import Providers from '@/components/Providers';
export const metadata: Metadata = {
  title: 'Algnition',
  description: 'AI Automation for your business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <Chat />
          {children}
        </body>
      </Providers>
    </html>
  );
}
