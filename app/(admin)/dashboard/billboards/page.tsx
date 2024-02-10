'use client';

import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import { Billboard, HttpError } from '@/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export type CreateBillboard = { label: string; image: string };

export default function Page() {
  const { httpClientAPI } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [billboards, setBillboards] = useState<Billboard[]>([]);

  const getBillBoards = async () => {
    try {
      setLoading(true);
      const { data } = await httpClientAPI<Billboard[]>({
        method: 'get',
        url: '/api/v1/billboards'
      });
      setBillboards(data);
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message || DEFAULT_ERROR_MESSAGE);
      console.warn(message || error);
    } finally {
      setLoading(false);
    }
  };

  const updateBillboard = async (data: Billboard) => {
    try {
      setLoading(true);
      const { data: billboard } = await httpClientAPI<CreateBillboard>({
        method: 'post',
        url: `/api/v1/billboards/${data.id}`,
        data: { label: data.label, image: data.image }
      });
      setBillboards((billboards) => {
        return [...billboards, billboard as unknown as Billboard].sort((a, b) =>
          a.createdAt > b.createdAt ? -1 : 1
        );
      });
      toast.success('Billboard updated.');
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message || DEFAULT_ERROR_MESSAGE);
      console.warn(message || error);
    }
  };

  const createBillboard = async (data: CreateBillboard) => {
    try {
      setLoading(true);
      const { data: billboard } = await httpClientAPI({
        method: 'post',
        url: '/api/v1/billboards',
        data
      });
      setBillboards((billboards) => {
        return [...billboards, billboard as unknown as Billboard].sort((a, b) =>
          a.createdAt > b.createdAt ? -1 : 1
        );
      });
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
      getBillBoards();
      toast.success('Billboard deleted.');
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message || DEFAULT_ERROR_MESSAGE);
      console.warn(message || error);
    }
  };

  useEffect(() => {
    getBillBoards();
  }, []);

  return (
    <main>
      <Label>Billboards</Label>
    </main>
  );
}
