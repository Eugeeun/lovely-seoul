import KakaoMap from './components/KakaoMap/KakaoMap';
import useFetch from './hooks/useFetch';
import Loading from './components/Loading/Loading';
import useMaxVisitPlaces from './hooks/useMaxVisitPlaces'; // 커스텀 훅 임포트
import useStore from './store'; // Zustand 스토어 임포트
import data from '../data.json';
import { useEffect } from 'react';
import styles from './App.module.scss';
import DetailListCard from './components/ListCard/DetailListCard';
import EventListCard from './components/ListCard/EventListCard';

/**
 * TODO
 * placeDetailInfo가 있으면 버튼 2개 만들어야 함
 * 상세정보 + 다른 장소, 문화 행사 리스트 보이게 하기
 *
 * 로그인 컴포넌트 만들기
 * 로그인된 정보는 로컬스토리지에 저장
 *
 * 헤더 컴포넌트 만들기
 *
 * 좋아요 기능 추가
 *
 * 리스트 타이플 컴포넌트 만들기
 */

const getAllPlaceListUrl =
  'https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=1&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=all&sort=true';

function App() {
  const { data: placeLists, error, isLoading } = useFetch(getAllPlaceListUrl);
  const { hotPlaceLists, setHotPlaceLists } = useStore();
  const { placeDetailInfo } = useStore();

  useEffect(() => {
    if (placeLists && placeLists.row) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      const maxVisitPlaces = Array.from({ length: 6 }, (_, i) => {
        const ageGroupIndex = i + 1;
        return data.reduce(
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
    }
  }, [placeLists, setHotPlaceLists]);

  if (isLoading) return <Loading loading={true} />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.app}>
      <ul className={styles.cardLists}>
        {hotPlaceLists.map((place, index) => (
          <DetailListCard key={index} place={place} age={index + 1} />
        ))}
        {placeDetailInfo &&
          placeDetailInfo.EVENT_STTS.map(event => (
            <EventListCard key={event.EVENT_NM} event={event} />
          ))}
      </ul>

      <div className={styles.kakaoMapCon}>
        <KakaoMap placeLists={placeLists.row} />
      </div>
    </div>
  );
}

export default App;
