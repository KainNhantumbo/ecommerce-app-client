'use client';

import type { RootState } from '@/redux/store';
import { redirect } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useSelector } from 'react-redux';

type Props = { children: ReactNode };

export default function AdminLayout({ children, ...rest }: Props) {
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.info(rest);
    const debounceTimer = setTimeout(() => !auth.id && redirect('/auth/sign-in'), 200);
    return () => clearTimeout(debounceTimer);
  }, [auth]);

  return <>{children}</>;
}
