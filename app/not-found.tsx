'use client';

import { constants } from '@/shared/constants';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='grid h-[100vh] w-full place-content-center place-items-center'>
      <section className='logo-container'>
        <div className='font-sans text-3xl'>
          <span>{constants.name}</span>
        </div>
      </section>
      <section className='flex flex-col items-center gap-5'>
        <h1 className='text-center font-sans text-6xl font-bold leading-tight'>404</h1>
        <h2 className='font-sans font-bold uppercase text-primary'>Page not found</h2>
        <p className='max-w-screen-mobile text-center font-sans font-medium normal-case'>
          But if you don't change your direction, and if you keep looking, you may end up
          where you are heading.
        </p>
        <Link
          href={'/'}
          className='mt-5 rounded-lg border-[2px] border-solid border-font p-3 px-5 font-sans font-medium transition-colors hover:border-primary hover:text-primary '>
          Take me home
        </Link>
      </section>
    </main>
  );
}
