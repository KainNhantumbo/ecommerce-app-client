'use client';

import { X } from 'lucide-react';
import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  useMemo
} from 'react';

import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';

type Data = { id: string; label: string; value: string };
type Props = {
  data: Data[];
  defaultValues: Data[];
  placeholder: string;
  onChange: (data: Data[]) => void;
};

export const MultiSelector: FC<Props> = ({
  defaultValues,
  data,
  placeholder,
  onChange
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Data[]>(defaultValues);
  const [inputValue, setInputValue] = useState<string>('');

  const handleUnselect = useCallback(
    (data: Data) => {
      setSelected((prev) => {
        const selected = prev.filter((s) => s.value !== data.value);
        return selected;
      });
    },
    [defaultValues]
  );

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '') {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      }
      // This is not a default behavior of the <input /> field
      if (e.key === 'Escape') {
        input.blur();
      }
    }
  }, []);

  const selectable = useMemo(
    () =>
      data.filter(
        (data) => !selected.some((selected) => data.value === selected.value)
      ),
    [defaultValues, data]
  );

  useEffect(() => {
    // onChange(selected);
  }, [selected, defaultValues]);

  return (
    <Command onKeyDown={handleKeyDown} className='overflow-visible bg-transparent'>
      <div className='group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
        <div className='flex flex-wrap gap-1'>
          {selected.map((data) => {
            return (
              <Badge key={data.id} variant='secondary'>
                {data.label}
                <button
                  className='ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(data);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(data)}>
                  <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className='ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground'
          />
        </div>
      </div>
      <div className='relative mt-2'>
        {open && selectable.length > 0 ? (
          <div className='absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in'>
            <CommandGroup className='h-full max-h-[200px] overflow-auto'>
              {selectable.map((data) => {
                return (
                  <CommandItem
                    key={data.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue('');
                      setSelected((prev) => [...prev, data]);
                    }}
                    className={'cursor-pointer'}>
                    {data.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
};
