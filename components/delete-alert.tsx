import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Trash2Icon, XIcon } from 'lucide-react';
import type { FC } from 'react';

export type DeleteAlertProps = {
  onConfirm: () => void;
  title: string;
  description: string;
};

export const DeleteAlert: FC<DeleteAlertProps> = ({
  onConfirm,
  title,
  description
}) => (
  <AlertDialog>
    <AlertDialogTrigger className='base-border hover:bg-error/15 group grid h-7 w-7 place-content-center rounded-full transition-colors'>
      <Trash2Icon className='w-4 transition-colors group-hover:stroke-red-500 group-active:stroke-red-500' />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className='group flex items-center gap-2 rounded-lg bg-transparent shadow-none'>
          <XIcon className='w-4 transition-colors group-hover:stroke-blue-400 group-active:stroke-blue-400' />
          <span className='capitalize transition-colors group-hover:text-blue-400'>
            Cancel
          </span>
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className='base-border bg-background-default group flex items-center gap-2 rounded-lg shadow-none'>
          <Trash2Icon className='w-4 transition-colors group-hover:stroke-red-500 group-active:stroke-red-500' />
          <span className='font-medium capitalize transition-colors group-hover:text-red-500'>
            Confirm
          </span>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
