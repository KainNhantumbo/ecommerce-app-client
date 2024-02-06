'use client';

import { Loader } from '@/components/ui/loader';

export default function Loading() {
  return (
    <div className='grid h-[100vh] w-[100vw] place-content-center place-items-center bg-background'>
      <Loader />
    </div>
  );
}
