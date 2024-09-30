import PropTypes from 'prop-types'; // PropTypes 임포트
import styles from './ListCard.module.scss';

/**
 * TODO
 * 좋아요 버튼 기능 추가
 * 좋아요 버튼을 누르면 빨간색으로 채움
 * 로컬 스토리지에 place정보 저장
 */

const ListCard = ({ place, age, onClick }) => {
  return (
    <div className={styles.listCard} onClick={onClick}>
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
        <img src='/likeIcon.svg' alt='' />
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
  onClick: PropTypes.func,
};

export default ListCard;
