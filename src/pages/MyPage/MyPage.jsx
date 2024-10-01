import { useState } from 'react';
import DetailListCard from '../../components/ListCard/DetailListCard';
import styles from './MyPage.module.scss';

const MyPage = () => {
  const [likedPlaces, setLikedPlaces] = useState(
    () => JSON.parse(localStorage.getItem('likedPlaces')) || {}
  );

  Object.keys(likedPlaces).map(place => {
    console.log(likedPlaces[place]);
  });

  return (
    <ul className={styles.cardLists}>
      {Object.keys(likedPlaces).map((place, index) => (
        <DetailListCard key={index} place={likedPlaces[place]} defaultOpen={false} />
      ))}
    </ul>
  );
};

export default MyPage;
