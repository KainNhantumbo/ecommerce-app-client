import {
  ContactIcon,
  LocateIcon,
  MessageCircleIcon,
  PhoneCallIcon
} from 'lucide-react';
import React from 'react';
import { ContactForm } from '@/components/contact-form';
import BrandNewsletter from '@/components/breand-newsletter';

const options = [
  {
    icon: MessageCircleIcon,
    name: 'Chat to Sales',
    description: 'Speack to our friendly team.',
    contact: 'weco@mail.com'
  },
  {
    icon: LocateIcon,
    name: 'Visit Us',
    description: 'Visit our Office HQ.',
    contact: 'View on Google Maps'
  },
  {
    icon: MessageCircleIcon,
    name: 'Chat to Support',
    description: "We're here to help.",
    contact: 'support@weco.com'
  },
  {
    icon: PhoneCallIcon,
    name: 'Call Us',
    description: 'Mon-Fri from 7AM - 3PM.',
    contact: '+33(845) 000 - 0000'
  }
];

export default function Page() {
  return (
    <main className='w-full px-4 mt-[90px] font-sans flex flex-col gap-12'>
      <section className='w-full max-w-[890px] mx-auto sm:flex-row gap-8 flex flex-col'>
        <div className='w-full flex flex-col gap-9'>
          <div className='w-full flex flex-col gap-4 items-center'>
            <ContactIcon className='stroke-primary w-auto h-12' />
            <h1 className='font-bold text-4xl text-center max-w-2xl mx-auto leading-normal'>
              Contact our friendly team
            </h1>
            <p className='font-sm max-w-xl mx-auto text-center'>
              We're here to help! If you have any questions, suggestions, or
              just want to say hello, please feel free to reach out to us.
            </p>
          </div>

          <div className='w-full grid place-content-center place-items-center'>
            <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-2 mobile-x:gap-8'>
              {options.map(({ icon: Icon, name, description, contact }, i) => (
                <div
                  className='group w-full max-w-[200px] flex flex-col justify-between gap-2 base-border p-3 rounded-xl'
                  key={i}>
                  <Icon className='stroke-primary group-hover:stroke-secondary w-fit h-8 base-border p-2 mb-4 rounded-md' />
                  <div className='flex flex-col gap-3'>
                    <p>
                      <strong>{name}</strong>
                    </p>
                    <p className='text-sm'>{description}</p>
                  </div>
                  <p className='underline underline-offset-4 decoration-dashed hover:text-primary text-sm font-medium cursor-pointer'>
                    {contact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='w-full max-w-[890px] mx-auto flex flex-col gap-8'>
        <div className='flex flex-col gap-3 w-full mx-auto'>
          <h2 className='text-4xl font-bold text-center max-w-2xl mx-auto '>
            Drop a message
          </h2>
          <p className='font-sm max-w-3xl mx-auto text-center'>
            We are here for you. How can we help you?
          </p>
        </div>
        <div className='w-full flex flex-col max-w-3xl mx-auto'>
          <ContactForm />
        </div>
      </section>

      <BrandNewsletter />
    </main>
  );
}
