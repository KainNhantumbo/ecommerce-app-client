import Image from 'next/legacy/image';

export type ImageViewerProps = {
  imageData: string;
};

export const ImageViewer = ({ imageData }: ImageViewerProps) => (
  <Image
    src={imageData}
    width={3000}
    height={3000}
    alt='user selected image'
    className=' h-full max-h-[280px] w-full rounded-lg object-cover'
  />
);
