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
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import httpClient from '@/config/http-client';
import { updateUserSchema, type UpdateUserSchemaType } from '@/providers/schemas';
import { USER_ROLES } from '@/shared/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightCircleIcon, LockIcon, User2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export type PageProps = { params: { userId?: string } };

export default function Page({ params: { userId } }: PageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
      firstName: '',
      lastName: '',
      employeeId: '',
      role: ''
    }
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
    <main>
      <Heading title='Users Editor' description='Edit user data' />

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
                        <SelectItem value={role} key={i} className='capitalize'>
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
                        <SelectItem value={role} key={i} className='capitalize'>
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
            Note: leave these fields below blank, if you don't want to update password.
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
    </main>
  );
}
