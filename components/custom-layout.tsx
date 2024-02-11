'use client';

import '@/app/globals.css';
import { Footer } from '@/components/footer';
import { AppContext } from '@/context/AppContext';
import { ThemeProvider } from '@/providers/theme-provider';
import type { FC, ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Header } from './header';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider attribute='class' enableSystem={true}>
        <AppContext>
          <Toaster closeButton loadingIcon duration={3000} />
          <Header />
          {children}
          <Footer />
        </AppContext>
      </ThemeProvider>
    </Provider>
  );
};
