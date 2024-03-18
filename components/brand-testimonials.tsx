import type { Testimonials } from '@/types';
import { StarsIcon, VerifiedIcon } from 'lucide-react';

const testimonials: Testimonials = [
  {
    title: 'Beyond impress',
    comment:
      'I am beyond impressed with the quality and style of the clothing I purchased from this store website. The selection is fantastic, ranging from classic essentials to on-trend fashion pieces.',
    customerName: 'Arstyl Ballume'
  },
  {
    title: 'Offers a diverse range',
    comment:
      "I recently discovered this store online, and I couldn't be happier with my experience. The web store offers a diverse range of product options, catering to various styles and preferences.",
    customerName: 'Qymbley Doors'
  },
  {
    title: 'Quality fashion',
    comment:
      'As someone who always is on the lookout for quality fashion, I can sy that this store website is a hiding gem. The curated collection of products reflects the latest trends.',
    customerName: 'Alissa Tarson'
  }
];

export const BrandTestimonials = () => {
  return (
    <section className='mx-auto flex w-full max-w-5xl flex-col gap-8'>
      <h2 className='mx-auto text-center font-sans text-4xl font-bold leading-normal'>
        Some Testimonials from Our Customers
      </h2>

      <section className=' mx-auto flex w-full flex-wrap items-center justify-center gap-4'>
        {testimonials.map((data, i) => (
          <div key={i} className='flex max-w-xs flex-col items-center gap-3 text-center'>
            <div className='flex gap-3'>
              <StarsIcon className='stroke-primary' />
              <StarsIcon className='stroke-font' />
              <StarsIcon className='stroke-primary' />
            </div>
            <h3>{data.title}</h3>

            <p className='text-sm'>{data.comment}</p>

            <div className='flex flex-col gap-1'>
              <h3>{data.customerName}</h3>
              <div className='flex items-center gap-1 font-sans-body font-semibold'>
                <VerifiedIcon className='h-5 w-auto stroke-primary' />
                <span>Verified Customer</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};
