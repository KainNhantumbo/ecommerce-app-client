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
      className='w-full px-4 font-sans flex flex-col gap-12 bg-background'
      style={{ minHeight: innerHeight / 1 }}>
      <section className='w-full max-w-[890px] p-8 m-auto flex justify-between items-center gap-8'>
        <div className=' w-full flex flex-col gap-12 justify-between max-w-[400px] mx-auto md:w-full'>
          <div className='w-full flex flex-col gap-3'>
            <h1 className='font-sans-display font-bold sm:text-4xl max-w-md leading-normal'>
              Account Recovery
            </h1>
            <p className='font-sm max-w-2xl'>
              Enter your email in the form below to receive a access code.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8 w-full h-full max my-auto'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      <MailIcon className='w-auto h-5' />
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

              <div className='w-full flex flex-col items-center gap-3'>
                <Button
                  disabled={loading}
                  variant={'default'}
                  size={'lg'}
                  className='w-full flex items-center gap-2'
                  type='submit'>
                  <DownloadIcon className='stroke-white' />
                  <span className='text-white font-semibold'>Submit</span>
                </Button>
              </div>
            </form>
          </Form>

          <div className='flex flex-col gap-2 '>
            <p className='font-sm max-w-2xl'>
              Don't have an account?{' '}
              <Link
                href={'/auth/sign-up'}
                className='font-bold hover:underline hover:underline-offset-4 transition-colors hover:text-primary'>
                Sign up.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
