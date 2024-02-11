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
  title: string;
  label: string;
  description: string;
  onConfirm: Function;
};

export const DeleteAlert: FC<DeleteAlertProps> = ({
  onConfirm,
  title,
  label,
  description
}) => (
  <AlertDialog>
    <AlertDialogTrigger className='flex items-center w-full'>
      <Trash2Icon className='mr-2 h-auto w-4' />
      <span>{label}</span>
    </AlertDialogTrigger>
    <AlertDialogContent className='font-sans-body'>
      <AlertDialogHeader>
        <AlertDialogTitle className='font-sans'>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className='borber-none group flex items-center gap-2 rounded-lg bg-transparent shadow-none'>
          <XIcon className='w-4 transition-colors group-hover:stroke-blue-400 group-active:stroke-blue-400' />
          <span className='capitalize transition-colors group-hover:text-blue-400'>
            Cancel
          </span>
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm as any}
          className='base-border bg-background-default group flex items-center gap-2 rounded-lg shadow-none'>
          <Trash2Icon className='w-4 transition-colors group-hover:stroke-white group-active:stroke-red-500' />
          <span className='font-medium capitalize transition-colors group-hover:text-white'>
            Confirm
          </span>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
