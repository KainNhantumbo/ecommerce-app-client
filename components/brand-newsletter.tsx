'use client';
import { Button } from './ui/button';

export default function BrandNewsletter() {
  return (
    <section className='w-full max-w-[890px] mx-auto flex flex-col gap-8'>
      <h2 className='font-sans-display font-bold text-4xl text-center max-w-md mx-auto leading-normal'>
        Your Monthly Dose of Updates and Offers!
      </h2>
      <p className='font-sm max-w-2xl mx-auto text-center'>
        Send your email, we will inform you about the latest product releases
        and satisfying discounts!
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className='flex gap-3 items-center base-border rounded-full p-1 w-full max-w-xl mx-auto'>
        <input
          type='email'
          placeholder='Your email here'
          className='outline-none bg-background border-none p-2 px-4 rounded-full w-full '
        />
        <Button
          type='submit'
          size={'lg'}
          variant={'secondary'}
          className='text-white rounded-full font-bold'>
          Send
        </Button>
      </form>
    </section>
  );
}
