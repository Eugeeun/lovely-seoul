import { useEffect } from 'react';
import { detailPlaceLists } from '../utils/detailPlaceLists';
import useStore from '../store';

// 핫플 추출 훅
const useMaxVisitPlaces = placeLists => {
  const { setAllPlaceLists, setHotPlaceLists } = useStore();

  useEffect(() => {
    if (placeLists && placeLists.row) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      detailPlaceLists(placeLists, geocoder).then(updatedLists => {
        setAllPlaceLists(updatedLists);

        const maxVisitPlaces = Array.from({ length: 6 }, (_, i) => {
          const ageGroupIndex = i + 1; // 1부터 6까지의 인덱스 사용

          // 각 연령대별로 상위 6개 장소를 필터링
          const topPlaces = updatedLists
            .map(place => ({
              place,
              popRate: parseFloat(place.population[`PPLTN_RATE_${ageGroupIndex}0`]),
            }))
            .filter(place => !isNaN(place.popRate)) // NaN 필터링
            .sort((a, b) => b.popRate - a.popRate) // 인구 비율로 내림차순 정렬
            .slice(0, 6); // 상위 6개 선택

          return topPlaces.map(item => ({
            ...item.place,
            index: ageGroupIndex, // 인덱스 추가
          }));
        });

        console.log(maxVisitPlaces);
        setHotPlaceLists(maxVisitPlaces);
      });
    }
  }, [placeLists, setHotPlaceLists, setAllPlaceLists]);
};

export default useMaxVisitPlaces;
