import storiesCoverImage from '@/public/stories-jeffery-erhunse-4XK2oKKvzVU-unsplash.jpg';
import { constants } from '@/shared/constants';
import Image from 'next/image';

export default function Stories() {
  return (
    <main className='mx-auto mt-24 flex w-full max-w-5xl flex-col gap-8 px-4 font-sans'>
      <div className='mx-auto flex w-full flex-wrap justify-center gap-8'>
        <h1 className='w-full max-w-[420px] p-4 font-sans text-4xl leading-relaxed sm:text-5xl sm:leading-relaxed'>
          Explore our vibrant fashion crafting <i className='text-primary'>Journey!</i>
        </h1>
        <div className='relative after:absolute after:-bottom-4 after:-right-6 after:-z-40 after:h-[320px] after:w-[320px] after:rounded-lg after:bg-primary after:shadow-xl mobile:left-0'>
          <Image
            src={storiesCoverImage}
            width={640}
            height={640}
            className='base-image relative -left-5 h-auto max-w-[320px] rounded-lg shadow-xl'
            alt='cover image by dom hill - unsplash'
            priority
          />
        </div>
      </div>

      <section className='mx-auto flex w-full max-w-4xl flex-col gap-3 font-sans-body text-lg'>
        <p>
          Step into a world where fashion is more than just clothing—it's a vibrant
          tapestry of stories waiting to be told. Welcome to our Stories page, a place
          where inspiration, creativity, and the essence of style converge to captivate
          and inspire.
        </p>
        <p>
          Here, amidst the digital pages of our platform, you'll find a collection of
          narratives that celebrate the diverse journeys and experiences of our
          community. From the glitz and glamour of the runway to the intimate moments of
          personal style exploration, each story is a testament to the transformative
          power of fashion.
        </p>
        <p>
          Join us as we delve into the depths of creativity, exploring the
          behind-the-scenes magic of the fashion industry, spotlighting individuals who
          are shaping trends and pushing boundaries, and sharing personal tales of
          self-expression and empowerment.
        </p>
        <p>
          Whether you're seeking inspiration, insight, or simply a moment of connection
          with fellow fashion enthusiasts, our Stories page invites you to embark on a
          journey of discovery. So, sit back, immerse yourself in the beauty of
          storytelling, and let the pages of our Stories section unfold before you.
        </p>
      </section>

      <section className='mx-auto flex w-full max-w-4xl flex-col items-center gap-5'>
        <h2 className='text-center text-2xl leading-relaxed'>
          Here is Where Fashion Comes to Life...
        </h2>

        <section className='grid max-w-4xl grid-cols-1 place-content-center gap-3 font-sans-body text-lg sm:grid-cols-2'>
          <div>
            <h3 className='text-green-500'>Style Spotlight</h3>
            <p>
              Step into the spotlight and discover the stories behind some of the most
              iconic fashion moments. From red carpet glamour to street style
              sensations, our Style Spotlight section shines a light on the individuals
              who are shaping the world of fashion with their bold choices and
              distinctive tastes.
            </p>
          </div>
          <div>
            <h3 className='text-green-500'>Behind the Seams</h3>
            <p>
              Go behind the scenes and uncover the secrets of the fashion industry. In
              this section, we lift the curtain to reveal the creative processes,
              craftsmanship, and innovation that go into creating the garments and
              accessories you love. Gain insights from designers, artisans, and industry
              insiders as they share their stories and expertise.
            </p>
          </div>
        </section>

        <section className='grid max-w-4xl grid-cols-1 place-content-center gap-3 font-sans-body text-lg sm:grid-cols-2'>
          <div>
            <h3 className='text-green-500'>Fashion Forward</h3>
            <p>
              Stay ahead of the curve with our Fashion Forward section, where we explore
              the latest trends, collections, and must-have pieces. Whether you're
              seeking inspiration for your next wardrobe refresh or eager to discover
              emerging designers, this is your go-to destination for all things
              fashion-forward.
            </p>
          </div>
          <div>
            <h3 className='text-green-500'>Personal Stories</h3>
            <p>
              Every outfit tells a story, and in this section, we invite you to share
              yours. From memorable fashion moments to transformative style journeys,
              our Personal Stories section is a platform for you to celebrate your
              unique experiences and connect with like-minded individuals who share your
              passion for self-expression through clothing.
            </p>
          </div>
        </section>

        <section className='grid max-w-4xl grid-cols-1 place-content-center gap-3 font-sans-body text-lg sm:grid-cols-2'>
          <div>
            <h3 className='text-green-500'>Community Spotlight</h3>
            <p>
              At {constants.name}, our community is at the heart of everything we do. In
              this section, we shine a spotlight on the individuals who make our
              community vibrant and diverse. Meet fellow fashion enthusiasts, discover
              their stories, and celebrate the connections that unite us through a
              shared love of style.
            </p>
          </div>
        </section>
        <p className='font-sans-body text-lg'>
          Join us on a journey of inspiration, discovery, and self-expression as we
          explore the stories that shape the world of fashion. Whether you're a
          trendsetter, a storyteller, or simply a lover of beautiful garments, there's
          something here for everyone. Sit back, relax, and immerse yourself in the
          magic of fashion storytelling.
        </p>
      </section>
    </main>
  );
}
