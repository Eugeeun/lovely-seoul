import { ResponsiveBar } from '@nivo/bar';
import { colorMapping } from './color';
import styles from './BarGraph.module.scss';
import PropTypes from 'prop-types';

const BarGraph = ({ data }) => {
  return (
    <div className={styles.barGraphCon}>
      <div className={styles.barGraph}>
        <ResponsiveBar
          data={data}
          keys={['10대', '20대', '30대', '40대', '50대', '60대']}
          indexBy='label'
          layout='horizontal' // 가로 방향
          colors={({ id }) => colorMapping[id]} // 색상 매핑
          axisBottom={{
            tickValues: [],
          }}
        />
      </div>

      <div className={styles.colorCon}>
        {Object.keys(colorMapping).map(key => (
          <div key={key} className={styles.colorInfo}>
            <div
              className={styles.colorBox}
              style={{
                backgroundColor: colorMapping[key],
              }}
            />
            <span>{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

BarGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      '10대': PropTypes.number.isRequired,
      '20대': PropTypes.number.isRequired,
      '30대': PropTypes.number.isRequired,
      '40대': PropTypes.number.isRequired,
      '50대': PropTypes.number.isRequired,
      '60대': PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BarGraph;
