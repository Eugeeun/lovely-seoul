import KakaoMap from './components/KakaoMap/KakaoMap';
import useFetch from './hooks/useFetch';
import Loading from './components/Loading/Loading';
import useStore from './store'; // Zustand 스토어 임포트
import data from '../data.json';
import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import DetailListCard from './components/ListCard/DetailListCard';
import EventListCard from './components/ListCard/EventListCard';
import EventButtons from './components/EventButtons/EventButtons';

const getAllPlaceListUrl =
  'https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=1&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=all&sort=true';

function App() {
  const { data: placeLists, error, isLoading } = useFetch(getAllPlaceListUrl);
  const { hotPlaceLists, setHotPlaceLists } = useStore();
  const { placeDetailInfo } = useStore();
  const [showEvents, setShowEvents] = useState(false);
  const [matchedData, setMatchedData] = useState(null);
  /**
   * TODO
   * 나중에 여기에 allPlaceLists를 불러와서 placeDetailInfo의 AREA_NM에 해당하는
   * 리스트를 가져올것
   */

  useEffect(() => {
    if (placeLists && placeLists.row) {
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

  useEffect(() => {
    if (placeDetailInfo) {
      const matched = data.find(item => item.area_nm === placeDetailInfo.AREA_NM);
      setMatchedData(matched);
    }
  }, [placeDetailInfo]);

  if (isLoading) return <Loading loading={true} />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.app}>
      <div>헤더</div>
      <div className={styles.contentsCon}>
        <div className={styles.listCon}>
          {placeDetailInfo && <EventButtons setShowEvents={setShowEvents} />}

          <ul className={styles.cardLists}>
            {!showEvents && matchedData && (
              <DetailListCard place={matchedData} defaultOpen={true} />
            )}
            {showEvents
              ? placeDetailInfo &&
                placeDetailInfo.EVENT_STTS.map(event => (
                  <EventListCard key={event.EVENT_NM} event={event} />
                ))
              : hotPlaceLists.map((place, index) => (
                  <DetailListCard key={index} place={place} defaultOpen={false} />
                ))}
          </ul>
        </div>

        <div className={styles.kakaoMapCon}>
          <KakaoMap placeLists={placeLists.row} />
        </div>
      </div>
    </div>
  );
}

export default App;
