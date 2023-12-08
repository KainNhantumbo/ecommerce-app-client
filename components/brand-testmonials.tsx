import { VerifiedIcon } from 'lucide-react';
import { RiStarFill } from 'react-icons/ri';

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
    <section>
      <h2>Testmonials</h2>

      <section>
        {testmonials.map((data, i) => (
          <div key={i} className=''>
            <div className=''>
              <RiStarFill />
              <RiStarFill />
              <RiStarFill />
            </div>
            <h3>{data.title}</h3>

            <p>{data.comment}</p>

            <div>
              <h3>{data.customerName}</h3>
              <div>
                <VerifiedIcon />
                <span>Verified Customer</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
