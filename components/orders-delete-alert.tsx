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
import { updateOrders } from '@/redux/slices/orders';
import { AppDispatch, RootState } from '@/redux/store';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import { HttpError } from '@/types';
import { Trash2Icon, XIcon } from 'lucide-react';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { TooltipWrapper } from './tooltip-wrapper';
import { Button } from './ui/button';

type Props = { id: string };

export const DeleteOrderAlert: FC<Props> = ({ id }) => {
  const { httpClientAPI } = useAppContext();
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders);

  const onDelete = async () => {
    try {
      await httpClientAPI({ method: 'delete', url: `/api/v1/orders/${id}` });
      dispatch(updateOrders(orders.filter((item) => item._id !== id)));
      toast.success('Order deleted successfully.');
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message || DEFAULT_ERROR_MESSAGE, {
        action: { onClick: () => onDelete(), label: 'Retry' }
      });
      console.error(message || error);
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
          <AlertDialogTitle className='font-sans'>Delete Order</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove this order from
            history.
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
