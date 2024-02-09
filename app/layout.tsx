import { Layout } from '@/components/custom-layout';
import { constants } from '@/shared/constants';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { IBM_Plex_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import type { ReactNode } from 'react';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600']
});

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
    <html lang='en' suppressHydrationWarning>
      <body className={clsx(jakarta.className, ibmPlexSans.className)}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
