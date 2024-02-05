'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='group p-0'>
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all group-hover:stroke-primary dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all group-hover:stroke-primary dark:rotate-0 dark:scale-100' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='base-border flex flex-col justify-start gap-2 font-sans font-semibold normal-case'>
        <DropdownMenuItem asChild>
          <Button
            variant={'ghost'}
            className='border-none text-left hover:border-none'
            onClick={() => setTheme('light')}>
            Light
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant={'ghost'}
            className='border-none text-left hover:border-none'
            onClick={() => setTheme('dark')}>
            Dark
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant={'ghost'}
            className='border-none text-left hover:border-none'
            onClick={() => setTheme('system')}>
            System
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
