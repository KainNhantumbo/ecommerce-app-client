'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  ArrowRightCircleIcon,
  LockIcon,
  MailIcon,
  User2Icon
} from 'lucide-react';
import { UserSignupType, userSignupSchema } from '@/providers/schemas';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import httpClient from '@/config/http-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useInnerWindowSize } from '@/hooks/useInnerWindowSize';

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { height: innerHeight } = useInnerWindowSize();

  const form = useForm<UserSignupType>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
      firstName: '',
      lastName: '',
      employeeId: '',
      role: ''
    }
  });

  const onSubmit = async (data: UserSignupType) => {
    setLoading(true);
    try {
      await httpClient<UserSignupType, UserSignupType>({
        method: 'post',
        url: '/api/v1/auth/sign-up',
        data: {
          ...data,
          employeeId: data.employeeId.toUpperCase(),
          role: data.role.toUpperCase()
        }
      });
      router.push(`/auth/success`);
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
      <section className='w-full max-w-[890px] p-4 mobile-x:p-8 m-auto '>
        <div className=' w-full flex flex-col gap-12 justify-between pt-10 md:p-0 mx-auto'>
          <div className='w-full flex flex-col gap-3'>
            <h1 className='font-sans-display font-bold sm:text-4xl max-w-md leading-normal'>
              Sign Up
            </h1>
            <p className='font-sm max-w-2xl'>
              Complete the form below to create your account.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8 w-full h-full max my-auto'>
              <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel className='flex items-center gap-2'>
                        <User2Icon className='w-auto h-5' />
                        <span>First name</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter your first name'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel className='flex items-center gap-2'>
                        <User2Icon className='w-auto h-5' />
                        <span>First name</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter your first name'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                <FormField
                  control={form.control}
                  name='employeeId'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel className='flex items-center gap-2'>
                        <User2Icon className='w-auto h-5' />
                        <span>Employee ID</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter your employee ID'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel className='flex items-center gap-2'>
                        <User2Icon className='w-auto h-5' />
                        <span>Role</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter your role'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

              <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
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
              </div>

              <div className='w-full flex flex-col mobile-x:flex-row items-center gap-3'>
                <Button
                  disabled={loading}
                  variant={'default'}
                  size={'lg'}
                  className='w-full flex items-center gap-2'
                  type='submit'>
                  <ArrowRightCircleIcon className='stroke-white' />
                  <span className='text-white font-semibold'>Sign Up</span>
                </Button>
                <Button
                  disabled={loading}
                  variant={'outline'}
                  size={'lg'}
                  className='w-full flex items-center gap-2 group'
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/auth/sign-in');
                  }}>
                  <LockIcon className='stroke-primary group-hover:stroke-white' />
                  <span className='text-primary font-semibold group-hover:text-white'>
                    Sign In
                  </span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
