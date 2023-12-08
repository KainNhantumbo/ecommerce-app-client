import { ShipIcon, StarIcon } from 'lucide-react';
import { RiStarFill } from 'react-icons/ri';

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
    <section className='w-full max-w-[890px] mx-auto flex flex-col gap-8'>
      <h2 className='font-sans-display font-bold text-4xl text-center max-w-md mx-auto leading-normal'>
        Unveiling four pillars of distinction
      </h2>
      <p className='font-sm max-w-2xl mx-auto text-center'>
        We take pride in presenting an unparelleled fusion of design and
        functionality, encapsulated in our pillars of distinction.
      </p>

      <section className='grid mobile-x:grid-cols-2 gap-8'>
        {cards.map((card, i) => {
          return (
            <div
              key={i}
              className='group select-none transition-colors flex flex-col gap-4 hover:bg-primary/20 p-5 rounded-3xl border-solid border-[1px] border-font/10'>
              <div className='flex justify-between items-center'>
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
