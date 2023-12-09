import Link from 'next/link';
import { constants } from '@/shared/constants';
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  LucideIcon
} from 'lucide-react';
import {
  RiAmazonFill,
  RiAppleFill,
  RiGoogleFill,
  RiMastercardFill,
  RiPaypalFill,
  RiVisaFill
} from 'react-icons/ri';

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
      { label: 'Careers', url: '#' },
      { label: 'Stories', url: '#' },
      { label: 'Find a Store', url: '#' }
    ]
  },
  {
    title: 'Home',
    children: [
      { label: 'Products', url: '/' },
      { label: 'Display', url: '#' },
      { label: 'Contact', url: '/contact' },
      { label: 'FAQ', url: '#' }
    ]
  },
  {
    title: 'Service',
    children: [
      { label: 'Orders', url: '#' },
      { label: 'Features', url: '#' },
      { label: 'Terms & Conditions', url: '/terms-and-conditions' },
      { label: 'Privacy Policy', url: '/privacy-policy' }
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

export default function Footer() {
  return (
    <footer className='w-full flex flex-col p-4 font-sans mt-10 z-0'>
      <section className='w-full flex flex-col gap-8 max-w-[890px] mx-auto'>
        <nav className='w-full flex flex-col mobile-x:flex-row gap-8'>
          {navigation.map(({ title, children }, index) => (
            <section key={index} className='flex flex-col gap-2'>
              <h3>{title}</h3>
              <div className='flex flex-col gap-1'>
                {children.map(({ url, label }, i) => (
                  <Link
                    key={i}
                    href={url}
                    className='base-link hover:text-primary'>
                    {label}
                  </Link>
                ))}
              </div>
            </section>
          ))}
          <section className='flex flex-col gap-3 max-w-[100px]'>
            <h3>Payments</h3>
            <div className='grid grid-cols-2 place-content-center gap-2 '>
              <RiAmazonFill className='w-[20px] h-[20px]' />
              <RiVisaFill className='w-[20px] h-[20px]' />
              <RiMastercardFill className='w-[20px] h-[20px]' />
              <RiAppleFill className='w-[20px] h-[20px]' />
              <RiGoogleFill className='w-[20px] h-[20px]' />
              <RiPaypalFill className='w-[20px] h-[20px]' />
            </div>
          </section>
        </nav>

        <section className='w-full flex flex-wrap gap-3 items-center justify-between'>
          <p className='font-medium text-sm'>
            &copy; {new Date().getFullYear()} {constants.name}
          </p>

          <div className='font-medium flex-wrap text-sm flex gap-3 hover:text-primary'>
            {socialMedia.map((media, i) => (
              <Link
                href={media.url}
                key={i}
                className='flex flex-row gap-1 items-center hover:text-primary'>
                <media.icon className='w-[14px]' />
                <span className='hover:text-primary'>{media.label}</span>
              </Link>
            ))}
          </div>

          <Link className='font-medium text-sm' href={'/privacy-policy'}>
            Terms & Conditions
          </Link>
        </section>
      </section>
    </footer>
  );
}
