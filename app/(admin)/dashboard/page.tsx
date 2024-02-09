'use client';

import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import { UserSignupType } from '@/providers/schemas';
import { HttpError } from '@/types';
import { useQueries } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export type User = Omit<UserSignupType, 'password' | 'confirm_password'> & {
  id: string;
}; 

export default function Page() {
  const { httpClientAPI } = useAppContext();

  const getProducts = async()=> {

  }

  const getUsers = async () => {
    try {
      const { data } = await httpClientAPI<User[]>({
        method: 'get',
        url: '/api/v1/users'
      });
      console.info(data);
      return data;
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.warn(message);
    }
  };

  const [users] = useQueries({
    queries: [{ queryFn: getUsers, queryKey: ['users'] }]
  });

  useEffect(() => {
    // query()
    getUsers()
 }, []);

  return (
    <main className='mx-auto mt-24 flex w-full max-w-5xl flex-col gap-8 px-4 font-sans-body text-lg'>
      <h1 className='font-sans'>Dashboard</h1>

      <section></section>
    </main>
  );
}
