import type { Metadata } from 'next';
import { Space_Grotesk, Rubik_Glitch } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const rubikGlitch = Rubik_Glitch({
  subsets: ['latin'],
  variable: '--font-rubik-glitch',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'KANBI',
  description: 'AI-powered task management that transforms unstructured notes into an organized Kanban board. No login required, offline-first, and privacy-focused. Boost your productivity today.',
  keywords: 'task management, kanban board, ai productivity, note taking, project management, offline app, todo list',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          'antialiased font-sans',
          spaceGrotesk.variable,
          rubikGlitch.variable
        )}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
