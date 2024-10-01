import KakaoMap from './components/KakaoMap/KakaoMap';
import useFetch from './hooks/useFetch';
import Loading from './components/Loading/Loading';
import useStore from './store';
import data from '../data.json';
import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import DetailListCard from './components/ListCard/DetailListCard';
import EventListCard from './components/ListCard/EventListCard';
import EventButtons from './components/EventButtons/EventButtons';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import { Routes, Route } from 'react-router-dom';
import MyPage from './pages/MyPage/MyPage';

const getAllPlaceListUrl =
  'https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=1&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=all&sort=true';

/**
 * TODO
 * 3. 리스트 클릭 카카오맵에 반영
 * 4. 검색
 */

function App() {
  const { data: placeLists, error, isLoading } = useFetch(getAllPlaceListUrl);
  const { hotPlaceLists, setHotPlaceLists } = useStore();
  const { placeDetailInfo } = useStore();
  const [showEvents, setShowEvents] = useState(false);
  const [matchedData, setMatchedData] = useState(null);
  const { isLoginModalOpen, setIsLoginModalOpen } = useStore();

  useEffect(() => {
    setIsLoginModalOpen(!localStorage.getItem('userInfo'));
  }, []);

  useEffect(() => {
    if (placeLists && placeLists.row) {
      const maxVisitPlaces = Array.from({ length: 6 }, (_, i) => {
        const ageGroupIndex = i + 1;
        return data.reduce(
          (maxPlace, place) => {
            const popRate = parseFloat(place.population[`PPLTN_RATE_${ageGroupIndex}0`]);
            return popRate > maxPlace.popRate ? { place, popRate } : maxPlace;
          },
          { popRate: 0 }
        ).place;
      });

      setHotPlaceLists(maxVisitPlaces);
    }
  }, [placeLists, setHotPlaceLists]);

  // TODO
  // 추후에는 data가 아니라 전역 상태 관리하고 있는 allPlaceLists에서 불러와서 결정
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
      <Header handleMatchedData={setMatchedData} handleModalOpen={setIsLoginModalOpen} />
      <div className={styles.contentsCon}>
        <div className={styles.listCon}>
          <Welcome />
          <Routes>
            <Route
              path='/'
              element={
                <>
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
                          <div key={index}>
                            <p className={styles.ageGroup}>
                              <strong className={`${styles[`age${index + 1}0`]}`}>
                                {index + 1}0대
                              </strong>
                              가 가장 많이 방문했어요!
                            </p>
                            <DetailListCard place={place} defaultOpen={false} />
                          </div>
                        ))}
                  </ul>
                </>
              }
            />
            <Route path='/mypage' element={<MyPage handleModalOpen={setIsLoginModalOpen} />} />
          </Routes>
        </div>
        <div className={styles.kakaoMapCon}>
          <KakaoMap placeLists={placeLists.row} />
        </div>
      </div>
      {isLoginModalOpen && (
        <div className={styles.loginCon}>
          <Login
            handleClose={() => {
              setIsLoginModalOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
