import { constants } from '@/shared/constants';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  LucideIcon,
  TwitterIcon
} from 'lucide-react';
import Link from 'next/link';

type Navigation = {
  title: string;
  children: { url: string; label: string }[];
}[];

type SocialProps = {
  url: string;
  label: string;
  icon: LucideIcon;
}[];

const navigation: Navigation = [
  {
    title: 'Our Company',
    children: [
      { label: 'About Us', url: '/about' },
      { label: 'Careers', url: '/careers' },
      { label: 'Stories', url: '/stories' }
    ]
  },
  {
    title: 'Home',
    children: [
      { label: 'Products', url: '/products' },
      { label: 'Contact', url: '/contact' },
      { label: 'FAQ', url: '/faq' }
    ]
  },
  {
    title: 'Service',
    children: [
      { label: 'Our Terms', url: '/terms-and-conditions' },
      { label: 'Cart & Checkout', url: '/checkout' }
    ]
  },
  {
    title: 'For Employees',
    children: [
      { label: 'Sign In', url: '/auth/sign-in' },
      { label: 'Sign Up', url: '/auth/sign-up' },
      { label: 'Manage', url: '/dashboard' }
    ]
  }
];

const socialMedia: SocialProps = [
  { url: '/', label: 'Facebook', icon: FacebookIcon },
  { url: '/', label: 'LinkedIn', icon: LinkedinIcon },
  { url: '/', label: 'Instagram', icon: InstagramIcon },
  { url: '/', label: 'Twitter', icon: TwitterIcon }
];

export const Footer = () => {
  return (
    <footer className='z-0 mt-10 flex w-full flex-col bg-background p-4 font-sans'>
      <section className='mx-auto flex w-full max-w-5xl flex-col gap-8'>
        <nav className='grid w-full grid-cols-2 gap-8 sm:grid-cols-4 md:grid-cols-5'>
          {navigation.map(({ title, children }, index) => (
            <section key={index} className='flex flex-col gap-2'>
              <h3>{title}</h3>
              <div className='flex flex-col gap-1'>
                {children.map(({ url, label }, i) => (
                  <Link
                    key={i}
                    href={url}
                    className='sm:text-left; w-fit text-center transition-colors hover:text-primary hover:underline
  hover:underline-offset-4'>
                    {label}
                  </Link>
                ))}
              </div>
            </section>
          ))}
          {/* <section className='flex flex-col gap-3 max-w-[100px] items-center'>
            <h3>Payments</h3>
            <div className='grid grid-cols-2 place-content-center gap-2 '>
              <RiAmazonFill className='w-[22px] h-[22px]' />
              <RiVisaFill className='w-[22px] h-[22px]' />
              <RiMastercardFill className='w-[22px] h-[22px]' />
              <RiAppleFill className='w-[22px] h-[22px]' />
              <RiGoogleFill className='w-[22px] h-[22px]' />
              <RiPaypalFill className='w-[22px] h-[22px]' />
            </div>
          </section> */}
        </nav>

        <section className='flex w-full flex-wrap items-center justify-between gap-3'>
          <p className='text-sm font-medium'>
            &copy; {new Date().getFullYear()} {constants.name}
          </p>

          <div className='flex flex-wrap gap-3 text-sm font-medium hover:text-primary'>
            {socialMedia.map((media, i) => (
              <Link
                href={media.url}
                key={i}
                className='flex flex-row items-center gap-1 hover:text-primary'>
                <media.icon className='w-[14px]' />
                <span className='hover:text-primary'>{media.label}</span>
              </Link>
            ))}
          </div>

          <Link className='text-sm font-medium' href={'/privacy-policy'}>
            Privacy Policy
          </Link>
        </section>
      </section>
    </footer>
  );
};
