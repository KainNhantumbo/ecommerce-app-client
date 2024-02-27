import { Heading } from '@/components/ui/heading';

export type PageProps = { params: { orderId?: string } };

export default function Page({ params: { orderId } }: PageProps) {
  return (
    <main className='mx-auto mt-[90px] flex min-h-[calc(100vh_-_340px)] w-full max-w-5xl flex-col gap-8 px-4 font-sans-body'>
      <Heading title='Order Viewer' description={`Order ID: ${orderId}`} />

      <section className='mb-5 flex flex-col gap-3'>

      </section>
    </main>
  );
}
