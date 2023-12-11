'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import httpClient from '@/config/http-client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { DownloadIcon, LockIcon } from 'lucide-react';
import { useInnerWindowSize } from '@/hooks/useInnerWindowSize';
import { PasswordSchemaType, passwordSchema } from '@/providers/schemas';

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { height: innerHeight } = useInnerWindowSize();

  const form = useForm<PasswordSchemaType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirm_password: ''
    }
  });

  const onSubmit = async ({ password }: PasswordSchemaType) => {
    setLoading(true);
    try {
      await httpClient<PasswordSchemaType, PasswordSchemaType>({
        method: 'post',
        url: '/api/v1/auth/sign-up',
        data: { password }
      });
      // router.push(`/auth/success`);
    } catch (error: any) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className='w-full pt-[70px] px-4 font-sans flex flex-col gap-12 bg-background'
      style={{ minHeight: innerHeight / 1 }}>
      <section className='w-full max-w-[890px] p-4 mobile-x:p-8 sm:m-auto '>
        <div className=' w-full max-w-[400px] flex flex-col gap-12 justify-between pt-10 md:p-0 mx-auto'>
          <div className='w-full flex flex-col gap-3'>
            <h1 className='font-sans-display font-bold sm:text-4xl max-w-md leading-normal'>
              Update Credentials
            </h1>
            <p className='font-sm max-w-2xl'>
              Complete the form below to update your account password.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8 w-full h-full max my-auto'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <LockIcon className='w-auto h-5' />
                      <span>Password</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        type='password'
                        placeholder='Enter your password'
                        {...field}
                        className='rounded-3xl'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirm_password'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <LockIcon className='w-auto h-5' />
                      <span>Confirm Password</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        type='password'
                        placeholder='Confirm your password'
                        {...field}
                        className='rounded-3xl'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={loading}
                variant={'default'}
                size={'lg'}
                className='w-full flex items-center gap-2'
                type='submit'>
                <DownloadIcon className='stroke-white' />
                <span className='text-white font-semibold'>Submit</span>
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
