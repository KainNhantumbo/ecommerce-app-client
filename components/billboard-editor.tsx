import { updateBillboardData } from '@/redux/slices/create-billboard';
import { AppDispatch, RootState } from '@/redux/store';
import { type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from 'recharts';
import { DropzoneArea } from './dropzone';
import { ImageViewer } from './image-viewer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './ui/sheet';
import { Edit2Icon } from 'lucide-react';

export type BillboardEditorProps = {
  id?: number;
  isLoading: boolean;
  role: 'update' | 'create';
  onCreate?: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  onUpdate?: () => void;
};

export const BillboardEditor: FC<BillboardEditorProps> = ({
  onCreate,
  onUpdate,
  isLoading,
  role,
  id
}) => {
  const billboard = useSelector((state: RootState) => state.createBillboard);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Sheet
      onOpenChange={(isOpen) => {
        !isOpen && dispatch(updateBillboardData({ image: '', label: '' }));
      }}>
      <SheetTrigger asChild>
        {role === 'create' ? (
          <Button size={'lg'} className='capitalize'>
            {role}
          </Button>
        ) : (
          <div className='flex cursor-pointer items-center'>
            <Edit2Icon className='mr-2 h-auto w-4' />
            <span>Edit</span>
          </div>
        )}
      </SheetTrigger>
      <SheetContent className='font-sans-body text-font'>
        <SheetHeader className='mb-5'>
          <SheetTitle className='font-sans text-font'>Billboard editor</SheetTitle>
          <SheetDescription>Create and edit your billboards.</SheetDescription>
        </SheetHeader>
        <section className='mb-5 flex flex-col gap-3'>
          <div className=' flex w-full flex-col gap-2'>
            <Label>Label *</Label>
            <Input
              type='text'
              disabled={isLoading}
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
        <SheetFooter>
          {onCreate ? (
            <SheetClose asChild disabled={isLoading}>
              <Button
                disabled={isLoading}
                onClick={() => onCreate()}
                className='capitalize'>
                {role}
              </Button>
            </SheetClose>
          ) : null}
          {onUpdate && id ? (
            <SheetClose asChild disabled={isLoading}>
              <Button disabled={isLoading} onClick={onUpdate} className='capitalize'>
                {role}
              </Button>
            </SheetClose>
          ) : null}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
