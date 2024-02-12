'use client';

import { DropzoneArea } from '@/components/dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import httpClient from '@/config/http-client';
import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import { DEFAULT_ERROR_MESSAGE } from '@/shared/constants';
import { CreateProduct, HttpError, Product } from '@/types';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'sonner';

export type PageProps = { params: { mode: 'create' | 'update'; productId?: string } };

export default function Page({ params }: PageProps) {
  const [product, setProduct] = useState<CreateProduct>({
    name: '',
    price: 0,
    images: [],
    specs: '',
    description: '',
    sizes: [],
    category: { name: '', value: '' },
    color: [],
    isArchived: false,
    isFeatured: false
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const { httpClientAPI } = useAppContext();
  const router = useRouter();

  useQuery({
    queryKey: ['edit-billboard'],
    queryFn: async () => {
      try {
        if (!params.productId) return product;
        const { data } = await httpClient<Product>({
          method: 'get',
          url: `/api/v1/products/${params.productId}`
        });
        const result = {
          name: data.name,
          price: data.price,
          specs: data?.specs || '',
          description: '',
          images: [],
          sizes: [],
          category: data.category,
          color: [],
          isArchived: data.isArchived,
          isFeatured: data.isFeatured
        };
        setProduct(result);
        return result;
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message || DEFAULT_ERROR_MESSAGE);
        console.warn(message || error);
      }
    }
  });

  const handleUpdate = async (productId: number) => {
    try {
      setIsDisabled(true);
      await httpClientAPI<CreateProduct>({
        method: 'patch',
        url: `/api/v1/products/${productId}`,
        data: product
      });
      setProduct({
        name: '',
        price: 0,
        images: [],
        sizes: [],
        specs: '',
        description: '',
        category: { name: '', value: '' },
        color: [],
        isArchived: false,
        isFeatured: false
      });
      toast.success('Product updated.', {
        action: {
          label: 'Get Back',
          onClick: () => router.back()
        }
      });
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message || DEFAULT_ERROR_MESSAGE, {
        action: {
          label: 'Retry',
          onClick: () => handleUpdate(productId)
        }
      });
      console.warn(message || error);
    } finally {
      setIsDisabled(false);
    }
  };

  const handleCreate = async () => {
    try {
      setIsDisabled(true);
      await httpClientAPI({
        method: 'post',
        url: '/api/v1/products',
        data: product
      });
      toast.success('Product created.', {
        action: {
          label: 'Get Back',
          onClick: () => router.back()
        }
      });
      setProduct({
        name: '',
        price: 0,
        images: [],
        specs: '',
        description: '',
        sizes: [],
        category: { name: '', value: '' },
        color: [],
        isArchived: false,
        isFeatured: false
      });
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message || DEFAULT_ERROR_MESSAGE, {
        action: {
          label: 'Retry',
          onClick: () => handleCreate()
        }
      });
      console.warn(message || error);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <main className='mx-auto mt-[90px] flex min-h-[calc(100vh_-_340px)] w-full max-w-xl flex-col gap-8 px-4 font-sans-body'>
      <h1>Product editor</h1>
      <section className='mb-5 flex flex-col gap-3'>
        {product.images.length > 0 ? (
          <div className='relative flex flex-wrap items-center gap-2'>
            {product.images.map((image, index) => (
              <Image
                src={image}
                alt={`Product image 0${index + 1}`}
                key={index}
                width={500}
                height={800}
                className='base-border w-full max-w-[280px] rounded-lg object-cover'
              />
            ))}
          </div>
        ) : null}
        {product.images.length >= 5 ? (
          <div className='flex max-w-[420px] flex-col gap-3'>
            <DropzoneArea
              handler={(encodedImage) => {
                setProduct({
                  ...product,
                  images: [...product.images, encodedImage]
                });
              }}
            />
          </div>
        ) : null}
      </section>

      <section className='flex flex-col gap-3 py-3'>
        <div className='flex flex-col items-center mobile-x:flex-row'>
          <div className='flex flex-col gap-2'>
            <Label>Name</Label>
            <Input
              type='text'
              placeholder='Product name'
              value={product.name}
              onChange={(e) =>
                setProduct((state) => ({ ...state, name: e.target.value }))
              }
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label>Price</Label>
            <Input
              type='number'
              placeholder='Product price'
              value={product.price}
              onChange={(e) =>
                setProduct((state) => ({ ...state, price: Number(e.target.value) }))
              }
            />
          </div>
        </div>
      </section>

      <Button
        disabled={isDisabled}
        onClick={() => {
          if (params.mode === 'update') {
            handleUpdate(Number(params?.productId));
          } else if (params.mode === 'create') {
            handleCreate();
          }
        }}
        className='w-fit self-end capitalize'>
        {params.mode === 'create' ? 'save' : 'update'}
      </Button>
    </main>
  );
}
