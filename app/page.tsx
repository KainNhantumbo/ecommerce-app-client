import CallToAction from '@/components/brand-call-to-action';
import BrandFeatures from '@/components/brand-features';
import BrandTestimonials from '@/components/brand-testmonials';
import BrandNewsletter from '@/components/breand-newsletter';

export default function Page() {
  return (
    <main className='w-full px-4 mt-[70px] font-sans flex flex-col gap-12'>
      <section className='w-full max-w-[890px] mx-auto'>
        <h1>Huge title</h1>
      </section>
      <BrandFeatures />
      <BrandTestimonials />
      <CallToAction/>
      <BrandNewsletter/>
    </main>
  );
}
