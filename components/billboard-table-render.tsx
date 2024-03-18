'use client';

import { CaretSortIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useState, type FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import type { Billboard } from '@/types';
import { EditIcon } from 'lucide-react';
import Link from 'next/link';
import { DeleteBillboardAlert } from './billboard-delete-alert';
import { TooltipWrapper } from './tooltip-wrapper';

export const createColumns: ColumnDef<Billboard>[] = [
  {
    accessorKey: 'label',
    header: ({ column }: any) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Label
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }: any) => <div className='capitalize'>{row.getValue('label')}</div>
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }: any) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Created
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }: any) => (
      <div className='capitalize'>{formatDate(row.getValue('createdAt'))}</div>
    )
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }: any) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Updated
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }: any) => (
      <div className='capitalize'>{formatDate(row.getValue('updatedAt'))}</div>
    )
  },
  {
    id: 'delete',
    enableHiding: false,
    cell: ({ row }: any) => {
      const billboard = row.original as Billboard;
      return <DeleteBillboardAlert id={billboard._id} />;
    }
  },
  {
    id: 'edit',
    enableHiding: false,
    cell: ({ row }: any) => {
      const billboard = row.original as Billboard;
      return (
        <Button asChild variant={'ghost'}>
          <Link href={`/dashboard/billboards/update/${billboard._id}`}>
            <TooltipWrapper content='Edit billboard'>
              <EditIcon className='h-auto w-4' />
            </TooltipWrapper>
          </Link>
        </Button>
      );
    }
  }
];

export type BillboardTableRenderProps = {
  data: Billboard[];
};

export const BillboardTableRender: FC<BillboardTableRenderProps> = (props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: props.data,
    columns: createColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  return (
    <div className='mx-auto w-full max-w-3xl font-sans-body'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter by label...'
          value={(table.getColumn('label')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('label')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='font-sans-body font-medium text-font'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
                        : flexRender(header.column.columnDef.header, header.getContext())}
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
