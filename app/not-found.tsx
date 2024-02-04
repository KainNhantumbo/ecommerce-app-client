'use client';

import { constants } from '@/shared/constants';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='w-full h-[100vh] grid place-content-center place-items-center'>
      <section className='logo-container'>
        <div className='font-sans-display text-3xl'>
          <span>{constants.name}</span>
        </div>
      </section>
      <section className='flex flex-col items-center gap-5'>
        <h1 className='font-sans-display font-bold text-center text-6xl leading-tight'>
          404
        </h1>
        <h2 className='font-bold font-sans text-primary'>Page not found</h2>
        <p className='max-w-screen-mobile text-center font-sans normal-case font-medium'>
          But if you don't change your direction, and if you keep looking, you
          may end up where you are heading.
        </p>
        <Link
          href={'/'}
          className='rounded-3xl font-medium font-sans border-solid border-[2px] border-font mt-5 p-3 px-5 hover:border-primary hover:text-primary transition-colors '>
          Take me home
        </Link>
      </section>
    </main>
  );
}
