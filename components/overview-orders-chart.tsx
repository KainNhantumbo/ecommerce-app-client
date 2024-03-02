import { getGraphRevenue } from '@/actions/get-revenue';
import type { OrderItem } from '@/types';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Heading } from './ui/heading';

type Props = { data: Array<{ _id: string; isPaid: boolean; items: OrderItem[] }> };

export const OrdersChart: FC<Props> = ({ data }) => {
  const graphData = getGraphRevenue(data as any);
  const { theme = 'system' } = useTheme();

  return (
    <div className='base-border space-y-6 rounded-lg p-3 px-4'>
      <Heading title='Revenue' description='Your store revenue from the current year' />
      <ResponsiveContainer width='100%' height={350}>
        <BarChart data={graphData}>
          <XAxis
            dataKey='name'
            stroke='#888888'
            fontSize={12}
            tickLine={true}
            axisLine={true}
          />
          <YAxis
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar
            dataKey='total'
            fill={theme === 'light' ? '#AB7D41' : '#DD851B'}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
