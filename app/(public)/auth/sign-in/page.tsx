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
import { useInnerWindowSize } from '@/hooks/inner-window-size-hook';
import { errorTransformer } from '@/lib/http-error-transformer';
import { UserLoginType, userLoginSchema } from '@/providers/schemas';
import backgroundImage from '@/public/login-background.jpg';
import { updateAuth } from '@/redux/slices/auth';
import { AppDispatch } from '@/redux/store';
import { Auth, HttpError } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { GithubIcon, LockIcon, MailIcon, UnlockIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { height: innerHeight } = useInnerWindowSize();

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
      const response = await httpClient<Auth>({
        method: 'post',
        url: '/api/v1/auth/sign-in',
        data,
        withCredentials: true
      });
      dispatch(updateAuth({ ...response.data }));
      router.push(`/dashboard/overview`);
    } catch (error: any) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.warn(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className='flex w-full flex-col gap-12 bg-background px-4 font-sans'
      style={{ minHeight: innerHeight }}>
      <section className='m-auto flex w-full max-w-5xl items-center justify-between gap-8 p-8'>
        <div className=' mx-auto flex w-full max-w-[400px] flex-col justify-between gap-12 md:w-full'>
          <div className='flex w-full flex-col gap-3'>
            <h1 className='max-w-md font-sans font-bold leading-normal sm:text-4xl'>
              Welcome back!
            </h1>
            <p className='font-sm max-w-2xl'>
              Complete the form below to access your account.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='max my-auto h-full w-full space-y-5'>
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
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
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

              <div className='flex w-full flex-col items-center gap-3'>
                <Button
                  disabled={loading}
                  variant={'default'}
                  size={'lg'}
                  className='flex w-full items-center gap-2'
                  type='submit'>
                  <UnlockIcon className='stroke-white' />
                  <span className='font-semibold text-white'>Sign In</span>
                </Button>
                <Button
                  disabled={loading}
                  variant={'ghost'}
                  size={'lg'}
                  className='group flex w-full items-center gap-2'>
                  <GithubIcon className='stroke-primary ' />
                  <span className='font-semibold text-primary '>Sign In with Github</span>
                </Button>
              </div>
            </form>
          </Form>

          <div className='flex flex-col gap-2 '>
            <p className=' max-w-2xl text-end underline underline-offset-4 transition-colors hover:text-primary'>
              <Link href={'/auth/recovery'}>Forgot password.</Link>
            </p>
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
        <Image
          src={backgroundImage}
          alt='background image'
          width={640}
          height={887}
          className=' hidden w-full rounded-xl object-cover md:block md:max-h-[500px]'
        />
      </section>
    </main>
  );
}
