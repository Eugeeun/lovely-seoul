import { useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styles from './KakaoMap.module.scss';
import zoomInImage from '/zoom-in.svg';
import zoomOutImage from '/zoom-out.svg';
import PropTypes from 'prop-types';
import useStore from '../../store';
import Popup from '../Popup/Popup';

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
  const { selectedMarker, setSelectedMarker, clearSelectedMarker } = useStore();
  const [center, setCenter] = useState(centerOfSeoul);

  const zoomIn = () => {
    setLevel(prevLevel => Math.max(prevLevel - 1, 1));
  };

  const zoomOut = () => {
    setLevel(prevLevel => Math.min(prevLevel + 1, 14));
  };

  const handleMarkerClick = marker => {
    setSelectedMarker(marker);
    setLevel(2);
    setCenter({ lat: marker.x, lng: marker.y });
  };

  const handleOverlayClose = () => {
    clearSelectedMarker();
  };

  return (
    <div>
      <Map center={center} level={level} className={styles.kakoMap}>
        {placeLists.map((marker, i) => (
          <MapMarker
            key={i}
            position={{ lat: marker.x, lng: marker.y }}
            title={marker.area_nm}
            image={markerImage}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}

        {selectedMarker && (
          <CustomOverlayMap position={{ lat: selectedMarker.x, lng: selectedMarker.y }}>
            <Popup title={selectedMarker.area_nm} handleClose={handleOverlayClose} />
          </CustomOverlayMap>
        )}
      </Map>
      <div className={styles.buttonContainer}>
        <img src={zoomInImage} alt='줌 인' onClick={zoomIn} />
        <img src={zoomOutImage} alt='줌 아웃' onClick={zoomOut} />
      </div>
    </div>
  );
};

KakaoMap.propTypes = {
  placeLists: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.string.isRequired, // 위도
      y: PropTypes.string.isRequired, // 경도
      area_nm: PropTypes.string.isRequired, // 지역명
    })
  ).isRequired, // placeLists는 필수 props
};

export default KakaoMap;
