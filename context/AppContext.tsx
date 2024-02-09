'use client';

import httpClient from '@/config/http-client';
import { useLoadCart } from '@/hooks/load-cart-hook';
import { errorTransformer } from '@/lib/http-error-transformer';
import { updateAuth } from '@/redux/slices/auth';
import type { RootState } from '@/redux/store';
import type { Auth, HttpError } from '@/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useContext,
  useEffect,
  type FC,
  type ReactNode
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = { children: ReactNode };

type Context = {
  // eslint-disable-next-line no-unused-vars
  httpClientAPI: <T>(config: AxiosRequestConfig<T>) => Promise<AxiosResponse<T>>;
};

const context = createContext<Context>({
  httpClientAPI: ({ ...config }) => httpClient(config)
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { networkMode: 'always' } }
});

export const AppContext: FC<Props> = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  // loads cart data from localstorage
  useLoadCart();

  const authenticateUser = async () => {
    try {
      const { data } = await httpClient<Auth>({
        method: 'get',
        url: '/api/v1/auth/refresh',
        withCredentials: true
      });
      dispatch(updateAuth({ ...data }));
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      console.error(message || error);
    }
  };

  async function httpClientAPI<T>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    httpClient.interceptors.response.use(
      undefined,
      (error: AxiosError): Promise<never> => {
        const status = Number(error?.response?.status);
        if (status > 400 && status < 404) {
          authenticateUser().catch((error) => {
            const { message } = errorTransformer(error as HttpError);
            console.error(message || error);
            console.warn(message);
            router.push('/auth/sign-in');
          });
        }
        return Promise.reject(error);
      }
    );
    return await httpClient<T>({
      ...config,
      headers: { authorization: `Bearer ${auth.token}` },
      withCredentials: true
    });
  }

  // sends a handshake to the server
  async function handleAPIHealthCheck() {
    try {
      const {
        data: { statusCode, message }
      } = await httpClient<{ statusCode: number; message: string }>({
        method: 'get',
        url: '/api/v1/health'
      });
      console.info(`Service response code ${statusCode}. ${message}`);
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      console.warn(message);
      console.error(error);
    }
  }

  useEffect((): (() => void) => {
    const timer = setTimeout(
      (): void => {
        authenticateUser();
      },
      1000 * 60 * 4
    );
    return (): void => clearTimeout(timer);
  }, [auth]);

  useEffect(() => {
    handleAPIHealthCheck();
    authenticateUser();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <context.Provider value={{ httpClientAPI }}>{children}</context.Provider>
    </QueryClientProvider>
  );
};

export const useAppContext = () => useContext(context);
