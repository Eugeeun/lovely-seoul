import { useMemo, useState } from 'react';
import ListCard from './ListCard';
import PropTypes from 'prop-types';
import styles from './ListCard.module.scss';
import BarGraph from '../BarGraph/BarGraph';
import useStore from '../../store';

const DetailListCard = ({ place, defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { setMapCenter, setMapLevel } = useStore();

  const leastTime = useMemo(() => {
    const sortedTime = place.population.FCST_PPLTN.map(item => ({ ...item }));
    sortedTime.sort((a, b) => parseInt(a.FCST_PPLTN_MAX) - parseInt(b.FCST_PPLTN_MAX));
    return sortedTime[0].FCST_TIME.split(' ')[1].split(':')[0];
  }, [place.population.FCST_PPLTN]);

  // 연령대 비율 계산
  const ageGroups = ['10', '20', '30', '40', '50', '60'];
  const agePercentages = ageGroups.map(age => parseFloat(place.population[`PPLTN_RATE_${age}`]));

  // 가장 높은 비율의 연령대 찾기
  const maxAgeIndex = agePercentages.indexOf(Math.max(...agePercentages));
  const maxAgeGroup = ageGroups[maxAgeIndex];

  const data = [
    {
      label: '연령별 비율',
      ...ageGroups.reduce((acc, age) => {
        acc[`PPLTN_RATE_${age}`] = agePercentages[ageGroups.indexOf(age)];
        return acc;
      }, {}),
    },
  ];

  const handleClick = () => {
    setIsOpen(true);
    if (!isOpen) {
      setMapCenter({
        lat: place.x,
        lng: place.y,
      });
      setMapLevel(2);
    }
  };

  console.log(place);

  return (
    <div className={styles.detailListCard}>
      <ListCard place={place} age={maxAgeGroup} handleClick={handleClick} />
      {isOpen && (
        <>
          <div className={styles.leastTimeCon}>
            <p className={styles.leastTime}>
              <strong>{leastTime}</strong>시에 가장 한적해요!
            </p>
          </div>
          <BarGraph data={data} />
          <div
            className={styles.closeUpBtn}
            onClick={() => {
              console.log('clicked!');
              setIsOpen(false);
            }}
          >
            <img src='/closeUpBtn.svg' alt='' />
          </div>
        </>
      )}
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
      PPLTN_RATE_10: PropTypes.string.isRequired,
      PPLTN_RATE_20: PropTypes.string.isRequired,
      PPLTN_RATE_30: PropTypes.string.isRequired,
      PPLTN_RATE_40: PropTypes.string.isRequired,
      PPLTN_RATE_50: PropTypes.string.isRequired,
      PPLTN_RATE_60: PropTypes.string.isRequired,
    }).isRequired,
    area_congest_lvl: PropTypes.string.isRequired,
  }).isRequired,
  defaultOpen: PropTypes.bool,
};

export default DetailListCard;
