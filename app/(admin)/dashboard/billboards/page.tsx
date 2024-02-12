'use client';

import { BillboardTableRender } from '@/components/billboard-table-render';
import { EmptyMessage } from '@/components/empty-message';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import { updateBillboards } from '@/redux/slices/billboards';
import { AppDispatch, RootState } from '@/redux/store';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import type { Billboard, HttpError } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function Page() {
  const { httpClientAPI } = useAppContext();
  const dispatch = useDispatch<AppDispatch>();
  const billboards = useSelector((state: RootState) => state.billboards);

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ['billboards'],
    queryFn: async () => {
      try {
        const { data } = await httpClientAPI<Billboard[]>({
          method: 'get',
          url: '/api/v1/billboards'
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
    if (data) dispatch(updateBillboards(data));
  }, [data]);

  return (
    <main className='mx-auto mt-[90px] flex min-h-[calc(100vh_-_340px)] w-full max-w-3xl flex-col gap-8 px-4 font-sans-body'>
      <div className='flex w-full flex-wrap items-center justify-between gap-3'>
        <Label className='font-sans text-4xl leading-relaxed'>Billboards</Label>
        <Button asChild>
          <Link href={`/dashboard/billboards/create/new`} className='text-white'>
            Create Billboard
          </Link>
        </Button>
      </div>

      <section>
        {!isLoading && !isError ? <BillboardTableRender data={billboards} /> : null}

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
