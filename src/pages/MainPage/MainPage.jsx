import styles from '../common.module.scss';
import DetailListCard from '../../components/ListCard/DetailListCard';
import useStore from '../../store';
import { useEffect, useState } from 'react';
import Loading from './../../components/Loading/Loading';

const MainPage = () => {
  const { hotPlaceLists, savedUserInfo } = useStore();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!savedUserInfo) return;
    setIdx(savedUserInfo.age[0] - 1);
  }, [savedUserInfo]);

  return (
    <ul className={styles.cardLists}>
      <Loading loading={hotPlaceLists.length < 1} />
      {!savedUserInfo
        ? hotPlaceLists.map((place, index) => (
            <div key={index}>
              <p className={styles.ageGroup}>
                {`가장 `}
                <strong className={`${styles[`age${place[0].index}0`]}`}>
                  {place[0].index}0대
                </strong>
                의 비율이 높은 장소에요!
              </p>
              <DetailListCard place={place[0]} defaultOpen={false} />
            </div>
          ))
        : hotPlaceLists[idx]?.map((place, index) => (
            <DetailListCard key={index} place={place} defaultOpen={false} />
          ))}
    </ul>
  );
};

export default MainPage;
