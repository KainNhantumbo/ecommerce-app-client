'use client';

import { EmptyMessage } from '@/components/empty-message';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Loader } from '@/components/ui/loader';
import { UserTableRender } from '@/components/user-table-render';
import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import { updateUsers } from '@/redux/slices/users';
import { AppDispatch, RootState } from '@/redux/store';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import { HttpError, User } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function Page() {
  const { httpClientAPI } = useAppContext();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users);

  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ['users-query'],
    queryFn: async () => {
      try {
        const { data } = await httpClientAPI<User[]>({
          method: 'get',
          url: '/api/v1/users'
        });
        return data;
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message || DEFAULT_ERROR_MESSAGE);
        console.warn(message || error);
      }
    }
  });

  useEffect(() => {
    if (data) dispatch(updateUsers(data));
  }, [data]);

  return (
    <main className='mx-auto mt-[90px] flex min-h-[calc(100vh_-_340px)] w-full max-w-3xl flex-col gap-8 px-4 font-sans-body'>
      <div className='flex w-full flex-wrap items-center justify-between gap-3'>
        <Heading title='Users' description='View, edit and manage user accounts.' />
        <Button asChild>
          <Link href={`/auth/sign-up`} className='text-white'>
            Create User
          </Link>
        </Button>
      </div>

      <section>
        {!isLoading && !isError ? <UserTableRender data={users} /> : null}

        {!isLoading && isError ? (
          <EmptyMessage
            icon={AlertTriangle}
            action={{ handler: () => refetch(), label: 'Retry' }}
            message={
              errorTransformer(error as HttpError).message || DEFAULT_ERROR_MESSAGE
            }
          />
        ) : null}

        {isLoading && !isError ? (
          <div className='grid h-full w-full place-content-center place-items-center bg-background py-20'>
            <Loader />
          </div>
        ) : null}
      </section>
    </main>
  );
}
