import { constants } from '@/shared/constants';
import ceoImage from '@/public/ps-05.jpg';
import backerImage00 from '@/public/ps-234.jpg';
import backerImage01 from '@/public/ps-2342rwe.jpg';
import backerImage02 from '@/public/ps-23wdfmodm.jpg';
import backerImage03 from '@/public/ps-2fwdf.jpg';
import backerImage04 from '@/public/ps-sdfdsgsdf.jpg';
import backerImage05 from '@/public/ps-sdfsdf.jpg';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
    description:
      "We're looking for a mid-level product designer to join our team.",
    location: 'Remote',
    type: 'Part-time'
  },
  {
    career: 'Customer Success Manager',
    description:
      "We're looking for a junior-level customer success manager to join our team.",
    location: 'Local',
    type: 'Full-time'
  },
  {
    career: 'Content creator',
    description:
      "We're looking for a creative content creator to join our team.",
    location: 'Remote',
    type: 'Part-time'
  },
  {
    career: 'Account Executive',
    description:
      "We're looking for a experienced account executive to join our team.",
    location: 'Remote',
    type: 'Full-time'
  },
  {
    career: 'Sales Consultant',
    description:
      "We're looking for a experienced sales consultant to join our team.",
    location: 'Local',
    type: 'Full-time'
  },
  {
    career: 'SEO Marketing Manager',
    description:
      "We're looking for a experienced Seo marketing manager to join our team.",
    location: 'Remote',
    type: 'Part-time'
  },
  {
    career: 'Engineering Manager',
    description:
      "We're looking for a experienced engineering manager to join our team.",
    location: 'Remote',
    type: 'Part-time'
  }
];

export default function Page() {
  return (
    <main className='w-full px-4 mt-[90px] font-sans flex flex-col gap-12'>
      <section className='w-full max-w-[890px] mx-auto flex flex-col gap-8'>
        <h1 className=' font-bold text-4xl text-center max-w-2xl mx-auto leading-normal'>
          Meet our team of creators, product designers and world class problem
          solvers!
        </h1>

        <p className='font-sm max-w-3xl mx-auto text-center'>
          To be the company of our customers want us to be, it takes an{' '}
          <em>eclectic team</em> of passionate workers. Get to know the people
          leading the way at <strong>{constants.name}</strong>.
        </p>

        <div className='w-full grid place-content-center place-items-center'>
          <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-8'>
            {backers.map(({ career, name, image }, i) => (
              <div className='w-full flex flex-col gap-2' key={i}>
                <Image
                  src={image}
                  width={190}
                  height={190}
                  alt={`${name} photo`}
                  className='object-cover mobile-x:max-w-[190px] mobile-x:max-h-[190px] max-w-[120px] max-h-[120px] rounded-lg'
                />
                <div>
                  <h3>{name}</h3>
                  <p className='text-sm'>{career}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className='w-full flex flex-col gap-5 py-4'>
          <div className='w-full flex flex-col gap-2 mx-auto'>
            <h2 className='font-sans-display font-bold text-4xl text-center max-w-md mx-auto leading-normal'>
              Start doing work that matters
            </h2>
            <p className='font-sm max-w-2xl mx-auto text-center'>
              We are remote and hybrid team spread all across the world and
              looking for talented people. Join us!
            </p>
          </div>

          <div className='w-full flex flex-col gap-5'>
            {listings.map(({ career, description, location, type }, i) => (
              <div
                className='flex flex-col gap-2 base-border p-4 rounded-3xl'
                key={i}>
                <h3 className='capitalize'>{career}</h3>
                <p>{description}</p>
                <div className='flex items-center gap-2'>
                  <span className='base-border  py-1 px-2 rounded-full'>
                    {location}
                  </span>
                  <span className='base-border  py-1 px-2 rounded-full'>
                    {type}
                  </span>
                </div>
                <Button
                  variant={'default'}
                  className='rounded-full w-fit py-2 px-4 font-semibold'>
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className=' flex flex-col gap-4 mx-auto w-full py-8'>
          <h3 className='font-sans text-2xl text-center mx-auto max-w-3xl'>
            <strong>{constants.name}</strong> truly values{' '}
            <em>work-life balance.</em> We work really hard, but at the end of
            the day you can take a rest and switch off.
          </h3>
          <div className='flex flex-col gap-2 items-center'>
            <Image
              src={ceoImage}
              width={120}
              height={120}
              alt='ceo image'
              className='object-cover max-w-[60px] max-h-[60px] rounded-full'
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
