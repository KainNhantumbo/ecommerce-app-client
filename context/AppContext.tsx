import { createContext, useContext, ReactNode } from 'react';
// import { Queryclient } from '@tanstack/react-query';
import {} from 'next/navigation';
import { Auth, HttpError } from '@/types';
import httpClient from '@/config/http-client';
import { updateAuth } from '@/redux/slices/auth';
import { errorTransformer } from '@/lib/http-error-transformer';

type Props = { children: ReactNode };

type Context = {};

const context = createContext<Context>({});

// const queryClient = new QueryClient({
//   defaultOptions: { queries: { networkMode: 'always' } }
// });

export default function AppContext({ children }: Props) {
  const authenticateUser = async () => {
    try {
      const { data } = await httpClient<Auth>({
        method: 'get',
        url: '/api/v1/auth/refresh',
        withCredentials: true
      });
      updateAuth({ ...data });
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      console.error(message || error);
    }
  };

  return <context.Provider value={{}}>{children}</context.Provider>;
}

export const useAppContext = () => useContext(context);
