'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { updateAuth } from '@/redux/slices/auth';
import { useDispatch } from 'react-redux';
import { UserLoginType, userLoginSchema } from '@/providers/schemas';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import httpClient from '@/config/http-client';
import { useRouter } from 'next/router';
import { Auth } from '@/types';
import toast from 'react-hot-toast';

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<UserLoginType>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: UserLoginType) => {
    setLoading(true);
    try {
      const response = await httpClient<Auth>({ method: 'post', data });
      dispatch(updateAuth({ ...response.data }));
      router.push(`/dashboard`);
    } catch (error: any) {
      
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section>
        <section>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8 w-full'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Your email'
                          type='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          type='password'
                          placeholder='Your name'
                          {...field}
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
                  className='ml-auto'
                  type='submit'>
                  Send message
                </Button>
              </form>
            </Form>
          </div>
        </section>
      </section>
    </main>
  );
}
