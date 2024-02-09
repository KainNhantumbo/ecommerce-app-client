import type { Option } from '@/types';
import type { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';

export type SelectProps = {
  // eslint-disable-next-line no-unused-vars
  handler: (value: string) => void;
  items: Array<Option>;
  placeholder: string;
};

export const SelectWrapper: FC<SelectProps> = ({ items, handler, placeholder }) => {
  return (
    <Select onValueChange={handler}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map(({ value, label }, i) => (
            <SelectItem key={i} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
