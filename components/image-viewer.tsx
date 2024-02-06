import Image from "next/image";

export type ImageViewerProps = {
  imageData: string;
};

export const ImageViewer = ({ imageData }: ImageViewerProps) => (
  <Image
    src={imageData}
    alt='user selected image'
    className='base-border h-full max-h-[280px] w-full rounded-md object-cover shadow-2xl'
  />
);
