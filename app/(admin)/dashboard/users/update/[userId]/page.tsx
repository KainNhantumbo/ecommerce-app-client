'use client';

import { EmptyMessage } from '@/components/empty-message';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import httpClient from '@/config/http-client';
import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/http-error-transformer';
import { updateUserSchema, type UpdateUserSchemaType } from '@/providers/schemas';
import { DEFAULT_ERROR_MESSAGE, USER_ROLES } from '@/shared/constants';
import { HttpError, User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import {
  AlertTriangleIcon,
  ArrowRightCircleIcon,
  LockIcon,
  User2Icon
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export type PageProps = { params: { userId?: string } };

export default function Page({ params: { userId } }: PageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { httpClientAPI } = useAppContext();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: [`query-user-${userId}`],
    queryFn: async () => {
      try {
        const { data } = await httpClientAPI<User>({
          method: 'get',
          url: `/api/v1/users/${userId}`
        });
        return data;
      } catch (error) {
        console.error(error);
        const { message } = errorTransformer(error as HttpError);
        toast.error(message);
      }
    }
  });

  const form = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
    values: {
      password: '',
      confirm_password: '',
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      employeeId: data?.employeeId || '',
      role: data?.role || ''
    },
    disabled: isLoading
  });

  const onSubmit = async (data: UpdateUserSchemaType) => {
    setLoading(true);
    try {
      await httpClient<UpdateUserSchemaType>({
        method: 'patch',
        url: `/api/v1/users/${userId}`,
        data: {
          ...data,
          employeeId: data.employeeId.toUpperCase(),
          role: data.role.toUpperCase()
        }
      });
      toast.success('User data updated successfully.', {
        action: {
          label: 'Get Back',
          onClick: () => router.back()
        }
      });
    } catch (error: any) {
      toast.error('Something went wrong. Please try again.', {
        action: {
          label: 'Retry',
          onClick: () => onSubmit(data)
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='mx-auto mt-[90px] flex h-full min-h-[calc(100vh_-_340px)] w-full max-w-3xl flex-col gap-8 px-4 font-sans-body'>
      <Heading title='Users Editor' description='Edit user data' />

      {!isLoading && !isError ? (
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Enter your employee ID' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {USER_ROLES.map((role, i) => (
                          <SelectItem
                            value={role}
                            key={i}
                            className='font-sans-body capitalize'>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Enter your role' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {USER_ROLES.map((role, i) => (
                          <SelectItem
                            value={role}
                            key={i}
                            className='font-sans-body capitalize'>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <h3>
              Note: leave these fields below blank, if you don't want to update
              password.
            </h3>
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

            <div>
              <Button
                disabled={loading}
                variant={'default'}
                size={'lg'}
                className='flex w-fit items-center gap-2 justify-self-end'
                type='submit'>
                <ArrowRightCircleIcon className='stroke-white' />
                <span className='font-semibold text-white'>Update user</span>
              </Button>
            </div>
          </form>
        </Form>
      ) : null}

      {isError && !isLoading ? (
        <EmptyMessage
          icon={AlertTriangleIcon}
          message={
            errorTransformer(error as HttpError).message || DEFAULT_ERROR_MESSAGE
          }
        />
      ) : null}

      {!isError && isLoading ? <Loader /> : null}
    </main>
  );
}
