import { MapMarker } from 'react-kakao-maps-sdk';
import PropTypes from 'prop-types';

const EventMarker = ({ marker, onClick }) => (
  <MapMarker
    position={{ lat: marker.EVENT_Y, lng: marker.EVENT_X }}
    title={marker.EVENT_NM}
    image={{
      src: '/event-pin.png',
      size: { width: 28, height: 35 },
    }}
    onClick={onClick}
  />
);

EventMarker.propTypes = {
  marker: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EventMarker;
