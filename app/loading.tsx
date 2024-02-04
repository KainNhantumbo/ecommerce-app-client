'use client';
import { Loader } from '@/components/ui/loader';

const Loading = () => (
  <div className='grid place-content-center place-items-center h-[100vh] w-[100vw] bg-background'>
    <Loader />
  </div>
);

export default Loading;
