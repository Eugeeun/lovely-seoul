import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

const useFetch = url => {
  return useQuery({
    queryKey: [url],
    queryFn: () => ky.get(url).json(),
  });
};

export default useFetch;
