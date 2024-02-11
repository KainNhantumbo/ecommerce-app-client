'use client';

import { BillboardEditor } from '@/components/billboard-editor';
import { BillboardTableRender } from '@/components/billboard-table-render';
import { EmptyMessage } from '@/components/empty-message';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import { updateBillboards } from '@/redux/slices/billboards';
import { AppDispatch, RootState } from '@/redux/store';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import type { Billboard, CreateBillboard, HttpError } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function Page() {
  const { httpClientAPI } = useAppContext();
  const [loading, setLoading] = useState(false);
  const billboard = useSelector((state: RootState) => state.createBillboard);
  const billboards = useSelector((state: RootState) => state.billboards);
  const dispatch = useDispatch<AppDispatch>();

  const getBillBoards = async () => {
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
    } finally {
      setLoading(false);
    }
  };

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ['billboards'],
    queryFn: getBillBoards
  });

  const updateBillboard = async (id: number) => {
    try {
      setLoading(true);
      await httpClientAPI<CreateBillboard>({
        method: 'post',
        url: `/api/v1/billboards/${id}`,
        data: billboard
      });
      refetch();
      toast.success('Billboard updated.');
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message || DEFAULT_ERROR_MESSAGE);
      console.warn(message || error);
    } finally {
      setLoading(false);
    }
  };

  const createBillboard = async () => {
    try {
      setLoading(true);
      await httpClientAPI({
        method: 'post',
        url: '/api/v1/billboards',
        data: billboard
      });
      refetch();
      toast.success('Billboard created.');
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message || DEFAULT_ERROR_MESSAGE);
      console.warn(message || error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBillboard = async (id: number) => {
    try {
      await httpClientAPI({
        method: 'delete',
        url: `/api/v1/billboards/${id}`
      });
      refetch();
      toast.success('Billboard deleted.');
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message || DEFAULT_ERROR_MESSAGE);
      console.warn(message || error);
    }
  };

  useMemo(() => {
    if (data) dispatch(updateBillboards(data));
  }, [data]);

  return (
    <main className='mx-auto mt-[90px] flex min-h-[calc(100vh_-_340px)] w-full max-w-5xl flex-col gap-8 px-4 font-sans-body'>
      <div className='flex w-full flex-wrap items-center justify-between gap-3'>
        <Label className='font-sans text-4xl leading-relaxed'>Billboards</Label>
        <BillboardEditor
          role='create'
          isLoading={loading}
          onCreate={createBillboard}
        />
      </div>

      <section>
        {!isLoading && !isError ? (
          <BillboardTableRender
            data={billboards}
            onDelete={deleteBillboard}
            onUpdate={updateBillboard}
          />
        ) : null}

        {!isLoading && isError ? (
          <EmptyMessage
            icon={AlertTriangle}
            message={
              errorTransformer(error as HttpError).message || DEFAULT_ERROR_MESSAGE
            }
            action={{ handler: () => refetch(), label: 'Retry' }}
          />
        ) : null}
      </section>
    </main>
  );
}
