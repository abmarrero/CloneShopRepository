

import { IProduct } from '@/Interfaces'
import useSWR, { SWRConfiguration } from 'swr'


export const useProducts = (url: string, config: SWRConfiguration={}) => {

    // const { data, error } = useSWR<IProduct[]>(`/api/${url}`, fetcher, config)
    const { data, error } = useSWR<IProduct[]>(`/api/${url}`, config)

  return {
    products: data || [],
    isloading: !error && !data ,
    isError: error
  }
}
