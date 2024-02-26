'use client';

import { DropzoneArea } from '@/components/dropzone';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import httpClient from '@/config/http-client';
import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import CategoryOptions from '@/shared/categories.json';
import ColorOptions from '@/shared/colors.json';
import SizesOptions from '@/shared/sizes.json';
import { Color, CreateProduct, HttpError, Product, Size } from '@/types';
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
import { useQuery } from '@tanstack/react-query';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import MultipleSelector from '@/components/multiple-selector';

export type PageProps = { params: { mode: 'create' | 'update'; productId?: string } };

export default function Page({ params }: PageProps) {
  const [product, setProduct] = useState<CreateProduct>({
    name: '',
    price: 0,
    images: [],
    specs: '',
    description: '',
    sizes: [],
    colors: [],
    category: { label: '', value: '' },
    isArchived: false,
    isFeatured: false
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const { httpClientAPI } = useAppContext();
  const router = useRouter();

  useQuery({
    queryKey: ['edit-product'],
    queryFn: async () => {
      try {
        if (params.mode === 'create' || !params.productId) return product;
        const { data } = await httpClient<Product>({
          method: 'get',
          url: `/api/v1/products/${params.productId}`
        });
        setProduct(data as CreateProduct);
        return data as CreateProduct;
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message);
        console.warn(message || error);
      }
    }
  });

  const handleUpdate = async (productId: string) => {
    try {
      setIsDisabled(true);
      await httpClientAPI<CreateProduct>({
        method: 'patch',
        url: `/api/v1/products/${productId}`,
        data: product
      });
      toast.success('Product data updated successfully.', {
        action: {
          label: 'Get Back',
          onClick: () => router.back()
        }
      });
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message, {
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
        data: {
          ...product,
          images: product.images.map(({ url }) => ({ url }))
        }
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
        category: { label: '', value: '' },
        colors: [],
        isArchived: false,
        isFeatured: false
      });
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message, {
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
    <main className='mx-auto mt-[90px] flex h-full min-h-[calc(100vh_-_340px)] w-full max-w-3xl flex-col gap-8 px-4 font-sans-body'>
      <Heading title='Product editor' description='Create and edit store products' />
      <section className='flex h-full w-full flex-wrap items-center justify-center gap-3'>
        <div className='flex w-full flex-wrap gap-3'>
          {product.images.length > 0 &&
            product.images.map((image, index) => (
              <div key={image.id} className='relative h-[220px] w-[220px]'>
                <Image
                  src={image.url}
                  alt={`Product image 0${index + 1}`}
                  key={index}
                  width={280}
                  height={420}
                  className='base-border h-full w-full rounded-lg object-cover'
                />
                <Button
                  className='base-border absolute right-3 top-3 h-6 w-6 rounded-full bg-background p-1'
                  variant={'destructive'}
                  onClick={() =>
                    setProduct((state) => ({
                      ...state,
                      images: state.images.filter((item) => image.id !== item.id)
                    }))
                  }>
                  <XIcon />
                </Button>
              </div>
            ))}

          {product.images.length <= 5 ? (
            <div className='static h-[220px] max-w-[220px]'>
              <DropzoneArea
                width={280}
                height={420}
                handler={(encodedImage) => {
                  setProduct({
                    ...product,
                    images: [
                      ...product.images,
                      { id: crypto.randomUUID(), url: encodedImage }
                    ]
                  });
                }}
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className='flex w-full flex-col gap-3'>
        <div className='flex flex-col items-center gap-3 mobile-x:flex-row'>
          <div className='flex w-full flex-col gap-2'>
            <Label>Name *</Label>
            <Input
              type='text'
              placeholder='Product name'
              value={product.name}
              minLength={0}
              maxLength={64}
              className='w-full'
              onChange={(e) =>
                setProduct((state) => ({ ...state, name: e.target.value }))
              }
            />
            <span className='self-end text-xs'>{product.name.length}/64</span>
          </div>
          <div className='flex flex-col gap-2'>
            <Label>Price *</Label>
            <Input
              type='number'
              placeholder='Product price'
              value={product.price.toString()}
              className='w-full'
              min={0}
              minLength={0}
              onChange={(e) =>
                setProduct((state) => ({ ...state, price: Number(e.target.value) }))
              }
            />
            <span className='self-end text-xs'>{product.price.toString().length}</span>
          </div>
        </div>
        <div className='flex flex-col items-center gap-3'>
          <div className='flex w-full flex-col gap-2'>
            <Label>Description *</Label>
            <Textarea
              placeholder='Product description'
              rows={4}
              value={product.description}
              onChange={(e) =>
                setProduct((state) => ({ ...state, description: e.target.value }))
              }
            />
            <span className='self-end text-xs'>{product.description.length} / 256</span>
          </div>
          <div className='flex w-full flex-col gap-2'>
            <Label>Specs</Label>
            <Textarea
              placeholder='Product specifications or details'
              rows={6}
              value={product.specs}
              onChange={(e) =>
                setProduct((state) => ({ ...state, specs: e.target.value }))
              }
            />
            <span className='self-end text-xs'>{product.specs.length} / 2048</span>
          </div>
        </div>
        <div className='flex flex-col items-center gap-3 mobile-x:flex-row'>
          <div className='flex w-full flex-col gap-2'>
            <Label>Colors *</Label>
            <MultipleSelector
              loadingIndicator={true}
              badgeClassName='bg-secondary text-font'
              value={product.colors.map(({ label, value }) => ({ label, value }))}
              options={ColorOptions.map(({ label, value }) => ({ label, value }))}
              placeholder='Select colors...'
              onChange={(options: unknown) =>
                setProduct((state) => ({
                  ...state,
                  colors: (options as Omit<Color, 'id'>[]).map((option) => {
                    for (const color of ColorOptions) {
                      if (option.value === color.value) return { ...color };
                    }
                    return { ...option, id: '' };
                  })
                }))
              }
              emptyIndicator={
                <p className='text-center text-lg leading-relaxed text-font'>
                  No results found.
                </p>
              }
            />
          </div>
          <div className='flex w-full flex-col gap-2'>
            <Label>Sizes *</Label>
            <MultipleSelector
              loadingIndicator={true}
              badgeClassName='bg-secondary text-font'
              value={product.sizes.map(({ label, value }) => ({ label, value }))}
              options={SizesOptions.map(({ label, value }) => ({ label, value }))}
              placeholder='Select sizes...'
              onChange={(options: unknown) =>
                setProduct((state) => ({
                  ...state,
                  sizes: (options as Omit<Size, 'id'>[]).map((option) => {
                    for (const size of SizesOptions) {
                      if (option.value === size.value) return { ...size };
                    }
                    return { ...option, id: '' };
                  })
                }))
              }
              emptyIndicator={
                <p className='text-center text-lg leading-relaxed text-font'>
                  No results found.
                </p>
              }
            />
          </div>
        </div>
        <div className='flex flex-col items-center gap-3 mobile-x:flex-row'>
          <div className='flex w-full flex-col gap-2'>
            <Label>Category *</Label>
            <Select
              value={product.category.value}
              onValueChange={(option) => {
                const [selected] = CategoryOptions.filter(
                  (item) => item.value === option
                );
                setProduct((state) => ({
                  ...state,
                  category: { ...selected }
                }));
              }}>
              <SelectTrigger>
                <SelectValue placeholder={'Select category...'} />
              </SelectTrigger>
              <SelectContent className='font-sans-body'>
                <SelectScrollUpButton />
                <SelectGroup>
                  {CategoryOptions.map(({ id, label, value }) => (
                    <SelectItem value={value} key={id}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectScrollDownButton />
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className=' flex flex-col gap-3'>
          <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
            <div className='space-y-0.5'>
              <Label>Featured</Label>
              <p>Controls if this product will appear as a featured product.</p>
            </div>
            <Switch
              checked={product.isFeatured}
              onCheckedChange={(checked) =>
                setProduct((state) => ({ ...state, isFeatured: checked }))
              }
            />
          </div>
          <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
            <div className='space-y-0.5'>
              <Label>Archived</Label>
              <p>
                Controls if this product is archived and will not appear anywhere in the
                store.
              </p>
            </div>
            <Switch
              checked={product.isArchived}
              onCheckedChange={(checked) =>
                setProduct((state) => ({ ...state, isArchived: checked }))
              }
            />
          </div>
        </div>
      </section>

      <Button
        disabled={isDisabled}
        onClick={() => {
          if (params.mode === 'update') {
            handleUpdate(String(params.productId));
          } else if (params.mode === 'create') {
            handleCreate();
          }
        }}
        className='w-fit self-end capitalize'>
        {params.mode === 'create' ? 'save & publish' : 'update & publish'}
      </Button>
    </main>
  );
}
