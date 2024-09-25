import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styles from './KakaoMap.module.scss';
import zoomInImage from '/zoom-in.svg';
import zoomOutImage from '/zoom-out.svg';

const centerOfSeoul = {
  lat: 37.5665,
  lng: 126.978,
};

const markerImage = {
  src: '/place-pin.png',
  size: { width: 24, height: 35 },
  options: {
    offset: { x: 12, y: 35 },
  },
};

const KakaoMap = ({ placeLists }) => {
  const [level, setLevel] = useState(8);

  const zoomIn = () => {
    setLevel(prevLevel => Math.max(prevLevel - 1, 1));
  };

  const zoomOut = () => {
    setLevel(prevLevel => Math.min(prevLevel + 1, 14));
  };

  return (
    <div>
      <Map center={centerOfSeoul} level={level} className={styles.kakoMap}>
        {placeLists.map((marker, i) => (
          <MapMarker
            key={i}
            position={{ lat: marker.x, lng: marker.y }}
            title={marker.area_nm}
            image={markerImage}
          />
        ))}
      </Map>
      <div className={styles.buttonContainer}>
        <img src={zoomInImage} alt='줌 인' onClick={zoomIn} />
        <img src={zoomOutImage} alt='줌 아웃' onClick={zoomOut} />
      </div>
    </div>
  );
};

export default KakaoMap;
