'use client';

import CategoryOptions from '@/shared/categories.json';
import ColorOptions from '@/shared/colors.json';
import SizeOptions from '@/shared/sizes.json';
import { ColorWheelIcon, SizeIcon } from '@radix-ui/react-icons';
import {
  ArrowDown10Icon,
  ArrowDownAZIcon,
  ArrowDownNarrowWideIcon,
  ArrowDownUpIcon,
  ArrowDownZaIcon,
  ArrowRight,
  ArrowUp10,
  ArrowUpIcon,
  DropletsIcon,
  FilterIcon,
  SparklesIcon,
  TagsIcon,
  XIcon
} from 'lucide-react';
import { useEffect, useState, type FC, useMemo } from 'react';
import { TooltipWrapper } from './tooltip-wrapper';
import { Button } from './ui/button';
import { Command, CommandInput } from './ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {};

export const QueryProductsBar: FC<Props> = () => {
  const [queryParams, setQueryParams] = useState({
    search: '',
    color: '',
    category: '',
    limit: '',
    offset: '',
    featured: '',
    size: '',
    sort: ''
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const onClearQueryParams = () =>
    setQueryParams({
      search: '',
      color: '',
      category: '',
      limit: '',
      offset: '',
      featured: '',
      size: '',
      sort: ''
    });

  const hasActiveFilter = useMemo(
    () => Object.values(queryParams).some((param) => String(param) !== ''),
    [queryParams]
  );

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      router.replace(
        `/products?${new URLSearchParams({
          ...queryParams
        })}`
      );
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchParams, queryParams]);

  return (
    <section className='flex w-full items-center gap-3 font-sans'>
      <Command className='w-full max-w-sm rounded-lg border-none bg-secondary p-0 shadow-none'>
        <CommandInput
          className='border-none p-0'
          placeholder='Search...'
          role='searchbox'
          onValueChange={(value) => {
            setQueryParams((values) => ({ ...values, search: value }));
          }}
        />
      </Command>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'secondary'} className='flex items-center gap-2'>
            <span className='hidden transition-colors group-hover:text-primary sm:block'>
              Filters
            </span>
            <FilterIcon className='h-5 w-5 stroke-font/70 transition-colors group-hover:stroke-primary' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='font-sans'>
          <DropdownMenuLabel>Filters</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <ColorWheelIcon className='mr-2 h-4 w-4' />
                  <span>Color</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className='max-h-48 overflow-y-auto font-sans text-xs'>
                    {ColorOptions.map(({ label, value, id }, i) => (
                      <DropdownMenuItem
                        key={id}
                        onClick={() =>
                          setQueryParams((values) => ({ ...values, color: value }))
                        }>
                        <DropletsIcon className='mr-2 h-4 w-4' />
                        <span className='font-semibold'>{label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <TagsIcon className='mr-2 h-4 w-4' />
                  <span>Category</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className='max-h-48 overflow-y-auto font-sans text-xs'>
                    {CategoryOptions.map(({ label, value, id }, i) => (
                      <DropdownMenuItem
                        key={id}
                        onClick={() =>
                          setQueryParams((values) => ({ ...values, category: value }))
                        }>
                        <ArrowRight className='mr-2 h-4 w-4' />
                        <span className='font-semibold'>{label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <SizeIcon className='mr-2 h-4 w-4' />
                  <span>Size</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className='max-h-48 overflow-y-auto font-sans text-xs'>
                    {SizeOptions.map(({ label, value, id }, i) => (
                      <DropdownMenuItem
                        key={id}
                        onClick={() =>
                          setQueryParams((values) => ({ ...values, size: value }))
                        }>
                        <ArrowRight className='mr-2 h-4 w-4' />
                        <span className='font-semibold'>{label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <SparklesIcon className='mr-2 h-4 w-4' />
                  <span>Featured</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className='max-h-48 overflow-y-auto font-sans text-xs'>
                    <DropdownMenuItem
                      onClick={() =>
                        setQueryParams((values) => ({ ...values, featured: '0' }))
                      }>
                      <ArrowRight className='mr-2 h-4 w-4' />
                      <span className='font-semibold'>All Products</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setQueryParams((values) => ({ ...values, featured: '1' }))
                      }>
                      <ArrowRight className='mr-2 h-4 w-4' />
                      <span className='font-semibold'>Featured products only</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'secondary'} className='group flex items-center gap-2'>
            <span className='hidden transition-colors group-hover:text-primary sm:block'>
              Sort
            </span>
            <ArrowDownNarrowWideIcon className='h-5 w-5 stroke-font/70 transition-colors group-hover:stroke-primary' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='font-sans'>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Sort</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <ArrowDownUpIcon className='mr-2 h-4 w-4' />
                  <span>Name</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className='font-sans normal-case'>
                    <DropdownMenuItem
                      onClick={() =>
                        setQueryParams((values) => ({ ...values, sort: 'name,ASC' }))
                      }>
                      <ArrowDownAZIcon className='mr-2 h-4 w-4' />
                      <span className='font-semibold'>A-Z</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setQueryParams((values) => ({ ...values, sort: 'name,DESC' }))
                      }>
                      <ArrowDownZaIcon className='mr-2 h-4 w-4' />
                      <span className='font-semibold'>Z-A</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <ArrowDownUpIcon className='mr-2 h-4 w-4' />
                  <span>Price</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className='font-sans'>
                    <DropdownMenuItem
                      onClick={() =>
                        setQueryParams((values) => ({ ...values, sort: 'price,ASC' }))
                      }>
                      <ArrowUp10 className='mr-2 h-4 w-4' />
                      <span className='font-semibold'>To Highest</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setQueryParams((values) => ({ ...values, sort: 'price,DESC' }))
                      }>
                      <ArrowDown10Icon className='mr-2 h-4 w-4' />
                      <span className='font-semibold'>To Lowest</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <ArrowDownUpIcon className='mr-2 h-4 w-4' />
                  <span>Featured</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className='font-sans'>
                    <DropdownMenuItem
                      onClick={() =>
                        setQueryParams((values) => ({
                          ...values,
                          sort: 'featured,DESC'
                        }))
                      }>
                      <ArrowUpIcon className='mr-2 h-4 w-4' />
                      <span className='font-semibold'>Featured first</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setQueryParams((values) => ({
                          ...values,
                          sort: 'featured,ASC'
                        }))
                      }>
                      <ArrowDown10Icon className='mr-2 h-4 w-4' />
                      <span className='font-semibold'>Featured last</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <ArrowDownUpIcon className='mr-2 h-4 w-4' />
                  <span>Publish Date</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className='font-sans'>
                    <DropdownMenuItem
                      onClick={() =>
                        setQueryParams((values) => ({
                          ...values,
                          sort: 'updatedAt,DESC'
                        }))
                      }>
                      <ArrowUpIcon className='mr-2 h-4 w-4' />
                      <span className='font-semibold'> Recent First</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setQueryParams((values) => ({
                          ...values,
                          sort: 'updatedAt,ASC'
                        }))
                      }>
                      <ArrowDown10Icon className='mr-2 h-4 w-4' />
                      <span className='font-semibold'> Older First</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {hasActiveFilter ? (
        <TooltipWrapper content='Clear search and all filters '>
          <Button
            variant={'secondary'}
            className='group flex items-center gap-2'
            onClick={onClearQueryParams}>
            <span className='hidden group-hover:text-destructive sm:block'>
              Clear Filters
            </span>
            <XIcon className='h-5 w-5 stroke-font/70 group-hover:stroke-destructive' />
          </Button>
        </TooltipWrapper>
      ) : null}
    </section>
  );
};
