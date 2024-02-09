import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <main className='mt-[70px] flex min-h-[80vh] w-full flex-col gap-12 px-4 font-sans'>
      <section className='m-auto w-full max-w-5xl p-4 mobile-x:p-8'>
        <div className=' mx-auto flex w-full flex-col justify-between gap-12 pt-10 md:p-0'>
          <div className='flex w-full flex-col gap-4'>
            <h1 className='max-w-md font-sans font-bold leading-normal sm:text-4xl'>
              You're now registered.
            </h1>
            <p className='font-sm max-w-2xl'>
              Please click the button below to access your account.
            </p>

            <Button asChild>
              <Link
                href={'/auth/sign-in'}
                className='flex w-fit items-center gap-2'>
                <ArrowRight className='stroke-white w-5 h-auto' />
                <span className='font-semibold text-white'>Go and Sign In</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
