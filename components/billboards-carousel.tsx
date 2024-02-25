import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import httpClient from '@/config/http-client';
import type { Billboard } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangleIcon, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import { EmptyMessage } from './empty-message';
import { Skeleton } from './ui/skeleton';

export const BillboardsCarousel = () => {
  const getBillboards = async () => {
    const { data } = await httpClient<Billboard[]>({
      method: 'get',
      url: '/api/v1/billboards'
    });
    return data;
  };

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['billboards'],
    queryFn: getBillboards
  });

  return (
    <section>
      {data ? (
        <Carousel
          opts={{ active: true, loop: true, startIndex: 0 }}
          setApi={(api) => {
            if (api) {
              api.on('init', () => {
                setInterval(() => {
                  api.scrollNext();
                }, 5000);
              });
            }
          }}>
          <CarouselPrevious className='hidden sm:flex'>
            <ArrowLeftIcon />
          </CarouselPrevious>
          <CarouselContent>
            {data.map((item) => (
              <CarouselItem key={item._id}>
                <Image
                  width={1024}
                  height={220}
                  key={item._id}
                  src={item.image.url}
                  alt={item.label}
                  priority
                  className='h-[220px] w-full max-w-5xl rounded-lg object-cover'
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className='hidden sm:flex'>
            <ArrowRightIcon />
          </CarouselNext>
        </Carousel>
      ) : null}

      {isLoading && !isError ? <Skeleton className='h-[220px] w-full' /> : null}

      {isError && !isLoading ? (
        <Skeleton className='h-[220px] w-full'>
          <EmptyMessage
            message='Error loading billboard content. Please try again.'
            icon={AlertTriangleIcon}
            action={{ handler: () => refetch({}), label: 'Retry' }}
          />
        </Skeleton>
      ) : null}
    </section>
  );
};
