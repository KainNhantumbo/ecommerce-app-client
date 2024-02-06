'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import httpClient from '@/config/http-client';
import { useInnerWindowSize } from '@/hooks/useInnerWindowSize';
import { UserSignupType, userSignupSchema } from '@/providers/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightCircleIcon, LockIcon, MailIcon, User2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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
      className='flex w-full flex-col gap-12 bg-background px-4 pt-[70px] font-sans'
      style={{ minHeight: innerHeight / 1 }}>
      <section className='m-auto w-full max-w-[890px] p-4 mobile-x:p-8 '>
        <div className=' mx-auto flex w-full flex-col justify-between gap-12 pt-10 md:p-0'>
          <div className='flex w-full flex-col gap-3'>
            <h1 className='max-w-md font-sans-display font-bold leading-normal sm:text-4xl'>
              Sign Up
            </h1>
            <p className='font-sm max-w-2xl'>
              Complete the form below to create your account.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='max my-auto h-full w-full space-y-8'>
              <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel className='flex items-center gap-2'>
                        <User2Icon className='h-5 w-auto' />
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
                        <User2Icon className='h-5 w-auto' />
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

              <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
                <FormField
                  control={form.control}
                  name='employeeId'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel className='flex items-center gap-2'>
                        <User2Icon className='h-5 w-auto' />
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
                        <User2Icon className='h-5 w-auto' />
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

              <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex w-full flex-col items-center gap-3 mobile-x:flex-row'>
                <Button
                  disabled={loading}
                  variant={'default'}
                  size={'lg'}
                  className='flex w-full items-center gap-2'
                  type='submit'>
                  <ArrowRightCircleIcon className='stroke-white' />
                  <span className='font-semibold text-white'>Sign Up</span>
                </Button>
                <Button
                  disabled={loading}
                  variant={'outline'}
                  size={'lg'}
                  className='group flex w-full items-center gap-2'
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/auth/sign-in');
                  }}>
                  <LockIcon className='stroke-primary' />
                  <span className='font-semibold text-primary '>Sign In</span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
