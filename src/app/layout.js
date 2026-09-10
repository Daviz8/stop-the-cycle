import "./globals.css";
import Providers from "./components/provider";
import { Plus_Jakarta_Sans, Montserrat } from 'next/font/google';
import './globals.css';

// Configure Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

// Configure Montserrat
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});
export const metadata = {
  title: 'Stop The Cycle Initiative | Powered by Uche Juan Foundation',
  description:
    'Stop the Cycle Initiative is a non-governmental initiative powered by Uche Juan Foundation. We have empowered over 10,000 youths since 2016 to break free from identity crisis, irresponsibility, unproductivity, mental health challenges, substance abuse, crime and other vices.',
  keywords: [
    'Stop The Cycle Initiative',
    'Uche Juan Foundation',
    'The Life Class Community',
    'Youth Empowerment Nigeria',
    'Port Harcourt',
    'National Transformation',
  ],
};

export default function RootLayout({ children }) {
  return (
    <Providers> 
    <html
      lang="en"
  className={`${plusJakartaSans.variable} ${montserrat.variable} font-sans antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
    </Providers>
  );
}