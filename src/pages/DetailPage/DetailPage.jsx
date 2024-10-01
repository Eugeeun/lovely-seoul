import useStore from '../../store';
import styles from './DetailPage.module.scss';
import EventButtons from '../../components/EventButtons/EventButtons';
import DetailListCard from '../../components/ListCard/DetailListCard';
import EventListCard from '../../components/ListCard/EventListCard';
import { useState, useEffect } from 'react';
import data from '../../../data.json';

const DetailPage = () => {
  const { placeDetailInfo } = useStore();
  const [showEvents, setShowEvents] = useState(false);
  const [matchedData, setMatchedData] = useState(null);
  const { hotPlaceLists } = useStore();

  // TODO
  // 추후에는 data가 아니라 전역 상태 관리하고 있는 allPlaceLists에서 불러와서 결정
  useEffect(() => {
    if (placeDetailInfo) {
      const matched = data.find(item => item.area_nm === placeDetailInfo.AREA_NM);
      setMatchedData(matched);
    }
  }, [placeDetailInfo]);

  return (
    <>
      {placeDetailInfo && <EventButtons setShowEvents={setShowEvents} />}
      <ul className={styles.cardLists}>
        {!showEvents && matchedData && <DetailListCard place={matchedData} defaultOpen={true} />}

        {showEvents
          ? placeDetailInfo &&
            placeDetailInfo.EVENT_STTS.map(event => (
              <EventListCard key={event.EVENT_NM} event={event} />
            ))
          : hotPlaceLists.map((place, index) => (
              <div key={index}>
                <p className={styles.ageGroup}>
                  <strong className={`${styles[`age${index + 1}0`]}`}>{index + 1}0대</strong>가 가장
                  많이 방문했어요!
                </p>
                <DetailListCard place={place} defaultOpen={false} />
              </div>
            ))}
      </ul>
    </>
  );
};

export default DetailPage;
