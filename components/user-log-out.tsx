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
import { AppDispatch } from '@/redux/store';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import { HttpError } from '@/types';
import { CheckIcon, LogOutIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { TooltipWrapper } from './tooltip-wrapper';
import { Button } from './ui/button';

export const LogoutAlert: FC = () => {
  const { httpClientAPI } = useAppContext();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    try {
      await httpClientAPI({
        method: 'delete',
        url: `/api/v1/auth/sign-out`
      });
      dispatch(updateAuth({ id: 0, email: '', name: '', token: '' }));
      router.push('/auth/sign-in');
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message || DEFAULT_ERROR_MESSAGE);
      console.warn(message || error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={'ghost'}
          className='fixed right-28 top-[6px] flex w-fit  items-center  border-none hover:cursor-pointer md:right-20 lg:right-[calc(50%_-_430px)]'>
          <LogOutIcon className='h-auto w-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='font-sans-body'>
        <AlertDialogHeader>
          <AlertDialogTitle className='font-sans'>Log out</AlertDialogTitle>
          <AlertDialogDescription>
            Do you really want to exit this session and log out?
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
            onClick={handleLogout}
            className='base-border bg-background-default group flex items-center gap-2 rounded-lg shadow-none'>
            <CheckIcon className='w-4 transition-colors group-hover:stroke-white' />
            <span className='font-medium capitalize transition-colors group-hover:text-white'>
              Yes, log out.
            </span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
