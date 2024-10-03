import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

const useFetch = url => {
  const apiUrl = `/api/${url}`;

  return useQuery({
    queryKey: [url],
    queryFn: () => ky.get(apiUrl).json(),
  });
};

export default useFetch;
