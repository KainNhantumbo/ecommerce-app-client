'use client';

import { Button } from '@/components/ui/button';
import { currencyFormatter } from '@/lib/utils';
import { updateCart } from '@/redux/slices/cart';
import { AppDispatch, RootState } from '@/redux/store';
import { CartItem } from '@/types';
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);

  const subTotal: number = useMemo(
    () =>
      cart.map((item) => item.price).reduce((acc, current) => acc + current, 0),
    [cart]
  );

  const removeCartItem = (productId: number) => {
    dispatch(
      updateCart([...cart.filter((item) => item.productId !== productId)])
    );
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
                quantity:
                  product.quantity > 1 ? product.quantity - 1 : product.quantity
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
    <main className='w-full px-4 mt-[90px] font-sans flex flex-col gap-12'>
      <section className='w-full max-w-[890px] mx-auto sm:flex-row gap-8 flex flex-col items-center sm:items-start md:flex-row'>
        <section className='w-full flex flex-col gap-3'>
          <div className='font-sans-display font-bold text-2xl leading-relaxed'>
            Your cart ({cart.length} items)
          </div>
          {cart.map((product) => (
            <div
              key={product.productId}
              className='w-full flex flex-col gap-8 bg-foreground p-4 rounded-2xl base-border'>
              <Image
                src={product.image.url}
                alt={`${product.name} image`}
                width={600}
                height={600}
                className='object-cover rounded-2xl base-border'
              />
              <div className='flex flex-col gap-3'>
                <h2>{product.name}</h2>
                <p>{product.category}</p>
                <p>{currencyFormatter(product.price)}</p>

                <div className=''>
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
          ))}
        </section>
        <section className='w-full max-w-[320px] flex flex-col gap-3'>
          <div className='font-sans-display font-bold text-2xl leading-relaxed'>
            Summary
          </div>
          <div className='w-full flex flex-col gap-8 bg-foreground p-4 rounded-2xl base-border'>
            <form
              onSubmit={(e) => e.preventDefault()}
              className='flex gap-3 items-center base-border rounded-full p-1 w-full max-w-xl mx-auto'>
              <input
                placeholder='Promo code'
                className='outline-none bg-foreground border-none p-1 px-4 rounded-full w-full '
              />
              <Button
                type='submit'
                size={'sm'}
                variant={'secondary'}
                className='text-white dark:bg-primary dark:hover:bg-secondary rounded-full font-bold'>
                Apply
              </Button>
            </form>

            <div className='flex flex-col gap-4'>
              <div className='flex items-center w-full gap-4 justify-between'>
                <p className='font-semibold'>Subtotal</p>
                <p className='font-bold'>{currencyFormatter(subTotal)}</p>
              </div>
              <div className='flex items-center w-full gap-4 justify-between'>
                <p className='font-semibold'>Delivery & Handling</p>
                <p className='font-bold'>Free</p>
              </div>
              <div className='flex items-center w-full gap-4 justify-between'>
                <p className='font-semibold'>Estimated Taxes</p>
                <p className='font-bold'>{currencyFormatter(0)}</p>
              </div>
            </div>

            <div className='flex flex-col gap-4 pt-4 border-t-[1px] border-font/10 border-solid'>
              <div className='flex items-center w-full gap-4 justify-between'>
                <p className='font-semibold'>Total</p>
                <p className='font-bold'>{currencyFormatter(subTotal)}</p>
              </div>
            </div>

            <Button
              variant={'default'}
              size={'sm'}
              className='font-bold dark:bg-primary dark:hover:bg-secondary rounded-3xl'>
              Checkout now
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}
