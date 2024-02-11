import { DropzoneArea } from '@/components/dropzone';
import { ImageViewer } from '@/components/image-viewer';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import { updateBillboardData } from '@/redux/slices/create-billboard';
import { AppDispatch, RootState } from '@/redux/store';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import { CreateBillboard, HttpError } from '@/types';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from 'recharts';
import { toast } from 'sonner';

export type PageProps = { params: { mode: 'create' | 'update'; id?: string } };

export default function Page({ params }: PageProps) {
  const billboard = useSelector((state: RootState) => state.createBillboard);
  const dispatch = useDispatch<AppDispatch>();
  const isDisabled = !billboard.image || !billboard.label;
  const { httpClientAPI } = useAppContext();

  const handleUpdate = async (id: number) => {
    try {
      await httpClientAPI<CreateBillboard>({
        method: 'post',
        url: `/api/v1/billboards/${id}`,
        data: billboard
      });
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message || DEFAULT_ERROR_MESSAGE);
      console.warn(message || error);
    }
  };

  const handleCreate = async () => {
    try {
      await httpClientAPI({
        method: 'post',
        url: '/api/v1/billboards',
        data: billboard
      });
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message || DEFAULT_ERROR_MESSAGE);
      console.warn(message || error);
    }
  };

  return (
    <main>
      <section className='mb-5 flex flex-col gap-3'>
        <div className=' flex w-full flex-col gap-2'>
          <Label>Label *</Label>
          <Input
            type='text'
            disabled={isDisabled}
            value={billboard.label}
            onChange={(e) =>
              dispatch(updateBillboardData({ ...billboard, label: e.target.value }))
            }
            placeholder='Type billboard label here'
          />
        </div>

        <div className=' flex flex-col gap-3'>
          {billboard.image ? (
            <div className='flex flex-col gap-3'>
              <ImageViewer imageData={billboard.image} />

              <Button
                variant={'destructive'}
                onClick={() =>
                  dispatch(updateBillboardData({ ...billboard, image: '' }))
                }>
                Clear image
              </Button>
            </div>
          ) : (
            <DropzoneArea
              handler={(encodedImage) => {
                dispatch(updateBillboardData({ ...billboard, image: encodedImage }));
              }}
            />
          )}
        </div>
      </section>

      <Button
        disabled={isDisabled}
        onClick={() => {
          if (params.mode === 'update') {
            handleUpdate(billboard.id);
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
