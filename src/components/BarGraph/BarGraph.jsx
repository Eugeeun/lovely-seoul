import { ResponsiveBar } from '@nivo/bar';
import { colorMapping } from './color';
import styles from './BarGraph.module.scss';
import PropTypes from 'prop-types';

const ageGroups = ['10대', '20대', '30대', '40대', '50대', '60대'];

const BarGraph = ({ data }) => (
  <div className={styles.barGraphCon}>
    <div className={styles.barGraph}>
      <ResponsiveBar
        data={data}
        keys={ageGroups}
        indexBy='label'
        layout='horizontal'
        colors={({ id }) => colorMapping[id]}
        axisBottom={{ tickValues: [] }}
      />
    </div>
    <div className={styles.colorCon}>
      {ageGroups.map(age => (
        <div key={age} className={styles.colorInfo}>
          <div className={styles.colorBox} style={{ backgroundColor: colorMapping[age] }} />
          <span>{age}</span>
        </div>
      ))}
    </div>
  </div>
);

BarGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      ...Object.fromEntries(ageGroups.map(age => [age, PropTypes.number.isRequired])),
    })
  ).isRequired,
};

export default BarGraph;
