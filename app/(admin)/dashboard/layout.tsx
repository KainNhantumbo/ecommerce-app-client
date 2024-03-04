'use client';

import type { RootState } from '@/redux/store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useSelector } from 'react-redux';

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (pathname.includes('dashboard') && !auth.id) {
        router.push('/auth/sign-in');
      }
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [auth]);

  return <>{children}</>;
}
