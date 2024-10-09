import useStore from '../../store';
import styles from '../common.module.scss';
import EventButtons from '../../components/EventButtons/EventButtons';
import DetailListCard from '../../components/ListCard/DetailListCard';
import EventListCard from '../../components/ListCard/EventListCard';
import { useState, useEffect } from 'react';
import Loading from './../../components/Loading/Loading';
import { haversineDistance } from '../../utils/haversineDistance';

const DetailPage = () => {
  const { placeDetailInfo, allPlaceLists } = useStore();
  const [showEvents, setShowEvents] = useState(false);
  const [matchedData, setMatchedData] = useState(null);
  const [nearPlaces, setNearPlaces] = useState([]);

  // 선택된 마커의 상세정보를 리스트로 표시
  useEffect(() => {
    if (!placeDetailInfo) return;

    const matched = allPlaceLists.find(item => item.area_nm === placeDetailInfo.AREA_NM);
    setMatchedData(matched);
  }, [placeDetailInfo, allPlaceLists]);

  // 현재 장소를 기준으로 가까운 순으로 정렬
  useEffect(() => {
    if (!matchedData) return;

    setNearPlaces(() => {
      return [...allPlaceLists].sort((a, b) => {
        const distanceA = haversineDistance(matchedData, { x: a.x, y: a.y });
        const distanceB = haversineDistance(matchedData, { x: b.x, y: b.y });

        return distanceA - distanceB;
      });
    });
  }, [matchedData, allPlaceLists]);

  return (
    <>
      {matchedData && <EventButtons setShowEvents={setShowEvents} />}
      <ul className={`${styles.cardLists} ${placeDetailInfo ? styles.detail : ''}`}>
        {!matchedData && <Loading loading={true} />}
        {!showEvents && matchedData && <DetailListCard place={matchedData} defaultOpen={true} />}

        {showEvents ? (
          placeDetailInfo.EVENT_STTS.length === 0 ? (
            <div className={styles.noList}>
              <div className={styles.noListImg}>
                <img src='/noResult.svg' alt='' />
              </div>
              <p className={styles.desc}>주변 문화 행사가 없어요.</p>
            </div>
          ) : (
            placeDetailInfo.EVENT_STTS.map(event => (
              <EventListCard key={event.EVENT_NM} event={event} />
            ))
          )
        ) : (
          nearPlaces
            .slice(1, 11)
            .map((place, index) => <DetailListCard key={index} place={place} defaultOpen={false} />)
        )}
      </ul>
    </>
  );
};

export default DetailPage;
