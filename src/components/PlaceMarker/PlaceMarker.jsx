import { MapMarker } from 'react-kakao-maps-sdk';
import PropTypes from 'prop-types';

const PlaceMarker = ({ marker, onClick }) => (
  <MapMarker
    position={{ lat: marker.x, lng: marker.y }}
    title={marker.area_nm}
    image={{
      src: '/place-pin.png',
      size: { width: 28, height: 35 },
    }}
    onClick={onClick}
  />
);

PlaceMarker.propTypes = {
  marker: PropTypes.shape({
    x: PropTypes.string.isRequired,
    y: PropTypes.string.isRequired,
    area_nm: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PlaceMarker;
