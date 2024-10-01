import styles from './MainPage.module.scss';
import useStore from '../../store';
import DetailListCard from '../../components/ListCard/DetailListCard';

const MainPage = () => {
  const { hotPlaceLists } = useStore();

  return (
    <ul className={styles.cardLists}>
      {hotPlaceLists.map((place, index) => (
        <div key={index}>
          <p className={styles.ageGroup}>
            <strong className={`${styles[`age${index + 1}0`]}`}>{index + 1}0대</strong>가 가장 많이
            방문했어요!
          </p>
          <DetailListCard place={place} defaultOpen={false} />
        </div>
      ))}
    </ul>
  );
};

export default MainPage;
