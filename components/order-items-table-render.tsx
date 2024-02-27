'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { currencyFormatter } from '@/lib/utils';
import ColorOptions from '@/shared/colors.json';
import type { OrderItem } from '@/types';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useState, type FC } from 'react';

export const createColumns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: 'productId',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Product ID
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }: { row: Row<OrderItem> }) => (
      <div className='capitalize'>{row.getValue('productId')}</div>
    )
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }: { row: Row<OrderItem> }) => (
      <div className='capitalize'>{row.getValue('name')}</div>
    )
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Price
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }: { row: Row<OrderItem> }) => (
      <div className='capitalize'>{currencyFormatter(row.getValue('price'))}</div>
    )
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Qty.
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }: { row: Row<OrderItem> }) => (
      <div className='capitalize'>{String(row.getValue('quantity'))}</div>
    )
  },
  {
    accessorKey: 'sizes',
    header: () => <h3>Sizes</h3>,
    cell: ({ row }: { row: Row<OrderItem> }) => {
      const sizes = row.original.sizes;

      return (
        <div className='flex flex-wrap items-center gap-2 capitalize'>
          {sizes.map((size, i) => (
            <span
              key={i}
              className='base-border rounded-full bg-secondary p-1 px-2 font-sans text-xs font-semibold uppercase text-font'>
              {size}
            </span>
          ))}
        </div>
      );
    }
  },
  {
    accessorKey: 'colors',
    header: () => <h3>Colors</h3>,
    cell: ({ row }: { row: Row<OrderItem> }) => {
      const colors = row.original.colors;
      return (
        <div className='flex flex-wrap items-center gap-2 capitalize'>
          <div className='flex w-full flex-wrap items-center gap-2'>
            {colors
              .map((item) => ColorOptions.find((color) => item === color.value))
              .map((color, i) =>
                color ? (
                  <div
                    key={i}
                    className='base-border flex w-fit flex-nowrap items-center gap-1 rounded-lg p-2 py-1 font-semibold uppercase'>
                    <div
                      className='base-border h-3 w-3 rounded-full'
                      style={{ background: color.value || '' }}
                    />
                    <span className='text-xs font-semibold'>{color.label}</span>
                  </div>
                ) : null
              )}
          </div>
        </div>
      );
    }
  }
];

export type OrderItemsTableRenderProps = {
  data: OrderItem[];
};

export const OrderItemsTableRender: FC<OrderItemsTableRenderProps> = (props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: props.data,
    columns: createColumns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection
    }
  });

  return (
    <div className='mx-auto w-full font-sans-body'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className='h-24 text-center'>
                  No data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          Count: {table.getFilteredRowModel().rows.length} row(s).
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
