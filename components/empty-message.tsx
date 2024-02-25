import type { LucideIcon } from 'lucide-react';
import type { FC } from 'react';
import { Button } from './ui/button';

export type EmptyMessageProps = {
  message: string;
  icon: LucideIcon;
  action?: { handler: () => void | Promise<any>; label: string };
};

export const EmptyMessage: FC<EmptyMessageProps> = ({
  message,
  icon: Icon,
  action
}) => (
  <div className='flex w-full flex-col items-center gap-4 px-4 py-12 font-sans'>
    <Icon className='h-auto w-12' />
    <p className='text-md mx-auto w-full max-w-[380px] text-center font-medium'>
      {message}
    </p>
    {action ? (
      <Button variant={'default'} onClick={action.handler}>
        {action.label}
      </Button>
    ) : null}
  </div>
);
