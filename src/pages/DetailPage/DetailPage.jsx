import useStore from '../../store';
import styles from '../common.module.scss';
import EventButtons from '../../components/EventButtons/EventButtons';
import DetailListCard from '../../components/ListCard/DetailListCard';
import EventListCard from '../../components/ListCard/EventListCard';
import { useState, useEffect } from 'react';
import useSortedHotPlaceLists from '../../hooks/useSortedHotPlaceLists';
import data from '../../../data.json';

const DetailPage = () => {
  const { placeDetailInfo } = useStore();
  const [showEvents, setShowEvents] = useState(false);
  const [matchedData, setMatchedData] = useState(null);
  const sortedHotPlaceLists = useSortedHotPlaceLists();

  // 선택된 마커의 상세정보를 리스트로 표시
  useEffect(() => {
    if (placeDetailInfo) {
      const matched = data.find(item => item.area_nm === placeDetailInfo.AREA_NM);
      setMatchedData(matched);
    }
  }, [placeDetailInfo]);

  return (
    <>
      {placeDetailInfo && <EventButtons setShowEvents={setShowEvents} />}
      <ul className={`${styles.cardLists} ${placeDetailInfo ? styles.detail : ''}`}>
        {!showEvents && matchedData && <DetailListCard place={matchedData} defaultOpen={true} />}

        {showEvents
          ? placeDetailInfo &&
            placeDetailInfo.EVENT_STTS.map(event => (
              <EventListCard key={event.EVENT_NM} event={event} />
            ))
          : sortedHotPlaceLists.map((place, index) => (
              <div key={index}>
                <p className={styles.ageGroup}>
                  <strong className={`${styles[`age${place.index}0`]}`}>{place.index}0대</strong>가
                  가장 많이 방문했어요!
                </p>
                <DetailListCard place={place} defaultOpen={false} />
              </div>
            ))}
      </ul>
    </>
  );
};

export default DetailPage;
