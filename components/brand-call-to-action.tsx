import coverImage from '@/public/side-call.jpg';
import { Button } from './ui/button';
import Image from 'next/image';

export const CallToAction = () => {
  return (
    <section className='mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-lg bg-primary/10 p-8 md:flex-row md:items-center'>
      <section className='flex w-full flex-col gap-5 sm:gap-12'>
        <div className='flex flex-col gap-4 '>
          <h2 className='max-w-md font-sans-display font-bold leading-normal sm:text-4xl'>
            Discover the latest in <em>Trendy Products</em> with us!
          </h2>
          <p className='font-sm max-w-2xl '>
            Embark on a style adventure with our essential product collections. Uncover
            the trends, promotions and first-class choice possibilities that await you.
          </p>
        </div>

        <Button variant={'default'} className='w-fit px-4'>
          Shop Now
        </Button>
      </section>

      <Image
        src={coverImage}
        width={3840}
        height={5760}
        alt='side image from Unsplash'
        className='max-h-[180px] w-full rounded-lg object-cover md:max-h-[300px] md:max-w-[300px]'
      />
    </section>
  );
};
