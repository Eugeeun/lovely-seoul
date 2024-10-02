import { fetchAddress } from './fetchAddress';
import { fetchPopulation } from './fetchPopulation';

// 전체 장소 리스트 데이터에 주소명과 방문 연령 비율 데이터를 추가
export const detailPlaceLists = async (placeLists, geocoder) => {
  return await Promise.all(
    placeLists.row.map(async place => ({
      ...place,
      address: await fetchAddress(geocoder, place.x, place.y),
      population: await fetchPopulation(place.area_nm),
    }))
  );
};
