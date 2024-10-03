import ky from 'ky';

// 서버리스 함수를 호출해 인구 데이터를 가져오는 함수
export const fetchPopulation = async placeName => {
  const url = `/api/fetchPopulation?placeName=${placeName}`;
  const result = await ky.get(url).json();
  return result;
};
