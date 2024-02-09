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
      url: '/billboards'
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
        <Carousel>
          <CarouselPrevious>
            <ArrowLeftIcon />
          </CarouselPrevious>
          <CarouselContent>
            {data.map((item) => (
              <CarouselItem key={item.id}>
                <Image key={item.id} src={item.image.url} alt={item.label} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext>
            <ArrowRightIcon />
          </CarouselNext>
        </Carousel>
      ) : null}

      {isLoading && !isError ? <Skeleton className='h-48 w-full' /> : null}

      {isError && !isLoading ? (
        <Skeleton>
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
