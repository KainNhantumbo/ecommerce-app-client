'use client';
import { ContactForm } from '@/components/contact-form';
import React from 'react';
import SideImage from '@/public/side-contact.jpg';
import Image from 'next/image';

export default function Page() {
  return (
    <main className='w-full px-4 mt-[90px] font-sans flex flex-col gap-12'>
      <section className='w-full max-w-[890px] mx-auto flex flex-col-reverse sm:flex-row gap-8'>
        <div className='w-full flex flex-col'>
          <ContactForm />
        </div>
        <Image
          src={SideImage}
          width={3840}
          height={5760}
          alt='side image unsplash'
          className='w-full max-w-[400px] rounded-xl object-cover'
        />
      </section>
      {/* <section className='w-full max-w-[890px] mx-auto flex flex-col gap-8'></section> */}
      {/* <section className='w-full max-w-[890px] mx-auto flex flex-col gap-8'></section> */}
    </main>
  );
}
