import { useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styles from './KakaoMap.module.scss';
import zoomInImage from '/zoom-in.svg';
import zoomOutImage from '/zoom-out.svg';
import PropTypes from 'prop-types';
import useStore from '../../store';
import Popup from '../Popup/Popup';
import ky from 'ky';
import PopupEvent from '../Popup/PopupEvent';
import PlaceMarker from '../PlaceMarker/PlaceMarker';
import EventMarker from '../EventMarker/EventMarker';

const centerOfSeoul = {
  lat: 37.5665,
  lng: 126.978,
};

const KakaoMap = ({ placeLists }) => {
  const [level, setLevel] = useState(6);
  const { selectedPlace, setSelectedPlace, clearSelectedPlace } = useStore();
  const [center, setCenter] = useState(centerOfSeoul);
  const { placeDetailInfo, setPlaceDetailInfo } = useStore();
  const { selectedEvent, setSelectedEvent, clearSelectedEvent } = useStore();

  const zoomIn = () => {
    setLevel(prevLevel => Math.max(prevLevel - 1, 1));
  };

  const zoomOut = () => {
    setLevel(prevLevel => Math.min(prevLevel + 1, 14));
  };

  const fetchEventLists = async marker => {
    const apiUrl = `http://openapi.seoul.go.kr:8088/${
      import.meta.env.VITE_CITY_DATA_API_KEY
    }/json/citydata/1/5/${marker.area_nm}`;
    try {
      const data = await ky.get(apiUrl).json();
      setPlaceDetailInfo(data['CITYDATA']);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePlaceMarkerClick = marker => {
    clearSelectedEvent();
    setSelectedPlace(marker);
    setLevel(2);
    setCenter({ lat: marker.x, lng: marker.y });
    fetchEventLists(marker);
  };

  const handleOverlayClose = () => {
    clearSelectedPlace();
  };

  const handleEventMarkerClick = marker => {
    setSelectedEvent(marker);
  };

  const handleMapClick = e => {
    if (selectedEvent) {
      clearSelectedEvent();
    }
  };

  return (
    <div>
      <Map center={center} level={level} className={styles.kakoMap} onClick={handleMapClick}>
        {placeLists.map((marker, i) => (
          <PlaceMarker key={i} marker={marker} onClick={() => handlePlaceMarkerClick(marker)} />
        ))}

        {placeDetailInfo &&
          placeDetailInfo['EVENT_STTS'].map((marker, i) => (
            <EventMarker key={i} marker={marker} onClick={() => handleEventMarkerClick(marker)} />
          ))}

        {selectedPlace && (
          <CustomOverlayMap position={{ lat: selectedPlace.x, lng: selectedPlace.y }}>
            <Popup title={selectedPlace.area_nm} handleClose={handleOverlayClose} />
          </CustomOverlayMap>
        )}

        {selectedEvent && (
          <CustomOverlayMap position={{ lat: selectedEvent.EVENT_Y, lng: selectedEvent.EVENT_X }}>
            <PopupEvent info={selectedEvent} />
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
      x: PropTypes.string.isRequired,
      y: PropTypes.string.isRequired,
      area_nm: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default KakaoMap;
