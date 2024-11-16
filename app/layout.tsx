import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { NavigationProvider } from '@/components/providers/navigation-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'User Management Dashboard',
  description: 'Comprehensive user management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavigationProvider>
            {children}
          </NavigationProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}