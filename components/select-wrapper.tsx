import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import type { FC } from 'react';

export type SelectProps = {
  data: Array<{ id: number | string; label: string; value: string }>;
  onSelect: (value: string) => void;
  placeholder: string;
  className?: string;
};

export const SelectWrapper: FC<SelectProps> = ({
  data,
  className,
  placeholder,
  onSelect
}) => {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className='font-sans-body'>
        <SelectScrollUpButton />
        <SelectGroup>
          {data.map(({ id, label, value }) => (
            <SelectItem value={value} key={id}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  );
};
