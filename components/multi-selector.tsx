'use client';

import { X } from 'lucide-react';
import { type FC, KeyboardEvent, useCallback, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';

type Data = Record<'value' | 'name' | 'id', string>;
type Props = { data: Data[]; placeholder: string; onChange: (data: Data[]) => void };

export const MultiSelector: FC<Props> = ({ data, placeholder, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Data[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleUnselect = useCallback((data: Data) => {
    setSelected((prev) => {
      const selected = prev.filter((s) => s.value !== data.value);
      onChange(selected);
      return selected;
    });
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '') {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            onChange(newSelected);
            return newSelected;
          });
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === 'Escape') {
        input.blur();
      }
    }
  }, []);

  const selectables = data.filter(
    (data) => !selected.some((slect_data) => data.value === slect_data.value)
  );

  return (
    <Command onKeyDown={handleKeyDown} className='overflow-visible bg-transparent'>
      <div className='group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
        <div className='flex flex-wrap gap-1'>
          {selected.map((data) => {
            return (
              <Badge key={data.id} variant='secondary'>
                {data.name}
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
        {open && selectables.length > 0 ? (
          <div className='absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in'>
            <CommandGroup className='h-full max-h-[200px] overflow-auto'>
              {selectables.map((data) => {
                return (
                  <CommandItem
                    key={data.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      setInputValue('');
                      setSelected((prev) => {
                        onChange([...prev, data]);
                        return [...prev, data];
                      });
                    }}
                    className={'cursor-pointer'}>
                    {data.name}
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