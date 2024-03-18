import { CallToAction } from '@/components/brand-call-to-action';
import { constants } from '@/shared/constants';
import aboutImage from '@/public/about.jpg';
import Image from 'next/image';

export default function Page() {
  return (
    <main className='mx-auto mt-24 flex w-full max-w-5xl flex-col gap-8 px-4 font-sans-body text-lg'>
      <section className='flex w-full flex-wrap-reverse items-center  justify-center gap-8 sm:flex-nowrap sm:gap-3'>
        <div className='flex max-w-[500px] flex-col gap-3'>
          <h1 className='font-sans'>
            About <i className='text-primary'>Us</i>
          </h1>

          <p>
            Welcome to our store, your ultimate destination for fashion-forward clothing and
            accessories! At {constants.name}, we believe that style is a reflection of
            individuality, and we're here to help you express yourself confidently through
            our curated collection of trendy apparel.
          </p>
        </div>
        <Image
          src={aboutImage}
          alt='about image by Unsplash'
          width={500}
          height={500}
          className='base-border w-full max-w-[380px] rounded-lg object-cover sm:max-w-[280px]'
        />
      </section>
      <div>
        <h2 className='font-sans text-2xl leading-relaxed'>Our Story</h2>
        <p>
          Founded in 1992, {constants.name} began as a passion project by a group of fashion
          enthusiasts who wanted to create a platform where people could discover the latest
          trends, shop for high-quality clothing, and express their unique sense of style.
          What started as a small venture has now grown into a thriving online community,
          connecting fashion lovers from around the world.
        </p>
      </div>

      <div>
        <h2 className='font-sans text-2xl leading-relaxed'>Our Mission</h2>
        <p>
          At {constants.name}, our mission is to empower individuals to look and feel their
          best every day. We believe that fashion should be accessible, inclusive, and fun.
          That's why we're committed to offering a diverse range of styles, sizes, and price
          points to cater to every taste and budget.
        </p>
      </div>

      <div>
        <h2 className='font-sans text-2xl leading-relaxed'>Our Collection</h2>
        <p>
          Discover an extensive selection of clothing and accessories carefully curated by
          our team of fashion experts. From trendy tops and dresses to cozy knitwear and
          stylish outerwear, we've got everything you need to elevate your wardrobe. Whether
          you're dressing for a casual day out or a special occasion, you'll find the
          perfect pieces to express your personal style.
        </p>
      </div>

      <div>
        <h2 className='font-sans text-2xl leading-relaxed'>Quality Assurance</h2>
        <p>
          At {constants.name}, we're dedicated to delivering the highest quality products to
          our customers. We partner with trusted suppliers and designers who share our
          commitment to craftsmanship, durability, and sustainability. Each item in our
          collection is meticulously inspected to ensure it meets our standards of
          excellence.
        </p>
      </div>

      <div>
        <h2 className='font-sans text-2xl leading-relaxed'>Customer Experience</h2>
        <p>
          Your satisfaction is our top priority. We strive to provide an exceptional
          shopping experience from start to finish. With user-friendly navigation, secure
          payment options, and fast shipping, we make it easy for you to shop with
          confidence. Our friendly customer support team is always available to assist you
          with any questions or concerns you may have.
        </p>
      </div>

      <div>
        <h2 className='font-sans text-2xl leading-relaxed'>Join Our Community</h2>
        <p>
          Become a part of the {constants.name} community and connect with fellow fashion
          enthusiasts from around the world. Follow us on social media for style
          inspiration, exclusive promotions, and behind-the-scenes glimpses of our latest
          arrivals. Share your #OOTD (Outfit of the Day) and join the conversation!
        </p>
      </div>

      <p>
        Thank you for choosing {constants.name} as your go-to destination for all your
        fashion needs. We're excited to embark on this style journey with you and help you
        discover your signature look. Happy shopping!
      </p>

      <CallToAction />
    </main>
  );
}
