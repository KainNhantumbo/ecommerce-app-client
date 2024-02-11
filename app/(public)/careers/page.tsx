import { Button } from '@/components/ui/button';
import ceoImage from '@/public/ps-05.jpg';
import backerImage00 from '@/public/ps-234.jpg';
import backerImage01 from '@/public/ps-2342rwe.jpg';
import backerImage02 from '@/public/ps-23wdfmodm.jpg';
import backerImage03 from '@/public/ps-2fwdf.jpg';
import backerImage04 from '@/public/ps-sdfdsgsdf.jpg';
import backerImage05 from '@/public/ps-sdfsdf.jpg';
import { constants } from '@/shared/constants';
import Image from 'next/image';

const backers = [
  { name: 'Ben Award', career: 'Product Designer', image: backerImage01 },
  { name: 'Sara Lewis', career: 'Content Manager', image: backerImage00 },
  { name: 'Mara Tuffman', career: 'Sales Consultant', image: backerImage02 },
  { name: 'Lowna Marttini', career: 'Quality Manager', image: backerImage03 },
  {
    name: 'Marlow Colloen',
    career: 'Head of Operating Office',
    image: backerImage04
  },
  { name: 'Visca Lammar', career: 'Founder & CEO', image: backerImage05 }
];

const listings = [
  {
    career: 'Product designer',
    description: "We're looking for a mid-level product designer to join our team.",
    basedIn: 'Remote',
    type: 'Part-time'
  },
  {
    career: 'Customer Success Manager',
    description:
      "We're looking for a junior-level customer success manager to join our team.",
    basedIn: 'Local',
    type: 'Full-time'
  },
  {
    career: 'Content creator',
    description: "We're looking for a creative content creator to join our team.",
    basedIn: 'Remote',
    type: 'Part-time'
  },
  {
    career: 'Account Executive',
    description: "We're looking for a experienced account executive to join our team.",
    basedIn: 'Remote',
    type: 'Full-time'
  },
  {
    career: 'Sales Consultant',
    description: "We're looking for a experienced sales consultant to join our team.",
    basedIn: 'Local',
    type: 'Full-time'
  },
  {
    career: 'SEO Marketing Manager',
    description:
      "We're looking for a experienced Seo marketing manager to join our team.",
    basedIn: 'Remote',
    type: 'Part-time'
  },
  {
    career: 'Engineering Manager',
    description:
      "We're looking for a experienced engineering manager to join our team.",
    basedIn: 'Remote',
    type: 'Part-time'
  }
];

export default function Page() {
  return (
    <main className='mt-[90px] flex w-full flex-col gap-12 px-4 font-sans-body'>
      <section className='mx-auto flex w-full max-w-5xl flex-col gap-8'>
        <h1 className=' mx-auto max-w-2xl text-center text-4xl font-bold leading-normal'>
          Meet our team of creators, product designers and world class problem solvers!
        </h1>

        <p className='font-sm mx-auto max-w-3xl text-center'>
          To be the company of our customers want us to be, it takes an{' '}
          <em>eclectic team</em> of passionate workers. Get to know the people leading
          the way at <strong>{constants.name}</strong>.
        </p>

        <div className='grid w-full place-content-center place-items-center'>
          <div className='grid w-full grid-cols-2 gap-8 sm:grid-cols-3'>
            {backers.map(({ career, name, image }, i) => (
              <div className='flex w-full flex-col gap-2' key={i}>
                <Image
                  src={image}
                  width={190}
                  height={190}
                  alt={`${name} photo`}
                  className='max-h-[120px] max-w-[120px] rounded-lg object-cover mobile-x:max-h-[190px] mobile-x:max-w-[190px]'
                />
                <div>
                  <h3>{name}</h3>
                  <p className='text-sm'>{career}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className='flex w-full flex-col gap-5 py-4'>
          <div className='mx-auto flex w-full flex-col gap-2'>
            <h2 className='mx-auto max-w-md text-center font-sans text-4xl font-bold leading-normal'>
              Start doing work that matters
            </h2>
            <p className='font-sm mx-auto max-w-2xl text-center'>
              We are remote and hybrid team spread all across the world and looking for
              talented people. Join us!
            </p>
          </div>

          <div className='flex w-full flex-col gap-5'>
            {listings.map(({ career, description, basedIn, type }, i) => (
              <div className='base-border flex flex-col gap-2 rounded-lg p-4' key={i}>
                <h3 className='capitalize'>{career}</h3>
                <p>{description}</p>
                <div className='flex items-center gap-2'>
                  <span className='base-border  rounded-lg px-2 py-1'>{basedIn}</span>
                  <span className='base-border  rounded-lg px-2 py-1'>{type}</span>
                </div>
                <Button
                  variant={'default'}
                  className='w-fit rounded-lg px-4 py-2 font-semibold'>
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className=' mx-auto flex w-full flex-col gap-4 py-8'>
          <h3 className='mx-auto max-w-3xl text-center font-sans-body text-2xl font-medium'>
            <strong className='text-primary'>{constants.name}</strong> truly values{' '}
            <em>work-life balance.</em> We work really hard, but at the end of the day
            you can take a rest and switch off.
          </h3>
          <div className='flex flex-col items-center gap-2'>
            <Image
              src={ceoImage}
              width={120}
              height={120}
              alt='ceo image'
              className='max-h-[60px] max-w-[60px] rounded-full object-cover'
            />
            <p>Martha Kodella</p>
            <span>
              <strong>Product Designer</strong>
            </span>
          </div>
        </section>
      </section>
    </main>
  );
}
