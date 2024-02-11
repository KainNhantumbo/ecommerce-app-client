'use client';

import { DropzoneArea } from '@/components/dropzone';
import { ImageViewer } from '@/components/image-viewer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import { CreateBillboard, HttpError } from '@/types';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export type PageProps = { params: { mode: 'create' | 'update'; id?: string } };

export default function Page({ params }: PageProps) {
  const [billboard, setBillboard] = useState<CreateBillboard>({ image: '', label: '' });
  const [isDisabled, setIsDisabled] = useState(false);
  const { httpClientAPI } = useAppContext();
  const router = useRouter();

  const handleUpdate = async (id: number) => {
    try {
      setIsDisabled(true);
      await httpClientAPI<CreateBillboard>({
        method: 'post',
        url: `/api/v1/billboards/${id}`,
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
          onClick: () => handleUpdate(id)
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
    <main className='mx-auto mt-[90px] flex min-h-[calc(100vh_-_340px)] w-full max-w-xl flex-col gap-8 px-4 font-sans-body'>
      <h1>Billboard editor</h1>
      <section className='mb-5 flex flex-col gap-3'>
        <div className=' flex w-full flex-col gap-2'>
          <Label>Label *</Label>
          <Input
            type='text'
            disabled={isDisabled}
            value={billboard.label}
            placeholder='Type billboard label here'
            onChange={(e) => setBillboard({ ...billboard, label: e.target.value })}
          />
        </div>

        <div className=' flex flex-col gap-3'>
          {billboard.image ? (
            <div className='relative flex flex-col gap-3'>
              <ImageViewer imageData={billboard.image} />
              <Button
                className='base-border absolute right-3 top-3 h-6 w-6 rounded-full bg-background p-1'
                variant={'destructive'}
                onClick={() => setBillboard({ ...billboard, image: '' })}>
                <XIcon />
              </Button>
            </div>
          ) : (
            <DropzoneArea
              handler={(encodedImage) => {
                setBillboard({ ...billboard, image: encodedImage });
              }}
            />
          )}
        </div>
      </section>

      <Button
        disabled={isDisabled}
        onClick={() => {
          if (params.mode === 'update') {
            handleUpdate(Number(params?.id));
          } else if (params.mode === 'create') {
            handleCreate();
          }
        }}
        className='capitalize'>
        {params.mode}
      </Button>
    </main>
  );
}
