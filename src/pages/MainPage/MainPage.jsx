import styles from '../common.module.scss';
import DetailListCard from '../../components/ListCard/DetailListCard';
import useSortedHotPlaceLists from '../../hooks/useSortedHotPlaceLists';

const MainPage = () => {
  const sortedHotPlaceLists = useSortedHotPlaceLists();

  return (
    <ul className={styles.cardLists}>
      {sortedHotPlaceLists.map((place, index) => (
        <div key={index}>
          <p className={styles.ageGroup}>
            <strong className={`${styles[`age${place.index}0`]}`}>{place.index}0대</strong>가 가장
            많이 방문했어요!
          </p>
          <DetailListCard place={place} defaultOpen={false} />
        </div>
      ))}
    </ul>
  );
};

export default MainPage;
