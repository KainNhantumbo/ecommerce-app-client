'use client';

import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import type { Billboard, CreateBillboard, HttpError } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const { httpClientAPI } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [billboards, setBillboards] = useState<Billboard[]>([]);

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

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['billboards'],
    queryFn: getBillBoards
  });

  const updateBillboard = async (id: number, data: CreateBillboard) => {
    try {
      setLoading(true);
      await httpClientAPI<CreateBillboard>({
        method: 'post',
        url: `/api/v1/billboards/${id}`,
        data: { label: data.label, image: data.image }
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

  const createBillboard = async (data: CreateBillboard) => {
    try {
      setLoading(true);
      await httpClientAPI({
        method: 'post',
        url: '/api/v1/billboards',
        data
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

  const deleteBillboard = async (billboardId: number) => {
    try {
      await httpClientAPI({
        method: 'delete',
        url: `/api/v1/billboards/${billboardId}`
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
    if (data) setBillboards(data);
  }, [data]);

  return (
    <main>
      <Label>Billboards</Label>
    </main>
  );
}
