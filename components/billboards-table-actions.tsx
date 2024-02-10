import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Edit2Icon, MoreHorizontalIcon, Trash2Icon } from 'lucide-react';
import { type FC } from 'react';
import { Button } from './ui/button';
import { DeleteAlert } from './delete-alert';
import { BillboardImagePreviewer } from './billboard-image-previewer';
import { BillboardEditor } from './billboard-editor';

export type BillboardTableActionsProps = {
  onDelete: () => Promise<void>;
  onUpdate: () => Promise<void>;
  image: string;
  label: string;
};

export const BillboardTableActions: FC<BillboardTableActionsProps> = (props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='group grid h-8 w-6 place-content-center rounded-lg bg-transparent p-0 transition-colors'>
          <MoreHorizontalIcon className='w-4 transition-colors group-hover:stroke-blue-400 group-active:stroke-blue-400' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='base-border w-56'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator className='bg-font/[.12]' />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Edit2Icon className='mr-2 h-4 w-4' />
            <BillboardEditor
              defaultValues={{ label: props.label, image: props.image }}
              isLoading={false}
              onSubmit={props.onUpdate}
              role='update'
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2Icon className='mr-2 h-4 w-4' />
            <DeleteAlert
              title='Delete Billboard'
              description='This action cannot be undone. This will permanently delete this billboard.'
              onConfirm={props.onDelete}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator className='bg-font/[.12]' />
          <DropdownMenuItem>
            <BillboardImagePreviewer image={props.image} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
