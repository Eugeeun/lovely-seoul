import ky from 'ky';

// 장소명으로 인구 데이터 요청 후 리턴
export const fetchPopulation = async placeName => {
  const url = `http://openapi.seoul.go.kr:8088/${
    import.meta.env.VITE_CITY_POP_API_KEY
  }/json/citydata_ppltn/1/5/${placeName}`;
  const result = await ky.get(url).json();
  return result['SeoulRtd.citydata_ppltn'][0];
};
