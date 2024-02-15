'use client';

import { DropzoneArea } from '@/components/dropzone';
import { ImageViewer } from '@/components/image-viewer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import httpClient from '@/config/http-client';
import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import { Billboard, CreateBillboard, HttpError } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export type PageProps = { params: { mode: 'create' | 'update'; billboardId?: string } };

export default function Page({ params }: PageProps) {
  const [billboard, setBillboard] = useState<CreateBillboard>({ image: '', label: '' });
  const [isDisabled, setIsDisabled] = useState(false);
  const { httpClientAPI } = useAppContext();
  const router = useRouter();

  useQuery({
    queryKey: ['edit-billboard'],
    queryFn: async () => {
      try {
        if (!params.billboardId || params.mode === 'create') return billboard;
        const { data } = await httpClient<Billboard>({
          method: 'get',
          url: `/api/v1/billboards/${params.billboardId}`
        });
        setBillboard({ label: data.label, image: data.image.url });
        return { label: data.label, image: data.image.url };
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message || DEFAULT_ERROR_MESSAGE);
        console.warn(message || error);
      }
    }
  });

  const handleUpdate = async (billboardId: number) => {
    try {
      setIsDisabled(true);
      await httpClientAPI<CreateBillboard>({
        method: 'patch',
        url: `/api/v1/billboards/${billboardId}`,
        data: billboard
      });
      setBillboard({ label: '', image: '' });
      toast.success('Billboard updated.', {
        action: {
          label: 'Get Back',
          onClick: () => router.back()
        }
      });
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message || DEFAULT_ERROR_MESSAGE, {
        action: {
          label: 'Retry',
          onClick: () => handleUpdate(billboardId)
        }
      });
      console.warn(message || error);
    } finally {
      setIsDisabled(false);
    }
  };

  const handleCreate = async () => {
    try {
      setIsDisabled(true);
      await httpClientAPI({
        method: 'post',
        url: '/api/v1/billboards',
        data: billboard
      });
      toast.success('Billboard created.', {
        action: {
          label: 'Get Back',
          onClick: () => router.back()
        }
      });
      setBillboard({ label: '', image: '' });
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message || DEFAULT_ERROR_MESSAGE, {
        action: {
          label: 'Retry',
          onClick: () => handleCreate()
        }
      });
      console.warn(message || error);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <main className='mx-auto mt-[90px] flex min-h-[calc(100vh_-_340px)] w-full max-w-5xl flex-col gap-8 px-4 font-sans-body'>
      <h1>Billboard editor</h1>
      <section className='mb-5 flex flex-col gap-3'>
        <div className=' flex w-full flex-col gap-2'>
          <Label>Label *</Label>
          <Input
            type='text'
            disabled={isDisabled}
            value={billboard.label}
            maxLength={21}
            placeholder='Type billboard label here'
            onChange={(e) => setBillboard({ ...billboard, label: e.target.value })}
          />
          <span className='self-end text-xs'>{billboard.label.length} / 21</span>
        </div>

        <div className=' flex w-full flex-col gap-3'>
          {billboard.image ? (
            <div className='relative flex max-h-[220px] w-full max-w-5xl flex-col gap-3'>
              <ImageViewer imageData={billboard.image} />
              <Button
                className='base-border absolute right-3 top-3 h-6 w-6 rounded-full bg-background p-1'
                variant={'destructive'}
                onClick={() => setBillboard({ ...billboard, image: '' })}>
                <XIcon />
              </Button>
            </div>
          ) : (
            <div>
              <DropzoneArea
                width={2048}
                height={440}
                handler={(encodedImage) => {
                  setBillboard({ ...billboard, image: encodedImage });
                }}
              />
              <p className='py-4'>Resolution: 1024 x 220px</p>
            </div>
          )}
        </div>
      </section>

      <Button
        disabled={isDisabled}
        onClick={() => {
          if (params.mode === 'update') {
            handleUpdate(Number(params?.billboardId));
          } else if (params.mode === 'create') {
            handleCreate();
          }
        }}
        className='w-fit self-end capitalize'>
        {params.mode === 'create' ? 'save' : 'update'}
      </Button>
    </main>
  );
}
