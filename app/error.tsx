'use client';
import { Button } from '@/components/ui/button';
import { constants } from '@/shared/constants';
import { useEffect } from 'react';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className='grid h-[100vh] w-full place-content-center place-items-center'>
      <section className='logo-container'>
        <div className='font-sans text-3xl'>
          <span>{constants.name}</span>
        </div>
      </section>
      <section className='flex flex-col items-center gap-5'>
        <h1 className='text-center font-sans text-6xl font-bold leading-tight text-error'>
          Something went wrong!
        </h1>

        <Button variant={'outline'} onClick={reset}>
          Try again
        </Button>
      </section>
    </main>
  );
}
