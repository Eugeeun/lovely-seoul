import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { colorMapping } from './color';
import styles from './BarGraph.module.scss';

const BarGraph = ({ data }) => {
  return (
    <div className={styles.barGraphCon}>
      <div className={styles.barGraph}>
        <ResponsiveBar
          data={data}
          keys={[
            'PPLTN_RATE_10',
            'PPLTN_RATE_20',
            'PPLTN_RATE_30',
            'PPLTN_RATE_40',
            'PPLTN_RATE_50',
            'PPLTN_RATE_60',
          ]}
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
            <span>{key.replace('PPLTN_RATE_', '')}대</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarGraph;
