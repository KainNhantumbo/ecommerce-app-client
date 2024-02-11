import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { ImageViewer } from './image-viewer';
import type { FC } from 'react';
import { ImageIcon } from 'lucide-react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export const BillboardImagePreviewer: FC = () => {
  const billboard = useSelector((state: RootState) => state.createBillboard);
  return (
    <Dialog>
      <DialogTrigger className='flex items-center w-full'>
        <ImageIcon className='mr-2 h-auto w-4' />
        <span>Preview Image</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Billboard Image Previewer</DialogTitle>
        </DialogHeader>
        <ImageViewer imageData={billboard.image} />
      </DialogContent>
    </Dialog>
  );
};
