import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { MenuProvider } from '@/context/menuContext';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const interRegular = localFont({
  src: './fonts/Inter-Regular.woff',
  variable: '--font-inter-regular',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${interRegular.variable} antialiased`}
      >
        <MenuProvider>{children}</MenuProvider>
      </body>
    </html>
  );
}
