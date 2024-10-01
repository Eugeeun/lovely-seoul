import PropTypes from 'prop-types'; // PropTypes 임포트
import styles from './ListCard.module.scss';
import { useEffect, useState } from 'react';
import useStore from '../../store';

const ListCard = ({ place, age, handleClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { setIsLoginModalOpen } = useStore();

  useEffect(() => {
    const savedLikedPlaces = JSON.parse(localStorage.getItem('likedPlaces')) || {};
    if (savedLikedPlaces[place.area_nm]) {
      setIsLiked(true);
    }
  }, [place.area_nm]);

  useEffect(() => {
    const savedLikedPlaces = JSON.parse(localStorage.getItem('likedPlaces')) || {};

    if (isLiked) {
      // 좋아요 누르면 로컬스토리지에 저장
      const newLikedPlaces = { ...savedLikedPlaces, [place.area_nm]: place };
      localStorage.setItem('likedPlaces', JSON.stringify(newLikedPlaces));
    } else {
      // 좋아요를 취소하면 로컬스토리지에서 제거
      const { [place.area_nm]: _, ...remainingLikedPlaces } = savedLikedPlaces;
      localStorage.setItem('likedPlaces', JSON.stringify(remainingLikedPlaces));
    }
  }, [isLiked, place]);

  const handleLIkeClick = e => {
    e.stopPropagation();
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
    if (!userInfo) {
      setIsLoginModalOpen(true);
    } else setIsLiked(!isLiked);
  };

  return (
    <div className={styles.listCard} onClick={handleClick}>
      <div className={styles.listCardImg}>
        <img src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${place.area_nm}.jpg`} alt='' />
      </div>
      <div className={styles.detailInfo}>
        <h3 className={styles.title}>{place.area_nm}</h3>
        <div className={styles.location}>
          <div className={styles.locationIcon}>
            <img src='/locationIcon.svg' alt='' />
          </div>
          <p>{place.address}</p>
        </div>
        <p className={styles.desc}>{place.population.AREA_CONGEST_MSG}</p>
        <div className={styles.genderRatio}>
          <div className={styles.maleRatio}>
            <div className={styles.maleIcon}>
              <img src='/maleIcon.jpg' alt='' />
            </div>
            <span>{place.population.MALE_PPLTN_RATE}</span>
          </div>
          <div className={styles.femaleRatio}>
            <div className={styles.femaleIcon}>
              <img src='/femaleIcon.jpg' alt='' />
            </div>
            <span>{place.population.FEMALE_PPLTN_RATE}</span>
          </div>
        </div>
        <div className={styles.conditionCon}>
          <span className={`${styles.density} ${styles[`density${place.area_congest_num}`]}`}>
            {place.area_congest_lvl}
          </span>
          <span className={`${styles.age} ${styles[`age${age}`]}`}>{age}대한테 인기 많아요</span>
        </div>
      </div>
      <div>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          onClick={handleLIkeClick}
        >
          <path
            d='M12.5098 20.8101C12.1807 20.9301 11.6388 20.9301 11.3097 20.8101C8.50317 19.8201 2.23193 15.6901 2.23193 8.6901C2.23193 5.6001 4.64171 3.1001 7.61281 3.1001C9.37418 3.1001 10.9323 3.9801 11.9098 5.3401C12.8872 3.9801 14.455 3.1001 16.2067 3.1001C19.1778 3.1001 21.5876 5.6001 21.5876 8.6901C21.5876 15.6901 15.3164 19.8201 12.5098 20.8101Z'
            stroke='#292D32'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={isLiked ? styles.liked : ''}
          />
        </svg>
      </div>
    </div>
  );
};

// PropTypes 설정
ListCard.propTypes = {
  place: PropTypes.shape({
    area_nm: PropTypes.string.isRequired,
    area_congest_num: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    population: PropTypes.shape({
      AREA_CONGEST_MSG: PropTypes.string.isRequired,
      MALE_PPLTN_RATE: PropTypes.string.isRequired,
      FEMALE_PPLTN_RATE: PropTypes.string.isRequired,
    }).isRequired,
    area_congest_lvl: PropTypes.string.isRequired,
  }).isRequired,
  age: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

export default ListCard;
