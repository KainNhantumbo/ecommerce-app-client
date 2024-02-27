'use client';

import { useTheme } from 'next-themes';
import { ComponentProps } from 'react';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'dark' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group bg-background'
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:font group-[.toaster]:base-border group-[.toaster]:shadow-lg bg-background',
          description: 'group-[.toast]:text-font',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-font',
          cancelButton:
            'group-[.toast]:bg-background group-[.toast]:text-font bg-background stroke-primary base-border'
        }
      }}
      {...props}
    />
  );
};

export { Toaster };
