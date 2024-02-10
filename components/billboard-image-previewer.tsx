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

export type BillboardImagePreviewerProps = { image: string };

export const BillboardImagePreviewer: FC<BillboardImagePreviewerProps> = ({
  image
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <ImageIcon className='mr-2 h-4 w-4' />
        <span>Preview</span>
      </DialogTrigger>
      <DialogHeader>
        <DialogTitle>Billboard Image Previewer</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <ImageViewer imageData={image} />
      </DialogContent>
    </Dialog>
  );
};
