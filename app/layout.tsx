import './globals.css';
import { ReactNode } from 'react';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import AppContext from '@/context/AppContext';
import { store } from '@/redux/store';
import { Provider } from '@/redux/store';
import { constants } from '@/shared/constants';

const inter = Inter({ subsets: ['latin'] });
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
      <body className={clsx(inter.className, spaceGrotesk.className)}>
        <Provider store={store}>
          <AppContext>{children}</AppContext>
        </Provider>
      </body>
    </html>
  );
}
