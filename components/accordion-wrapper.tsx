import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import type { FC } from 'react';

export type AccordionProps = {
  data: Array<{
    title: string;
    content: string;
  }>;
};

export const AccordionWrapper: FC<AccordionProps> = ({ data }) => (
  <Accordion type='single' collapsible className='w-full'>
    {data.map(({ title, content }, i) => (
      <AccordionItem key={i} value={title}>
        <AccordionTrigger className='font-sans text-lg underline-offset-2'>
          {title}
        </AccordionTrigger>
        <AccordionContent className='font-sans-body text-base'>{content}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);
