import PropTypes from 'prop-types'; // PropTypes 임포트
import styles from './ListCard.module.scss';

// 어차피 디테일 페이지를 만들어야 하는데 ListCard를 재활용할 수 있음
// DetailListCard를 만들고 그 안에 ListCard를 포함시키자
// 그리고 DetailListCard를 기본렌더링하면 되잖아
// 클릭했을 때 한적한 시간과 막대그래프가 보이게하고
// 닫기를 누르면 없어지고
// TODO DetailListCard컴포넌트 만들기
// TODO 한산한 시간대 계산 로직 생각하기
// TODO 막대 그래프 컴포넌트 만들기

const ListCard = ({ place, age }) => {
  return (
    <div className={styles.listCard}>
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
          <span className={`${styles.age} ${styles[`age${age}0`]}`}>{age}0대한테 인기 많아요</span>
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
  age: PropTypes.number.isRequired,
};

export default ListCard;
