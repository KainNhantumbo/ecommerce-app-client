'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import httpClient from '@/config/http-client';
import { useInnerWindowSize } from '@/hooks/inner-window-size-hook';
import { PasswordSchemaType, passwordSchema } from '@/providers/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { DownloadIcon, LockIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function Page() {
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
      className='flex w-full flex-col gap-12 bg-background px-4 pt-[70px] font-sans'
      style={{ minHeight: innerHeight / 1 }}>
      <section className='w-full max-w-5xl p-4 mobile-x:p-8 sm:m-auto '>
        <div className=' mx-auto flex w-full max-w-[400px] flex-col justify-between gap-12 pt-10 md:p-0'>
          <div className='flex w-full flex-col gap-3'>
            <h1 className='max-w-md font-sans font-bold leading-normal sm:text-4xl'>
              Update Credentials
            </h1>
            <p className='font-sm max-w-2xl'>
              Complete the form below to update your account password.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='max my-auto h-full w-full space-y-8'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <LockIcon className='h-5 w-auto' />
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
                      <LockIcon className='h-5 w-auto' />
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
                className='flex w-full items-center gap-2'
                type='submit'>
                <DownloadIcon className='stroke-white' />
                <span className='font-semibold text-white'>Submit</span>
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
