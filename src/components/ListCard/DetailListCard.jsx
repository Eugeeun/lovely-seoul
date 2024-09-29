import { useMemo } from 'react';
import ListCard from './ListCard';
import PropTypes from 'prop-types';
import styles from './ListCard.module.scss';
import BarGraph from '../BarGraph/BarGraph';

const DetailListCard = ({ place, age }) => {
  const leastTime = useMemo(() => {
    const sortedTime = place.population.FCST_PPLTN.map(item => ({ ...item })); // 깊은 복사
    sortedTime.sort((a, b) => parseInt(a.FCST_PPLTN_MAX) - parseInt(b.FCST_PPLTN_MAX));
    return sortedTime;
  }, [place.population.FCST_PPLTN])[0]
    .FCST_TIME.split(' ')[1]
    .split(':')[0];

  const ageGroups = ['10', '20', '30', '40', '50', '60'];
  const data = [
    {
      label: '연령별 비율',
      ...ageGroups.reduce((acc, age) => {
        acc[`PPLTN_RATE_${age}`] = parseFloat(place.population[`PPLTN_RATE_${age}`]);
        return acc;
      }, {}),
    },
  ];

  return (
    <div className={styles.detailListCard}>
      <ListCard place={place} age={age} />
      <p className={styles.leastTime}>
        <strong>{leastTime}</strong>시에 가장 한적해요!
      </p>
      <BarGraph data={data} />
      <div>닫기 버튼</div>
    </div>
  );
};

DetailListCard.propTypes = {
  place: PropTypes.shape({
    area_nm: PropTypes.string.isRequired,
    area_congest_num: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    population: PropTypes.shape({
      AREA_CONGEST_MSG: PropTypes.string.isRequired,
      MALE_PPLTN_RATE: PropTypes.string.isRequired,
      FEMALE_PPLTN_RATE: PropTypes.string.isRequired,
      FCST_PPLTN: PropTypes.arrayOf(
        PropTypes.shape({
          FCST_PPLTN_MAX: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    area_congest_lvl: PropTypes.string.isRequired,
  }).isRequired,
  age: PropTypes.number.isRequired,
};

export default DetailListCard;
