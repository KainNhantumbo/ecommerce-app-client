import { BrandNewsletter } from '@/components/brand-newsletter';
import { ContactForm } from '@/components/contact-form';
import { ContactIcon, LocateIcon, MessageCircleIcon, PhoneCallIcon } from 'lucide-react';

const options = [
  {
    icon: MessageCircleIcon,
    name: 'Chat to Sales',
    description: 'Speak to our friendly team.',
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
    <main className='mt-[90px] flex w-full flex-col gap-12 px-4 font-sans-body'>
      <section className='mx-auto flex w-full max-w-5xl flex-col gap-8 sm:flex-row'>
        <div className='flex w-full flex-col gap-9'>
          <div className='flex w-full flex-col items-center gap-4'>
            <ContactIcon className='h-12 w-auto stroke-primary' />
            <h1 className='mx-auto max-w-2xl text-center text-4xl font-bold leading-normal'>
              Contact our friendly team
            </h1>
            <p className='font-sm mx-auto max-w-xl text-center'>
              We're here to help! If you have any questions, suggestions, or just want to
              say hello, please feel free to reach out to us.
            </p>
          </div>

          <div className='grid w-full place-content-center place-items-center'>
            <div className='grid w-full grid-cols-2 gap-2 mobile-x:gap-8 md:grid-cols-4'>
              {options.map(({ icon: Icon, name, description, contact }, i) => (
                <div
                  className='base-border group flex w-full max-w-[200px] flex-col justify-between gap-2 rounded-lg p-3'
                  key={i}>
                  <Icon className='base-border mb-4 h-8 w-fit rounded-lg stroke-primary p-2' />
                  <div className='flex flex-col gap-3'>
                    <p>
                      <strong>{name}</strong>
                    </p>
                    <p className='text-sm'>{description}</p>
                  </div>
                  <p className='cursor-pointer text-sm font-medium underline decoration-dashed underline-offset-4 hover:text-primary'>
                    {contact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='mx-auto flex w-full max-w-5xl flex-col gap-8'>
        <div className='mx-auto flex w-full flex-col gap-3'>
          <h2 className='mx-auto max-w-2xl text-center text-4xl font-bold '>
            Drop a message
          </h2>
          <p className='font-sm mx-auto max-w-3xl text-center'>
            We are here for you. How can we help you?
          </p>
        </div>
        <div className='mx-auto flex w-full max-w-3xl flex-col'>
          <ContactForm />
        </div>
      </section>

      <BrandNewsletter />
    </main>
  );
}
