import useStore from '../../store';
import styles from '../common.module.scss';
import DetailListCard from '../../components/ListCard/DetailListCard';

const SearchPage = () => {
  const { savedSearchTerm, allPlaceLists } = useStore();
  const searchedPlaceLists = allPlaceLists.filter(place => place.area_nm.includes(savedSearchTerm));

  return (
    <ul className={styles.cardLists}>
      {searchedPlaceLists.length > 0 ? (
        searchedPlaceLists.map((place, index) => (
          <DetailListCard key={index} place={place} defaultOpen={false} />
        ))
      ) : (
        <div className={styles.noList}>
          <div className={styles.noListImg}>
            <img src='/noResult.svg' alt='' />
          </div>
          <p className={styles.desc}>검색 결과가 없어요.</p>
        </div>
      )}
    </ul>
  );
};

export default SearchPage;
