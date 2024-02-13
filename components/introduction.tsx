import introCoverImage from '@/public/intro-cover-dom-hill-nimElTcTNyY-unsplash.jpg';
import { constants } from '@/shared/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export const Introduction = () => {
  return (
    <section className='mx-auto flex w-full max-w-5xl flex-col gap-8 pt-5 md:pt-10'>
      <div className='mx-auto flex w-full flex-wrap-reverse justify-center gap-8'>
        <div className='relative after:absolute after:-left-4 after:top-0 after:h-[calc(70%_-_3px)] after:w-1 after:rounded-full after:bg-primary/75'>
          <Image
            src={introCoverImage}
            width={640}
            height={886}
            className='base-image base-border relative max-w-[320px] rounded-lg border-[3px] border-primary/75 shadow-xl'
            alt='cover image by dom hill - unsplash'
            priority
          />
        </div>

        <h1 className='w-full max-w-[420px] p-4 font-sans text-4xl leading-relaxed sm:text-5xl sm:leading-relaxed'>
          Wear a <i className='italic text-primary'>style</i> that matters - Your{' '}
          <i className='text-primary'>Fashion Finest Corner</i> in The World!
        </h1>
      </div>

      <div className='flex flex-wrap place-items-center items-center justify-center gap-4 font-medium'>
        <p className='max-w-[420px] text-justify'>
          At {constants.name}, we believe that fashion is more than just clothing; it's
          a form of self-expression that empowers individuals to showcase their unique
          personality and creativity.
        </p>
        <p className='max-w-[420px] text-justify'>
          Thank you for choosing us as your go-to destination for all things fashion.
          We're excited to embark on this adventure with you and help you discover your
          signature style. <i className='italic text-primary'>Happy shopping!</i>
        </p>
      </div>

      <div className='mx-auto flex w-full flex-wrap justify-center gap-4'>
        <Button
          asChild
          variant={'default'}
          size={'lg'}
          className='w-full capitalize mobile-x:w-fit'>
          <Link href={'/products'}>Explore our products</Link>
        </Button>
        <Button
          asChild
          variant={'default'}
          size={'lg'}
          className='w-full capitalize mobile-x:w-fit'>
          <Link href={'/stories'}>read more about us</Link>
        </Button>
      </div>
    </section>
  );
};
