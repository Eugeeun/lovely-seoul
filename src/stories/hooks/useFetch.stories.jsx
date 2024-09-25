// DataDisplay.stories.js

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import useFetch from '../../hooks/useFetch';

const queryClient = new QueryClient();

const DataDisplay = ({ url }) => {
  const { data, error, isLoading } = useFetch(url);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

DataDisplay.propTypes = {
  url: PropTypes.string.isRequired, // url은 필수 문자열 prop
};

export default {
  title: 'Hooks/useFetch',
  component: DataDisplay,
};

export const Default = () => (
  <QueryClientProvider client={queryClient}>
    <DataDisplay url='https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=1&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=15&sort=true' />
  </QueryClientProvider>
);
