import coverImage from '@/public/side-call.jpg';
import { Button } from './ui/button';
import Image from 'next/image';

export default function CallToAction() {
  return (
    <section className='w-full max-w-[890px] mx-auto flex flex-col md:items-center md:flex-row gap-8 bg-primary/10 rounded-xl p-8'>
      <section className='w-full flex flex-col gap-5 sm:gap-12'>
        <div className='flex flex-col gap-4 '>
          <h2 className='font-sans-display font-bold sm:text-4xl max-w-md leading-normal'>
            Discover the latest in <em>Trendy Products</em> with us!
          </h2>
          <p className='font-sm max-w-2xl '>
            Embark on a style adventure with our essential product collections.
            Uncover the trends, promotions and first-class choice possibilities
            that await you.
          </p>
        </div>

        <Button
          variant={'default'}
          className='w-fit font-semibold px-4 rounded-3xl'>
          Shop Now
        </Button>
      </section>

      <Image
        src={coverImage}
        width={3840}
        height={5760}
        alt='side image unsplash'
        className='w-full md:max-w-[300px] max-h-[180px] md:max-h-[300px] rounded-xl object-cover'
      />
    </section>
  );
}
