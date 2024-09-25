import { useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import styles from './KakaoMap.module.scss';
import zoomInImage from '/zoom-in.svg'; // 줌 인 이미지 경로
import zoomOutImage from '/zoom-out.svg'; // 줌 아웃 이미지 경로

const centerOfSeoul = {
  lat: 37.5665,
  lng: 126.978,
};

const KakaoMap = props => {
  const [level, setLevel] = useState(8);

  const zoomIn = () => {
    setLevel(prevLevel => Math.max(prevLevel - 1, 1)); // 최소 레벨 1
  };

  const zoomOut = () => {
    setLevel(prevLevel => Math.min(prevLevel + 1, 14)); // 최대 레벨 14
  };

  return (
    <div>
      <Map center={centerOfSeoul} level={level} className={styles.kakoMap} />
      <div className={styles.buttonContainer}>
        <img src={zoomInImage} alt='줌 인' onClick={zoomIn} />
        <img src={zoomOutImage} alt='줌 아웃' onClick={zoomOut} />
      </div>
    </div>
  );
};

export default KakaoMap;
