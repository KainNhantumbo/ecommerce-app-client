'use client';
import { z } from 'zod';
import React, { FC, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';

const formSchema = z.object({
  name: z.string().minLength(2).maxLength(21),
  email: z.string().isEmail(),
  subject: z.string().minLength(2).maxLength(21),
  message: z.string().minLength(2).maxLength(128)
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm: FC<FormValues> = () => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      subject: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data);
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success('Message sent successfully!');
    } catch (error: any) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={'Get in touch'}
          description={'We are here for you. How can we help'}
        />

        <h3>Drop us a line</h3>
      </div>

      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder='Your name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='subject'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder='Your subject'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <div className='md:grid md:grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Your message'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            Send message
          </Button>
        </form>
      </Form>
    </>
  );
};

export default function Page() {
  return (
    <main>
      <ContactForm />
      <section>

      </section>
    </main>
  );
}
