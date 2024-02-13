import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
} from '@/components/ui/select';
import type { FC } from 'react';

export type SelectProps = {
  data: Array<{ id: string; name: string; value: string }>;
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
        <SelectScrollUpButton/>
        <SelectGroup>
          {data.map(({ id, name, value }) => (
            <SelectItem value={value} key={id}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectScrollDownButton/>
      </SelectContent>
    </Select>
  );
};
