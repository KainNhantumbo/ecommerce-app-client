'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { useToggleHeader } from '@/hooks/useToggleHeader';
import { useInnerWindowSize } from '@/hooks/useInnerWindowSize';
import { RiCloseLine, RiMenu4Fill } from 'react-icons/ri';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';
import { Button } from './ui/button';

const mainRoutes = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Contact', href: '/contact' },
  { name: 'About', href: '/about' },
  { name: 'Careers', href: '/careers' }
];

const adminRoutes = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'Orders', href: '/dashboard/orders' },
  { name: 'Products', href: '/dashboard/products' },
  { name: 'Attributes', href: '/dashboard/attributes' },
  { name: 'Settings', href: '/dashboard/about' },
  { name: 'Billboards', href: '/dashboard/careers' }
];

// TODO: this have to be placed into attributes page
// { name: 'Categories', href: '/dashboard/features', icon: GridIcon },
// { name: 'Sizes', href: '/dashboard/about', icon: RiLineHeight },
// { name: 'Colors', href: '/dashboard/about', icon: RiDropLine },

export default function Header() {
  const { onToggleReveal, isBreakPoint } = useToggleHeader(768);
  const { width: windowWidth } = useInnerWindowSize();
  const pathname = usePathname();

  const isProtectedRoutes = pathname.includes('dashboard');

  return (
    <header className='w-full z-50 h-[52px] fixed top-0 left-0 bg-background border-solid md:px-4 font-sans text-sm'>
      <div className='w-full mx-auto xl:max-w-[1200px] bg-background '>
        <div className='absolute top-3 left-8 lg:left-[calc(50%_-_480px)]  w-fit flex  items-center gap-1 bg-background '>
          <Image
            className='h-5 w-auto'
            width={20}
            height={20}
            src='/favicon.png'
            alt='logo image'
          />
          <span className='font-medium text-md text-primary'>WeCommerce</span>
        </div>

        <nav
          role='main'
          className='md:w-fit md:mx-auto md:h-[48px] md:p-0 md:static md:px-8 lg:px-24 relative flex flex-col md:flex-row items-center md:justify-center gap-3 top-14 max-w-[95%] backdrop-blur-md bg-[#fafafa99] dark:bg-[#1b1b1f99] sm:bg-background sm:dark:bg-background rounded-2xl mx-auto'
          aria-label='Global'
          style={{ display: isBreakPoint ? 'flex' : 'none' }}>
          <section className='flex sm:flex-row gap-3 md:items-center font-semibold text-md flex-col w-full p-5 rounded-md'>
            {isProtectedRoutes
              ? adminRoutes.map((route, i) => (
                  <Link
                    href={route.href}
                    key={i}
                    className='text-sm font-semibold leading-6 hover:text-secondary'>
                    {route.name}
                  </Link>
                ))
              : mainRoutes.map((route, i) => (
                  <Link
                    href={route.href}
                    key={i}
                    className='text-sm font-semibold leading-6 hover:text-primary hover:underline hover:underline-offset-4 hover:decoration-dashed'>
                    {route.name}
                  </Link>
                ))}
          </section>
        </nav>

        <div
          className={clsx(
            ' fixed top-[1px] right-14 md:right-8 border-none md:flex lg:right-[calc(50%_-_480px)] w-fit flex-col md:flex-row items-center gap-2 px-2 py-1  ',
            {
              ' ': isBreakPoint
            }
          )}>
          <ThemeToggle />
        </div>

        <Button
          variant={'outline'}
          size={'icon'}
          onClick={onToggleReveal}
          className={clsx(' fixed top-1 right-5 border-none  md:hidden', {
            'bg-transparent': isBreakPoint
          })}>
          {!isBreakPoint ? (
            <div className='flex items-center gap-2 font-semibold pointer-events-none'>
              <RiMenu4Fill className={'w-5 h-5 pointer-events-none'} />
            </div>
          ) : (
            <RiCloseLine className={'w-5 h-5 pointer-events-none'} />
          )}
        </Button>
      </div>
    </header>
  );
}
