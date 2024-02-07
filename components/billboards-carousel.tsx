import { useQuery } from '@tanstack/react-query';
import httpClient from '@/config/http-client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import type {} from '@/types';
import { Skeleton } from './ui/skeleton';
import { EmptyMessage } from './empty-message';

export const BillboardsCarousel = () => {
  const getBillboards = async () => {
    const { data } = await httpClient<Bilbo>({ method: 'get', url: '/billboards' });
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
              <CarouselItem key={item.id}></CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext>
            <ArrowRightIcon />
          </CarouselNext>
        </Carousel>
      ) : null}

      {isLoading && !isError ? <Skeleton /> : null}
      {isError && !isLoading ? <Skeleton /> : null}
    </section>
  );
};
