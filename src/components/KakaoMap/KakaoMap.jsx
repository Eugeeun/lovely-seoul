import React from 'react';
import { Map } from 'react-kakao-maps-sdk';
import styles from './KakaoMap.module.scss';

const centerOfSeoul = {
  lat: 37.5665,
  lng: 126.978,
};

function KakaoMap(props) {
  return <Map center={centerOfSeoul} level={8} className={styles.kakoMap} />;
}

export default KakaoMap;
