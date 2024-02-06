'use client';

import type { RootState } from '@/redux/store';
import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  if (!auth.token) {
    router.push('/auth/sign-in');
  }

  return <>{children}</>;
}
