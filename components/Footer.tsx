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
    <footer>
      <nav>
        {navigation.map(({ title, children }, index) => (
          <section key={index}>
            <h3>{title}</h3>
            <div>
              {children.map(({ url, label }, i) => (
                <Link key={i} href={url}>
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
        <section>
          <h3>Payments</h3>
          <div>
            <RiAmazonFill />
            <RiVisaFill />
            <RiMastercardFill />
            <RiAppleFill />
            <RiGoogleFill />
            <RiPaypalFill />
          </div>
        </section>
      </nav>
      <section>
        <p className=''>
          &copy; {new Date().getFullYear()} {constants.name} All Rights Reserved
        </p>

        <div>
          {socialMedia.map((media, i) => (
            <Link href={media.url} key={i} className=''>
              <media.icon />
              <span>{media.label}</span>
            </Link>
          ))}
        </div>

        <Link className='' href={'/privacy-policy'}>
          Terms & Conditions
        </Link>
      </section>
    </footer>
  );
}
