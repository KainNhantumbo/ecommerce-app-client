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
import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import { updateAuth } from '@/redux/slices/auth';
import { updateUsers } from '@/redux/slices/users';
import { AppDispatch, RootState } from '@/redux/store';
import { HttpError } from '@/types';
import { Trash2Icon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { TooltipWrapper } from './tooltip-wrapper';
import { Button } from './ui/button';

type Props = { id: number };

export const DeleteUserAlert: FC<Props> = ({ id }) => {
  const { httpClientAPI } = useAppContext();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const users = useSelector((state: RootState) => state.users);
  const auth = useSelector((state: RootState) => state.auth);

  const onDelete = async () => {
    try {
      await httpClientAPI({
        method: 'delete',
        url: `/api/v1/users/${id}`
      });
      dispatch(updateUsers(users.filter((item) => +item.id !== id)));

      toast.success('User account deleted.');
      if (auth.id === id) {
        dispatch(updateAuth({ id: 0, email: '', name: '', token: '' }));
        router.push('/auth/sign-in');
      }
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.warn(message || error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'ghost'}>
          <TooltipWrapper content='Delete product'>
            <Trash2Icon className='h-auto w-4' />
          </TooltipWrapper>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='font-sans-body'>
        <AlertDialogHeader>
          <AlertDialogTitle className='font-sans'>Delete User Account</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this user
            account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='group flex items-center gap-2 rounded-lg border-none bg-transparent shadow-none'>
            <XIcon className='w-4 transition-colors group-hover:stroke-blue-400 group-active:stroke-blue-400' />
            <span className='capitalize transition-colors group-hover:text-blue-400'>
              Cancel
            </span>
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
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
};
