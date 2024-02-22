'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import httpClient from '@/config/http-client';
import { useCartManager } from '@/hooks/cart-manager-hook';
import { errorTransformer } from '@/lib/http-error-transformer';
import { currencyFormatter } from '@/lib/utils';
import { OrderSchemaType, orderSchema } from '@/providers/schemas';
import type { CreateOrder, HttpError } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  HomeIcon,
  InfoIcon,
  MinusIcon,
  PartyPopperIcon,
  Phone,
  PlusIcon,
  TextIcon,
  Trash2Icon
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function Page() {
  const { removeCartItem, updateQuantity, increaseQuantity, cart, decreaseQuantity } =
    useCartManager();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<OrderSchemaType>({
    resolver: zodResolver(orderSchema),
    defaultValues: { customerName: '', phone: '', address: '' }
  });

  const onSubmit = async (orderData: OrderSchemaType) => {
    try {
      setLoading(true);
      await httpClient<CreateOrder>({
        method: 'post',
        url: '/api/v1/orders',
        data: {
          ...orderData,
          items: cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            sizes: item.sizes,
            colors: item.colors
          }))
        }
      });
      router.push('/checkout/success');
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message, {
        action: {
          label: 'Retry',
          onClick: () => onSubmit(orderData)
        }
      });
      console.warn(message || error);
    } finally {
      setLoading(false);
    }
  };

  const subTotal: number = useMemo(
    () => cart.map((item) => item.price).reduce((acc, current) => acc + current, 0),
    [cart]
  );

  return (
    <main className='mt-[90px] flex w-full flex-col gap-12 px-4 font-sans-body'>
      <section className='mx-auto flex w-full max-w-5xl flex-col items-center gap-4 sm:flex-row sm:items-start md:flex-row md:gap-8'>
        <section className='flex w-full flex-col gap-3'>
          <div className='font-sans text-2xl font-bold leading-relaxed'>
            Your cart ({cart.length} items)
          </div>
          {cart.length > 0 ? (
            cart.map((product) => (
              <div
                key={product.productId}
                className='base-border flex w-full flex-col gap-8 rounded-lg p-4 sm:flex-row'>
                <Image
                  src={product.image}
                  alt={`${product.name} image`}
                  width={280}
                  height={420}
                  className='base-border h-[160px] w-[160px] rounded-lg object-cover'
                />
                <div className='flex w-full flex-col gap-3 font-sans'>
                  <div className='flex w-full items-center justify-between gap-3'>
                    <h2 className='text-lg'>{product.name}</h2>
                    <p className='text-xl font-bold'>
                      {currencyFormatter(product.price)}
                    </p>
                  </div>
                  <div className='space-y-2 text-sm'>
                    <p>
                      <i>Colors</i>:{' '}
                      {product.colors.map((color, i) => (
                        <p key={i} className='base-border rounded-full p-1 px-2'>
                          {color}
                        </p>
                      ))}
                    </p>
                    <p>
                      <i>Sizes</i>:{' '}
                      {product.sizes.map((size, i) => (
                        <p key={i} className='base-border rounded-full p-1 px-2'>
                          {size}
                        </p>
                      ))}
                    </p>
                  </div>

                  <div className='flex w-full items-center justify-between gap-3'>
                    <div className='flex items-center gap-2'>
                      <Button
                        size={'icon'}
                        variant={'outline'}
                        className='rounded-full'
                        onClick={() => decreaseQuantity(product)}>
                        <MinusIcon />
                        <span className='sr-only'>Decrease quantity</span>
                      </Button>
                      <Input
                        type='number'
                        title='Product Quantity'
                        min={1}
                        className='w-full max-w-[67px]'
                        value={String(product.quantity)}
                        onChange={(e) =>
                          updateQuantity(product.productId, +e.target.value)
                        }
                      />
                      <Button
                        size={'icon'}
                        variant={'outline'}
                        className='rounded-full'
                        onClick={() => increaseQuantity(product)}>
                        <PlusIcon />
                        <span className='sr-only'>Increase quantity</span>
                      </Button>
                    </div>

                    <Button
                      size={'icon'}
                      variant={'outline'}
                      className='group rounded-full'
                      onClick={() => removeCartItem(product.productId)}>
                      <Trash2Icon className='group-hover:stroke-destructive' />
                      <span className='sr-only'>Remove product from cart</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='base-border m-auto flex w-full items-center gap-3 rounded-lg p-5'>
              <InfoIcon className='pointer-events-none h-5 w-5 transition-colors group-hover:stroke-primary' />
              <h3 className='font-sans-body'>Nothing in cart to be displayed</h3>
            </div>
          )}
        </section>
        <section className='flex w-full flex-col gap-3 sm:max-w-[320px]'>
          <div className='font-sans text-2xl font-bold leading-relaxed'>Summary</div>
          <div className='base-border flex w-full flex-col gap-8 rounded-lg p-4'>
            <div className='flex flex-col gap-4'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='max my-auto h-full w-full space-y-5'>
                  <FormField
                    control={form.control}
                    name='customerName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center gap-2'>
                          <TextIcon className='h-5 w-auto' />
                          <span>Name *</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder='Your full name'
                            type='text'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center gap-2'>
                          <Phone className='h-5 w-auto' />
                          <span>Phone *</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder='Your phone number'
                            type='number'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center gap-2'>
                          <HomeIcon className='h-5 w-auto' />
                          <span>Address *</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder='Your address'
                            type='text'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator decorative />
                  <div className='flex w-full items-center justify-between gap-4'>
                    <p className='font-semibold'>Subtotal</p>
                    <p className='font-bold'>{currencyFormatter(subTotal)}</p>
                  </div>
                  <div className='flex w-full items-center justify-between gap-4'>
                    <p className='font-semibold'>Delivery & Handling</p>
                    <p className='font-bold'>Free</p>
                  </div>
                  <div className='flex w-full items-center justify-between gap-4'>
                    <p className='font-semibold'>Estimated Taxes</p>
                    <p className='font-bold'>{currencyFormatter(0)}</p>
                  </div>
                  <Separator decorative />
                  <div className='flex flex-col gap-4'>
                    <div className='flex w-full items-center justify-between gap-4'>
                      <p className='font-semibold'>Total</p>
                      <p className='font-bold'>{currencyFormatter(subTotal)}</p>
                    </div>
                  </div>

                  <Button
                    disabled={loading}
                    variant={'default'}
                    size={'lg'}
                    className='flex w-full items-center gap-2'
                    type='submit'>
                    <PartyPopperIcon className='stroke-white' />
                    <span className='font-semibold text-white'>Checkout Now</span>
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
