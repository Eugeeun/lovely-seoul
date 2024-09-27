import { useEffect } from 'react';
import { detailPlaceLists } from '../utils/detailPlaceLists';
import useStore from '../store';

const useMaxVisitPlaces = placeLists => {
  const { setHotPlaceLists } = useStore();

  useEffect(() => {
    if (placeLists && placeLists.row) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      detailPlaceLists(placeLists, geocoder).then(updatedLists => {
        const maxVisitPlaces = Array.from({ length: 6 }, (_, i) => {
          const ageGroupIndex = i + 1; // 1부터 6까지의 인덱스 사용
          return updatedLists.reduce(
            (maxPlace, place) => {
              const { AREA_PPLTN_MAX, AREA_PPLTN_MIN } = place.population;
              const popAvg = Math.floor((parseInt(AREA_PPLTN_MAX) + parseInt(AREA_PPLTN_MIN)) / 2);
              const numOfVisit = Math.floor(
                (popAvg * parseFloat(place.population[`PPLTN_RATE_${ageGroupIndex}0`])) / 100
              );

              return numOfVisit > maxPlace.numOfVisit ? { place, numOfVisit } : maxPlace;
            },
            { numOfVisit: 0 }
          ).place;
        });

        setHotPlaceLists(maxVisitPlaces);
      });
    }
  }, [placeLists, setHotPlaceLists]);
};

export default useMaxVisitPlaces;
