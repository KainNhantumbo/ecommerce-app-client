import { XIcon } from 'lucide-react';
import { Button } from './ui/button';
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
import type {  CreateBillboard } from '@/types';
import { Input } from './ui/input';
import { DropzoneArea } from './dropzone';
import { ImageViewer } from './image-viewer';
import { FC, useState } from 'react';
import { Label } from 'recharts';

export type BillboardEditorProps = {
  defaultValues: CreateBillboard;
  isLoading: boolean;
  role: 'update' | 'create';
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: CreateBillboard) => void | Promise<void>;
};

export const BillboardEditor: FC<BillboardEditorProps> = ({
  onSubmit,
  isLoading,
  defaultValues,
  role
}) => {
  const [data, setData] = useState<CreateBillboard>(defaultValues);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>{role}</Button>
      </SheetTrigger>
      <SheetHeader>
        <SheetTitle>Billboard</SheetTitle>
        <SheetDescription>Create and edit your billboards.</SheetDescription>
      </SheetHeader>
      <SheetContent>
        <div>
          <Label>Label</Label>
          <Input type='text' disabled={isLoading} placeholder='Billboard label' />
        </div>
        <div>
          {data.image ? (
            <ImageViewer imageData={data.image} />
          ) : (
            <div>
              <DropzoneArea
                handler={(encodedImage) => {
                  setData((data) => ({ ...data, image: encodedImage }));
                }}
              />
              <div>
                <Button onClick={() => setData((data) => ({ ...data, image: '' }))}>
                  Clear image
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
      <SheetFooter>
        <SheetClose disabled={isLoading}>
          <XIcon />
        </SheetClose>
        <Button
          disabled={isLoading}
          onClick={() => onSubmit(data)}
          className='capitalize'>
          {role}
        </Button>
      </SheetFooter>
    </Sheet>
  );
};
