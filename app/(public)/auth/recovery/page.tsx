'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import httpClient from '@/config/http-client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema, EmailSchemaType } from '@/providers/schemas';
import { DownloadIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<EmailSchemaType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (data: EmailSchemaType) => {
    setLoading(true);
    try {
      //
      router.push(`/dashboard`);
    } catch (error: any) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className='flex w-full flex-col gap-12 bg-background px-4 font-sans'
      style={{ minHeight: innerHeight / 1 }}>
      <section className='m-auto flex w-full max-w-[890px] items-center justify-between gap-8 p-8'>
        <div className=' mx-auto flex w-full max-w-[400px] flex-col justify-between gap-12 md:w-full'>
          <div className='flex w-full flex-col gap-3'>
            <h1 className='max-w-md font-sans font-bold leading-normal sm:text-4xl'>
              Account Recovery
            </h1>
            <p className='font-sm max-w-2xl'>
              Enter your email in the form below to receive a access code.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='max my-auto h-full w-full space-y-8'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      <MailIcon className='h-5 w-auto' />
                      <span>Email</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter your email'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex w-full flex-col items-center gap-3'>
                <Button
                  disabled={loading}
                  variant={'default'}
                  size={'lg'}
                  className='flex w-full items-center gap-2'
                  type='submit'>
                  <DownloadIcon className='stroke-white' />
                  <span className='font-semibold text-white'>Submit</span>
                </Button>
              </div>
            </form>
          </Form>

          <div className='flex flex-col gap-2 '>
            <p className='font-sm max-w-2xl'>
              Don't have an account?{' '}
              <Link
                href={'/auth/sign-up'}
                className='font-bold transition-colors hover:text-primary hover:underline hover:underline-offset-4'>
                Sign up.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
