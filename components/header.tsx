'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { useToggleHeader } from '@/hooks/toggle-header-hook';
import { RootState } from '@/redux/store';
import clsx from 'clsx';
import { MenuIcon, ShoppingCartIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';

const mainRoutes = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Contact', href: '/contact' },
  { name: 'About', href: '/about' },
  { name: 'Careers', href: '/careers' }
];

const adminRoutes = [
  { name: 'Overview', href: '/dashboard/overview' },
  { name: 'Billboards', href: '/dashboard/billboards' },
  { name: 'Products', href: '/dashboard/products' },
  { name: 'Orders', href: '/dashboard/orders' },
  { name: 'Users', href: '/dashboard/users' },
];

export const Header = () => {
  const pathname = usePathname();
  const cart = useSelector((state: RootState) => state.cart);
  const { onToggleReveal, isBreakPoint } = useToggleHeader(768);
  const isProtectedRoutes = pathname.includes('dashboard');

  return (
    <header className='fixed left-0 top-0 z-50 h-[52px] w-full border-b-[1px] border-solid bg-background font-sans text-sm md:px-4'>
      <div className='mx-auto w-full bg-background xl:max-w-[1200px] '>
        <div className='absolute left-8 top-3 flex w-fit items-center  gap-1 bg-background lg:left-[calc(50%_-_480px)] '>
          <Image
            className='h-5 w-auto'
            width={20}
            height={20}
            src='/favicon.png'
            alt='logo image'
          />
          <span className='text-md font-bold text-primary'>WeCommerce</span>
        </div>

        <nav
          role='main'
          className='relative top-14 mx-auto flex max-w-[95%] flex-col items-center gap-3 rounded-2xl bg-[#fafafa99] backdrop-blur-md dark:bg-[#1b1b1f99] sm:bg-background sm:dark:bg-background md:static md:mx-auto md:h-[48px] md:w-fit md:flex-row md:justify-center md:p-0 md:px-8 lg:px-24'
          aria-label='Global'
          style={{ display: isBreakPoint ? 'flex' : 'none' }}>
          <section className='text-md flex w-full flex-col gap-3 rounded-md p-5 font-semibold md:flex-row md:items-center'>
            {isProtectedRoutes
              ? adminRoutes.map((route, i) => (
                  <Link
                    href={route.href}
                    key={i}
                    className={clsx(
                      'text-sm font-semibold leading-6 hover:text-primary hover:underline hover:decoration-dashed hover:underline-offset-4',
                      { 'text-primary': pathname.includes(route.name) }
                    )}>
                    {route.name}
                  </Link>
                ))
              : mainRoutes.map((route, i) => (
                  <Link
                    href={route.href}
                    key={i}
                    className={clsx(
                      'text-sm font-semibold leading-6 hover:text-primary hover:underline hover:decoration-dashed hover:underline-offset-4',
                      { 'text-primary': pathname.includes(route.name) }
                    )}>
                    {route.name}
                  </Link>
                ))}
          </section>
        </nav>

        <div
          className={clsx(
            ' fixed right-14 top-[1px] w-fit flex-col items-center gap-2 border-none px-2 py-1 md:right-8 md:flex md:flex-row lg:right-[calc(50%_-_480px)]  '
          )}>
          <ThemeToggle />
        </div>

        <Button
          asChild
          variant={'ghost'}
          className=' fixed right-28 top-[6px] flex w-fit  items-center  border-none hover:cursor-pointer md:right-20 lg:right-[calc(50%_-_430px)]'>
          <Link href={'/checkout'} className='group flex w-fit items-center gap-2 px-2'>
            <ShoppingCartIcon className='pointer-events-none h-auto w-6 group-hover:stroke-primary' />
            <span className='font-bold group-hover:text-primary'>{cart.length}</span>
          </Link>
        </Button>

        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={onToggleReveal}
          className={clsx('group fixed right-5 top-1 border-none md:hidden', {
            'bg-transparent': isBreakPoint
          })}>
          {!isBreakPoint ? (
            <MenuIcon
              className={
                'pointer-events-none h-5 w-5 transition-colors group-hover:stroke-primary'
              }
            />
          ) : (
            <XIcon
              className={
                'pointer-events-none h-5 w-5 transition-colors group-hover:stroke-primary'
              }
            />
          )}
        </Button>
      </div>
    </header>
  );
};
