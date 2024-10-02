import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styles from './KakaoMap.module.scss';
import zoomInImage from '/zoom-in.svg';
import zoomOutImage from '/zoom-out.svg';
import PropTypes from 'prop-types';
import useStore from '../../store';
import Popup from '../Popup/Popup';
import PopupEvent from '../Popup/PopupEvent';
import PlaceMarker from '../PlaceMarker/PlaceMarker';
import EventMarker from '../EventMarker/EventMarker';
import useEventLists from '../../hooks/useEventLists';
import { useNavigate } from 'react-router-dom';

const KakaoMap = ({ placeLists }) => {
  const { mapCenter, setMapCenter, mapLevel, setMapLevel } = useStore();
  const { selectedPlace, setSelectedPlace, clearSelectedPlace } = useStore();
  const { selectedEvent, setSelectedEvent, clearSelectedEvent } = useStore();
  const { placeDetailInfo, fetchEventLists } = useEventLists();
  const navigate = useNavigate();

  const zoomIn = () => setMapLevel(Math.max(mapLevel - 1, 1));
  const zoomOut = () => setMapLevel(Math.min(mapLevel + 1, 14));

  /**
   * 마커를 클릭하면 해당 장소로 업데이트
   * 마커를 중앙으로 이동하고 화면을 키움
   * 마커 주변의 문화 행사를 업데이트
   * detailpage로 이동
   */
  const handlePlaceMarkerClick = marker => {
    clearSelectedEvent();
    setSelectedPlace(marker);
    setMapLevel(2);
    setMapCenter({ lat: marker.x, lng: marker.y });
    fetchEventLists(marker);
    navigate('/detailpage');
  };

  return (
    <div>
      <Map center={mapCenter} level={mapLevel} className={styles.kakoMap}>
        {placeLists.map((marker, i) => (
          <PlaceMarker key={i} marker={marker} onClick={() => handlePlaceMarkerClick(marker)} />
        ))}

        {placeDetailInfo?.EVENT_STTS.map((marker, i) => (
          <EventMarker key={i} marker={marker} onClick={() => setSelectedEvent(marker)} />
        ))}

        {selectedPlace && (
          <CustomOverlayMap position={{ lat: selectedPlace.x, lng: selectedPlace.y }}>
            <Popup title={selectedPlace.area_nm} handleClose={clearSelectedPlace} />
          </CustomOverlayMap>
        )}

        {selectedEvent && (
          <CustomOverlayMap position={{ lat: selectedEvent.EVENT_Y, lng: selectedEvent.EVENT_X }}>
            <PopupEvent info={selectedEvent} handleClose={clearSelectedEvent} />
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
