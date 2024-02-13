import {
  RiBankCardLine,
  RiCustomerService2Line,
  RiMoneyDollarCircleLine,
  RiTruckLine
} from '@remixicon/react';

const data = [
  {
    title: 'Money Guarantee',
    description: 'Within 30 days for an exchange',
    icon: RiMoneyDollarCircleLine
  },
  {
    title: 'Free Shipping',
    description: 'Free shipping for order above $150',
    icon: RiTruckLine
  },
  {
    title: 'Online Support',
    description: '24 hours a day, 7 days a week',
    icon: RiCustomerService2Line
  },
  {
    title: 'Flexible Payments',
    description: 'Pay with multiple credit cards',
    icon: RiBankCardLine
  }
];

export const BrandSupport = () => {
  return (
    <section className='mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center gap-3 font-sans-body mobile-x:justify-between'>
      {data.map((item, i) => (
        <div
          key={i}
          className='flex w-full max-w-[220px] flex-col gap-2 rounded-lg bg-primary/5 p-3'>
          <item.icon className='h-auto w-6' />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </section>
  );
};
