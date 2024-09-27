import ky from 'ky';

export const fetchPopulation = async placeName => {
  const url = `http://openapi.seoul.go.kr:8088/${
    import.meta.env.VITE_CITY_POP_API_KEY
  }/json/citydata_ppltn/1/5/${placeName}`;
  const result = await ky.get(url).json();
  return result['SeoulRtd.citydata_ppltn'][0];
};
