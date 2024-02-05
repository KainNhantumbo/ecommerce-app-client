import { StarIcon } from 'lucide-react';

const cards: { title: string; content: string }[] = [
  {
    title: 'Comfort',
    content:
      'From ergonomics to customizable features, we understand that every individual is unique, so it should be the comfort they experience in their living.'
  },
  {
    title: 'Unique',
    content:
      'Each piece is a testament to our commitment to innovation and criativy, ensuring that your space stands out with a touch of distinctiveness.'
  },
  {
    title: 'Materials',
    content:
      'We take pride in sourcing top-tier materials to ensure durability, longevity and luxurious feel. Our dedication to quality guarantees that your investment in our products worths and lasts longer.'
  },
  {
    title: 'Functionality',
    content:
      'With our innovative designs, we believe merging form and function seamlessly, offering features that enhance usability and adapt to your lifestyle.'
  }
];

export default function BrandFeatures() {
  return (
    <section className='mx-auto flex w-full max-w-5xl flex-col gap-8'>
      <h2 className='mx-auto max-w-md text-center font-sans-display text-4xl font-bold leading-normal'>
        Unveiling four pillars of distinction
      </h2>
      <p className='font-sm mx-auto max-w-2xl text-center'>
        We take pride in presenting an unparalleled fusion of design and functionality,
        encapsulated in our pillars of distinction.
      </p>

      <section className='grid gap-8 mobile-x:grid-cols-2'>
        {cards.map((card, i) => {
          return (
            <div
              key={i}
              className='group flex select-none flex-col gap-4 rounded-xl border-[1px] border-solid border-font/10 p-5 transition-colors hover:bg-primary/20'>
              <div className='flex items-center justify-between'>
                <StarIcon className='group-hover:stroke-primary' />
                <span className='font-bold group-hover:text-primary'>{`0${
                  i + 1
                }`}</span>
              </div>

              <h3 className='text-xl group-hover:text-primary'>{card.title}</h3>
              <p className='group-hover:text-primary'>{card.content}</p>
            </div>
          );
        })}
      </section>
    </section>
  );
}
