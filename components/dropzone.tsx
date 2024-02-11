import { cn } from '@/lib/utils';
import { DownloadIcon } from 'lucide-react';
import { Input } from './ui/input';
import { useCallback, useState } from 'react';
import { ALLOWED_MIMETYPES } from '@/shared/constants';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Skeleton } from './ui/skeleton';
import Compressor from 'compressorjs';

export type DropZoneProps = {
  // eslint-disable-next-line no-unused-vars
  handler: (file: string) => void;
};

export const DropzoneArea = ({ handler }: DropZoneProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop: useCallback(
      <T extends File>(acceptedFiles: T[]) => {
        const file = acceptedFiles[0];
        if (!file || !ALLOWED_MIMETYPES.includes(String(file.type)))
          return toast.error('Error: file type forbidden.');

        new Compressor(file, {
          quality: 0.8,
          maxHeight: 180,
          resize: 'cover',
          success: (compressedImage: File | Blob) => {
            const reader = new FileReader();
            reader.LOADING && setIsLoading(true);
            reader.readAsDataURL(compressedImage);
            reader.onloadend = function (e: ProgressEvent<FileReader>) {
              const encodedImage: string = e.target?.result as string;
              handler(encodedImage);
              setIsLoading(false);
            };
          }
        });
      },
      [handler]
    )
  });

  if (isLoading) {
    return (
      <Skeleton className='mx-auto h-[280px] max-h-[280px] w-full max-w-xl  rounded-lg p-4 py-12' />
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        'base-border mx-auto grid w-full max-w-xl place-content-center rounded-lg bg-background px-4 py-12',
        { 'border-blue-400/85 divide-dashed': isDragActive }
      )}>
      <div className='flex w-full select-none flex-col items-center gap-3'>
        <DownloadIcon />
        <h3 className='max-w-[260px] text-center text-primary'>
          {isDragActive
            ? 'Drop your image here'
            : 'Click to select or drag and drop an image here'}
        </h3>
        <span className='description'>Extensions: [.JPEG, .JPG, .PNG].</span>

        <Input {...getInputProps()} />
      </div>
    </div>
  );
};
