'use client';
import { Button } from './ui/button';

export const BrandNewsletter = () => {
  return (
    <section className='mx-auto flex w-full max-w-[890px] flex-col gap-8'>
      <h2 className='mx-auto max-w-md text-center font-sans text-4xl font-bold leading-normal'>
        Your Monthly Dose of Updates and Offers!
      </h2>
      <p className='font-sm mx-auto max-w-2xl text-center'>
        Send your email, we will inform you about the latest product releases and
        satisfying discounts!
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className='base-border mx-auto flex w-full max-w-xl items-center gap-3 rounded-lg p-1'>
        <input
          type='email'
          placeholder='Your email here'
          className='w-full border-none bg-background p-2 px-4 outline-none '
        />
        <Button
          type='submit'
          size={'lg'}
          variant={'default'}
          className='font-bold text-white'>
          Send
        </Button>
      </form>
    </section>
  );
};
