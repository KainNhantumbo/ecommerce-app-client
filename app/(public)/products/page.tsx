'use client';

import httpClient from '@/config/http-client';
import { currencyFormatter } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { Product } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from '@/providers/framer';


type PublicProduct = Omit<Product, ''>;

export default function Page() {
  const dispacth = useDispatch();
  const products = useSelector((state: RootState) => state.products);
  const cart = useSelector((state: RootState) => state.cart);
  const params = useSearchParams();
  const PRODUCTS_LIMIT_PER_PAGE = 10;


  const getProducts = async ({ pageParam = 0 }) => {
    const currentParams = params.values;
    const query = new URLSearchParams({});

    const { data } = await httpClient<Product[]>({
      method: 'get',
      url: `/api/v1/products/public?${query.toString()}`
    });

    return { data, currentOffset: pageParam + 1 };
  };

  const { data, refetch, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ['public-products'],
      queryFn: getProducts,
      getNextPageParam: ({ data, currentOffset }) =>
        data.length >= PRODUCTS_LIMIT_PER_PAGE ? currentOffset : undefined
    });

  return (
    <main>
      <section></section>
      <section>
        {/* <div>
          <section className='products-container'>
            {products.length > 0
              ? products.map((item, index) => (
                  <motion.div
                    key={item.id}
                    whileTap={{ scale: 0.98 }}
                    className=''
                    whileHover={{
                      translateY: -8,
                      boxShadow: `0px 12px 25px 10px rgba(${}, 0.09)`
                    }}
                    ref={
                      products.length === index + 1
                        ? ref
                        : undefined
                    }>
                    <div className='product-image'>
                      {item.promotion.status && (
                        <span className='promotion'>
                          Promoção {item.promotion.percentage}%{' '}
                        </span>
                      )}
                      <button
                        title='Adicionar a lista de favoritos'
                        aria-label='Adicionar a lista de favoritos'
                        className='favorite-button'
                        onClick={() => {
                          if (!state.auth.token) return requestLogin();
                          else if (item.favorites.includes(state.auth?.id))
                            return handleUnFavoriteProduct(item._id);
                          return handleFavoriteProduct(item._id);
                        }}>
                        {item.favorites.includes(state.auth.id) ? (
                          <IoHeart />
                        ) : (
                          <IoHeartOutline />
                        )}
                      </button>
                      <button
                        title='Adicionar ao carrinho'
                        aria-label='Adicionar ao carrinho'
                        className='cart-button'
                        onClick={() => {
                          state.cart.some(
                            (product) => product.productId === item._id
                          )
                            ? removeProductFromCart(item._id)
                            : addProductToCart({
                                productId: item._id,
                                productName: item.name,
                                price: item.promotion.status
                                  ? item.price -
                                    (item.price * item.promotion.percentage) /
                                      100
                                  : item.price,
                                quantity: 1,
                                previewImage: item.image
                              });
                        }}>
                        {state.cart.some(
                          (product) => product.productId === item._id
                        ) ? (
                          <IoCart />
                        ) : (
                          <IoCartOutline />
                        )}
                      </button>
                      {item.image && (
                        <Link href={`/ecommerce/products/${item._id}`}>
                          <Image
                            src={item.image.url}
                            width={250}
                            height={250}
                            blurDataURL={blurDataUrlImage}
                            placeholder='blur'
                            alt={`Imagem de ${item.name}`}
                          />
                        </Link>
                      )}
                      {!item.image && (
                        <Link href={`/ecommerce/products/${item._id}`}>
                          <IoBagHandle className='no-image-icon' />
                        </Link>
                      )}
                    </div>
                    <Link
                      href={`/ecommerce/products/${item._id}`}
                      className='product-details'>
                      <button className='buy-mobile-button'>
                        <IoBagCheck />
                        <span>Comprar agora</span>
                      </button>
                      {item.promotion.status ? (
                        <div className='item promo-price'>
                          <h4>
                            <span className='old-price'>
                              {currencyFormatter(item.price)}
                            </span>{' '}
                            <span className='actual-price'>
                              {currencyFormatter(
                                item.price -
                                  (item.price * item.promotion.percentage) / 100
                              )}
                            </span>
                          </h4>
                        </div>
                      ) : (
                        <div className='item promo-price'>
                          <span className='actual-price'>
                            {currencyFormatter(item.price)}
                          </span>
                        </div>
                      )}

                      <h3>
                        <span>
                          {item.name.length > 40
                            ? item.name.slice(0, 40) + '...'
                            : item.name}{' '}
                        </span>
                      </h3>
                    </Link>
                  </motion.div>
                ))
              : null}
          </section>
        </div> */}
      </section>
    </main>
  );
}
