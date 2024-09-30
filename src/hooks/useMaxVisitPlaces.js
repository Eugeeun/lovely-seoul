import { useEffect } from 'react';
import { detailPlaceLists } from '../utils/detailPlaceLists';
import useStore from '../store';

const useMaxVisitPlaces = placeLists => {
  const { setAllPlaceLists, setHotPlaceLists } = useStore();

  useEffect(() => {
    if (placeLists && placeLists.row) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      detailPlaceLists(placeLists, geocoder).then(updatedLists => {
        setAllPlaceLists(updatedLists);
        const maxVisitPlaces = Array.from({ length: 6 }, (_, i) => {
          const ageGroupIndex = i + 1; // 1부터 6까지의 인덱스 사용
          return updatedLists.reduce(
            (maxPlace, place) => {
              const popRate = parseFloat(place.population[`PPLTN_RATE_${ageGroupIndex}0`]);
              return popRate > maxPlace.popRate ? { place, popRate } : maxPlace;
            },
            { popRate: 0 }
          ).place;
        });

        setHotPlaceLists(maxVisitPlaces);
      });
    }
  }, [placeLists, setHotPlaceLists, setAllPlaceLists]);
};

export default useMaxVisitPlaces;
