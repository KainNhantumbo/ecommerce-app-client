'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { currencyFormatter } from '@/lib/utils';
import { updateCart } from '@/redux/slices/cart';
import type { AppDispatch, RootState } from '@/redux/store';
import type { CartItem } from '@/types';
import { InfoIcon, MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);

  const subTotal: number = useMemo(
    () => cart.map((item) => item.price).reduce((acc, current) => acc + current, 0),
    [cart]
  );

  const removeCartItem = (productId: number) => {
    dispatch(updateCart([...cart.filter((item) => item.productId !== productId)]));
  };

  const increaseQuantity = (product: CartItem) => {
    dispatch(
      updateCart([
        ...cart.map((item) =>
          item.productId === product.productId
            ? { ...product, quantity: product.quantity + 1 }
            : item
        )
      ])
    );
  };

  const decreaseQuantity = (product: CartItem) => {
    dispatch(
      updateCart([
        ...cart.map((item) =>
          item.productId === product.productId
            ? {
                ...product,
                quantity: product.quantity > 1 ? product.quantity - 1 : product.quantity
              }
            : item
        )
      ])
    );
  };

  const updateQuantity = (productId: number, qty: number) => {
    dispatch(
      updateCart([
        ...cart.map((item) =>
          item.productId === productId ? { ...item, quantity: qty } : item
        )
      ])
    );
  };

  return (
    <main className='mt-[90px] flex w-full flex-col gap-12 px-4 font-sans'>
      <section className='mx-auto flex w-full max-w-[890px] flex-col items-center gap-4 sm:flex-row sm:items-start md:flex-row md:gap-8'>
        <section className='flex w-full flex-col gap-3'>
          <div className='font-sans text-2xl font-bold leading-relaxed'>
            Your cart ({cart.length} items)
          </div>
          {cart.length > 0 ? (
            cart.map((product) => (
              <div
                key={product.productId}
                className='base-border flex w-full flex-col gap-8 rounded-lg p-4'>
                <Image
                  src={product.image.url}
                  alt={`${product.name} image`}
                  width={600}
                  height={600}
                  className='base-border rounded-lg object-cover'
                />
                <div className='flex flex-col gap-3'>
                  <h2>{product.name}</h2>
                  <p>{product.category}</p>
                  <p>{currencyFormatter(product.price)}</p>

                  <div className='flex w-full items-center justify-between'>
                    <div className=''>
                      <Button onClick={() => decreaseQuantity(product)}>
                        <MinusIcon />
                      </Button>
                      <input
                        type='number'
                        title='Quantity'
                        min={1}
                        value={product.quantity}
                        onChange={(e) =>
                          updateQuantity(product.productId, +e.target.value)
                        }
                      />
                      <Button
                        value={'ghost'}
                        size={'sm'}
                        onClick={() => increaseQuantity(product)}>
                        <PlusIcon />
                      </Button>
                    </div>

                    <Button
                      className=''
                      onClick={() => removeCartItem(product.productId)}>
                      <Trash2Icon />
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
            <form
              onSubmit={(e) => e.preventDefault()}
              className='base-border mx-auto flex w-full max-w-xl items-center gap-3 rounded-lg p-1'>
              <Input placeholder='Promo code' className='border-none shadow-none' />
              <Button
                type='submit'
                size={'sm'}
                variant={'default'}
                className='font-bold'>
                Apply
              </Button>
            </form>

            <div className='flex flex-col gap-4'>
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
            </div>

            <div className='flex flex-col gap-4 border-t-[1px] border-solid border-font/10 pt-4'>
              <div className='flex w-full items-center justify-between gap-4'>
                <p className='font-semibold'>Total</p>
                <p className='font-bold'>{currencyFormatter(subTotal)}</p>
              </div>
            </div>

            <Button variant={'default'} size={'sm'} className='font-bold'>
              Checkout now
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}
