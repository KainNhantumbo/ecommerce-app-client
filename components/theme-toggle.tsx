import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Separator } from './ui/separator';

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
        <DropdownMenuItem
          className='cursor-pointer items-start justify-start text-left'
          onClick={() => setTheme('light')}>
          <span>Light</span>
        </DropdownMenuItem>
        <Separator decorative />
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className='cursor-pointer items-start justify-start text-left'>
          <span>Dark</span>
        </DropdownMenuItem>
        <Separator decorative />
        <DropdownMenuItem
          className='cursor-pointer items-start justify-start text-left'
          onClick={() => setTheme('system')}>
          <span className='text-left'>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
