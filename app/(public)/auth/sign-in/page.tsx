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
import { errorTransformer } from '@/lib/http-error-transformer';
import { UserLoginType, userLoginSchema } from '@/providers/schemas';
import backgroundImage from '@/public/login-background.jpg';
import { updateAuth } from '@/redux/slices/auth';
import { Auth, HttpError } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { GithubIcon, LockIcon, MailIcon, UnlockIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export default function Page() {
  const dispatch = useDispatch();
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
      router.push(`/dashboard`);
    } catch (error: any) {
      const { message } = errorTransformer(error as HttpError);
      console.warn(message);
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
              Wellcome back!
            </h1>
            <p className='font-sm max-w-2xl'>
              Complete the form below to access your account.
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
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
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

              <div className='w-full flex flex-col items-center gap-3'>
                <Button
                  disabled={loading}
                  variant={'default'}
                  size={'lg'}
                  className='w-full flex items-center gap-2'
                  type='submit'>
                  <UnlockIcon className='stroke-white' />
                  <span className='text-white font-semibold'>Sign In</span>
                </Button>
                <Button
                  disabled={loading}
                  variant={'outline'}
                  size={'lg'}
                  className='w-full flex items-center gap-2 group'>
                  <GithubIcon className='stroke-primary group-hover:stroke-white' />
                  <span className='text-primary font-semibold group-hover:text-white'>
                    Sign In with Github
                  </span>
                </Button>
              </div>
            </form>
          </Form>

          <div className='flex flex-col gap-2 '>
            <p className=' max-w-2xl text-end underline hover:text-primary underline-offset-4 transition-colors'>
              <Link href={'/auth/password-recovery'}>Forgot password.</Link>
            </p>
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
        <Image
          src={backgroundImage}
          alt='background image'
          width={640}
          height={887}
          className=' w-full hidden md:block md:max-h-[500px] object-cover rounded-xl'
        />
      </section>
    </main>
  );
}
