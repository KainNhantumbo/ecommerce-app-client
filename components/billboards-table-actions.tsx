import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontalIcon } from 'lucide-react';
import { type FC } from 'react';
import { BillboardEditor } from './billboard-editor';
import { BillboardImagePreviewer } from './billboard-image-previewer';
import { DeleteAlert } from './delete-alert';
import { Button } from './ui/button';

export type BillboardTableActionsProps = {
  onDelete: () => void;
  onUpdate?: () => void;
  id: number;
};

export const BillboardTableActions: FC<BillboardTableActionsProps> = (props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='group grid h-8 w-6 place-content-center rounded-lg bg-transparent p-0 transition-colors'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontalIcon className='w-4 transition-colors group-hover:stroke-blue-400 group-active:stroke-blue-400' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='base-border w-56 font-sans-body'>
        <DropdownMenuGroup className='px-2'>
          <DropdownMenuItem
            className='w-full'
            asChild
            onClick={(e) => e.preventDefault()}>
            <BillboardEditor
              isLoading={false}
              onUpdate={props.onUpdate}
              role='update'
              id={props.id}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator className='bg-font/[.12]' />
          <DropdownMenuItem
            className='w-full'
            asChild
            onClick={(e) => e.preventDefault()}>
            <DeleteAlert
              label='Delete'
              title='Delete Billboard'
              description='This action cannot be undone. This will permanently delete this billboard.'
              onConfirm={props.onDelete}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator className='bg-font/[.12]' />
          <DropdownMenuItem
            className='w-full'
            asChild
            onClick={(e) => e.preventDefault()}>
            <BillboardImagePreviewer />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
