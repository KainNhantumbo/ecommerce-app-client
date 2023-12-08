'use client';
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
    <main className='w-full h-[100vh] grid place-content-center place-items-center'>
      <section className='logo-container'>
        <div className='font-sans-display text-3xl'>
          <span>{constants.name}</span>
        </div>
      </section>
      <section className='flex flex-col items-center gap-5'>
        <h1 className='font-sans-display font-bold text-error text-center text-6xl leading-tight'>
          Something went wrong!
        </h1>

        <button
          className='rounded-3xl font-medium font-sans border-solid border-[2px] border-font mt-5 p-3 px-5 hover:border-primary hover:text-primary transition-colors '
          onClick={reset}>
          Try again
        </button>
      </section>
    </main>
  );
}
