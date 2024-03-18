'use client';

import { cn } from '@/lib/utils';
import { DownloadIcon } from 'lucide-react';
import { Input } from './ui/input';
import { useCallback, useState } from 'react';
import { ALLOWED_MIMETYPES } from '@/shared/constants';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Skeleton } from './ui/skeleton';
import Compressor from 'compressorjs';

export type DropzoneProps = {
  handler: (file: string) => void;
  width: number;
  height: number;
};

export const DropzoneArea = ({ handler, width, height }: DropzoneProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop: useCallback(
      <T extends File>(acceptedFiles: T[]) => {
        const file = acceptedFiles[0];
        if (!file || !ALLOWED_MIMETYPES.includes(String(file.type)))
          return toast.error('Error: file extension type forbidden.');

        new Compressor(file, {
          width,
          height,
          maxHeight: height,
          maxWidth: width,
          strict: true,
          resize: 'cover',
          quality: 0.9,
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
      <Skeleton className='mx-auto h-[280px] max-h-[280px] w-full max-w-xl rounded-lg p-4 py-12' />
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        'base-border grid h-full w-full place-content-center rounded-lg bg-background px-4 py-8',
        { 'border-blue-400/85 divide-dashed': isDragActive }
      )}>
      <div className='flex w-full select-none flex-col items-center gap-3'>
        <DownloadIcon />
        <h3 className='mx-auto w-full max-w-[260px] text-center text-primary'>
          {isDragActive ? 'Drop your image here' : 'Click or drag and drop an image here'}
        </h3>
        <span className='text-center'>[.JPEG, .JPG, .PNG]</span>
        <span className='text-center text-xs font-medium'>
          Dimensions: {width}px x {height}px
        </span>

        <Input {...getInputProps()} />
      </div>
    </div>
  );
};
