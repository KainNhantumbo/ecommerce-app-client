import { CallToAction } from '@/components/brand-call-to-action';
import { BrandFeatures } from '@/components/brand-features';
import { BrandTestimonials } from '@/components/brand-testimonials';
import { BrandNewsletter } from '@/components/brand-newsletter';
import { Introduction } from '@/components/introduction';
import { BrandSupport } from '@/components/brand-support';

export default function Page() {
  return (
    <main className='mt-[70px] flex w-full flex-col gap-8 mobile-x:gap-20 px-4 font-sans-body'>
      <Introduction />
      <BrandSupport />
      <BrandFeatures />
      <BrandTestimonials />
      <CallToAction />
      <BrandNewsletter />
    </main>
  );
}
