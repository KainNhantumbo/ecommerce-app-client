import Header from './header';
import Footer from '@/components/footer';
import { ReactNode } from 'react';

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
