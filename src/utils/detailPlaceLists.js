import { fetchAddress } from './fetchAddress';
import { fetchPopulation } from './fetchPopulation';

export const detailPlaceLists = async (placeLists, geocoder) => {
  return await Promise.all(
    placeLists.row.map(async place => ({
      ...place,
      address: await fetchAddress(geocoder, place.x, place.y),
      population: await fetchPopulation(place.area_nm),
    }))
  );
};
