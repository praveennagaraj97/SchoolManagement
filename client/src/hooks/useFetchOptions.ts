import type { SWRConfiguration } from 'swr';
import { useUserStore } from '../context/userContext';
import { axiosInstance } from '../services/api.service';

export const useFetchOptions: () => SWRConfiguration = () => {
  const { token } = useUserStore();

  return {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    errorRetryCount: 7,
    errorRetryInterval: 1000,
    fetcher: (url, params) =>
      axiosInstance({
        url,
        params: {
          ...params,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.data)
        .catch((e) => {
          throw e;
        }),
  };
};
