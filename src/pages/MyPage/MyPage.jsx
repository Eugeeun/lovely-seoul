import { useState } from 'react';
import DetailListCard from '../../components/ListCard/DetailListCard';
import styles from '../common.module.scss';

// TODO
// 새로고침하면 오류나는 거 디버그

const MyPage = () => {
  const [likedPlaces] = useState(() => JSON.parse(localStorage.getItem('likedPlaces')) || {});

  return (
    <ul className={styles.cardLists}>
      {Object.keys(likedPlaces).length > 0 ? (
        Object.keys(likedPlaces).map((place, index) => (
          <DetailListCard key={index} place={likedPlaces[place]} defaultOpen={false} />
        ))
      ) : (
        <div className={styles.noList}>
          <div className={styles.noListImg}>
            <img src='/noLikeIcon.svg' alt='' />
          </div>
          <p className={styles.desc}>찜한 목록이 비어있어요.</p>
        </div>
      )}
    </ul>
  );
};

export default MyPage;
