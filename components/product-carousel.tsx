'use client';

import { cn } from '@/lib/utils';
import { ImageType } from '@/types';
import Image from 'next/image';
import { FC, useState } from 'react';
import { Button } from './ui/button';
import { Carousel, CarouselContent, CarouselItem, useCarousel } from './ui/carousel';

export type ProductCarouselProps = { images: ImageType[] };

const CarouselNodes: FC<ProductCarouselProps> = ({ images }) => {
  const [selected, setSelected] = useState<number>(0);
  const { api } = useCarousel();

  if (!api) return null;

  const onSelect = (index: number) => {
    api.scrollTo(index);
    setSelected(index);
  };

  return (
    <div className='mt-2 flex w-full items-center gap-1'>
      {images.map((image, index) => (
        <Button
          asChild
          key={index}
          variant={'outline'}
          onClick={() => {
            onSelect(index);
          }}
          className={cn('h-12 w-12 rounded-lg p-[2px]', {
            'base-border border-[2px] border-font': selected === index
          })}>
          <Image
            alt={String(index)}
            width={280}
            height={420}
            src={image.url}
            className='h-12 w-12 rounded-lg object-cover'
          />
        </Button>
      ))}
    </div>
  );
};

export const ProductCarousel: FC<ProductCarouselProps> = ({ images }) => {
  return (
    <Carousel className='base-border h-[340px] max-w-[320px] rounded-lg'>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={image.id}>
            <Image
              src={image.url}
              width={280}
              height={420}
              alt={`Image ${image.id}.`}
              className='h-[340px] w-full max-w-[320px] rounded-lg object-cover'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNodes images={images} />
    </Carousel>
  );
};
