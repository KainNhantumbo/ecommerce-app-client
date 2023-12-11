import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Page() {
  return (
    <main className='w-full px-4 mt-[70px] font-sans flex flex-col gap-12 min-h-[80vh]'>
      <section className='w-full max-w-[890px] p-4 mobile-x:p-8 m-auto'>
        <div className=' w-full flex flex-col gap-12 justify-between pt-10 md:p-0 mx-auto'>
          <div className='w-full flex flex-col gap-4'>
            <h1 className='font-sans-display font-bold sm:text-4xl max-w-md leading-normal'>
              You're now registered.
            </h1>
            <p className='font-sm max-w-2xl'>
              Please click the button below to access your account.
            </p>

            <Link
              href={'/auth/sign-in'}
              className='flex items-center gap-2 bg-primary rounded-3xl w-fit py-2 px-5 hover:bg-secondary transition-colors'>
              <ArrowRight className='stroke-white' />
              <span className='text-white font-semibold'>Go and Sign In</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
