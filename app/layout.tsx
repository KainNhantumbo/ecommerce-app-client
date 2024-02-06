import './globals.css';
import clsx from 'clsx';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { store } from '@/redux/store';
import { Provider } from '@/redux/store';
import AppContext from '@/context/AppContext';
import { constants } from '@/shared/constants';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import Layout from '@/components/custom-layout';
import { Toaster } from '@/components/ui/sonner';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: constants.name,
  description: constants.description,
  keywords: constants.keywords,
  authors: [{ name: constants.author.name, url: constants.author.portfolio }],
  category: 'website',
  icons: '/favicon.png'
};

type Props = { children: ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <body className={clsx(jakarta.className, spaceGrotesk.className)}>
        <Provider store={store}>
          <ThemeProvider attribute='class' enableSystem={true}>
            <AppContext>
              <Toaster closeButton loadingIcon />
              <Layout>{children}</Layout>
            </AppContext>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
