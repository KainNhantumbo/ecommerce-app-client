import { ShipIcon } from 'lucide-react';

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
    <section>
      <h2 className='font-sans-body font-bold text-4xl'>
        Unveiling four pillars of distinction
      </h2>
      <p>
        We take pride in presenting an unparelleled fusion of design and
        functionality, encapsulated in our pillars of distinction.
      </p>

      <section>
        {cards.map((card, i) => {
          return (
            <div key={i} className=''>
              <div>
                <ShipIcon />
                <span>{`0${i + 1}`}</span>
              </div>

              <h3>{card.title}</h3>
              <p>{card.content}</p>
            </div>
          );
        })}
      </section>
    </section>
  );
}
