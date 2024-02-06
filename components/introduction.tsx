import { constants } from '@/shared/constants';
import introCoverImage from '@/public/intro-cover-dom-hill-nimElTcTNyY-unsplash.jpg';
import Image from 'next/image';
import { Separator } from './ui/separator';

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

      <Separator className='mx-auto w-full max-w-5xl' decorative />
      <div className='grid grid-cols-1 flex-wrap place-items-center gap-4 font-medium sm:grid-cols-2'>
        <p className='max-w-[420px] text-justify'>
          <i className='text-primary'>
            You're welcome to our shop, where style meets convenience!
          </i>{' '}
          We're thrilled to introduce you to our vibrant online platform, designed to
          cater to all your fashion needs with ease and sophistication. Whether you're
          seeking the latest trends or timeless classics, we've curated a collection
          that reflects the diverse tastes and preferences of our global community.
        </p>

        <p className='max-w-[420px] text-justify'>
          At {constants.name}, we believe that fashion is more than just clothing; it's
          a form of self-expression that empowers individuals to showcase their unique
          personality and creativity. With this philosophy at the heart of everything we
          do, we've created a shopping experience that combines cutting-edge fashion
          with unparalleled convenience.
        </p>
      </div>

      <div className='grid grid-cols-1 flex-wrap place-items-center gap-4 font-medium sm:grid-cols-2'>
        <p className='max-w-[420px] text-justify'>
          But we're more than just an online store, we're a community of fashion
          enthusiasts united by our passion for style and self-expression. Join us on
          this exciting journey as we explore the latest trends, share style tips, and
          celebrate the diversity of fashion around the world.
        </p>

        <p className='max-w-[420px] text-justify'>
          Thank you for choosing {constants.name} as your go-to destination for all
          things fashion. We're excited to embark on this adventure with you and help
          you discover your signature style.{' '}
          <i className='italic text-primary'>Happy shopping!</i>
        </p>
      </div>
    </section>
  );
};
