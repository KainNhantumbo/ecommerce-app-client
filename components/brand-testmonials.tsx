import { StarsIcon, VerifiedIcon } from 'lucide-react';

type TestmonialsProps = {
  title: string;
  comment: string;
  customerName: string;
}[];

const testmonials: TestmonialsProps = [
  {
    title: 'Beyound impress',
    comment:
      'I am beyond impressed with the quality and style of the clothing I purshased from this store website. The selection is fantastic, ranging from classic essentials to on-trend fashion pieces.',
    customerName: 'Arstyl Ballume'
  },
  {
    title: 'Offers a diverse range',
    comment:
      "I recently discovered this store online, and I clouldn't be happier with my experience. The web store offers a diverse range of product options, catering to various styles and preferences.",
    customerName: 'Qymbley Doors'
  },
  {
    title: 'Quality fashion',
    comment:
      'As someone who always is on the lookout for quality fashion, I can sy that this store website is a hidding gem. The curated collection of products reflects the latest trends.',
    customerName: 'Alissa Tarson'
  }
];

export default function BrandTestimonials() {
  return (
    <section className='w-full max-w-[890px] mx-auto flex flex-col gap-8'>
      <h2 className='font-sans-display font-bold text-4xl text-center max-w-md mx-auto leading-normal'>
        Some Testmonials from Our Customers
      </h2>

      <section className=' w-full flex flex-wrap gap-4 mx-auto items-center justify-center'>
        {testmonials.map((data, i) => (
          <div
            key={i}
            className='flex flex-col gap-3 max-w-xs items-center text-center'>
            <div className='flex gap-3'>
              <StarsIcon className='stroke-primary' />
              <StarsIcon className='stroke-secondary' />
              <StarsIcon className='stroke-primary' />
            </div>
            <h3>{data.title}</h3>

            <p className='text-sm'>{data.comment}</p>

            <div className='flex gap-1 flex-col'>
              <h3>{data.customerName}</h3>
              <div className='flex items-center gap-1 font-sans-body font-semibold'>
                <VerifiedIcon className='stroke-secondary w-auto h-5' />
                <span>Verified Customer</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
