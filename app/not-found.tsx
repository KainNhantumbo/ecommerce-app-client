import Link from 'next/link';
import { RiErrorWarningLine } from 'react-icons/ri';

export default function NotFound() {
  return (
    <main className='w-full flex h-full flex-col items-center justify-center gap-2'>
      <RiErrorWarningLine className='w-10 text-gray-400' />
      <h2 className='text-xl font-semibold'>404 Not Found</h2>
      <p>Could not find the page you're looking for.</p>
      <Link
        href='/'
        className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400'>
        Take me home
      </Link>
    </main>
  );
}
