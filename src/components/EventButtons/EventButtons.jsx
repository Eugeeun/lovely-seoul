import PropTypes from 'prop-types';
import styles from './EventButtons.module.scss';

const buttons = [
  { label: '현재 장소', imgSrc: '/place-pin.png', onClick: false },
  { label: '주변 문화 행사', imgSrc: '/event-pin.png', onClick: true },
];

const EventButtons = ({ setShowEvents }) => (
  <div className={styles.buttonCon}>
    {buttons.map(({ label, imgSrc, onClick }) => (
      <button key={label} onClick={() => setShowEvents(onClick)} className={styles.button}>
        <img src={imgSrc} alt={label} />
        <span>{label}</span>
      </button>
    ))}
  </div>
);

EventButtons.propTypes = {
  setShowEvents: PropTypes.func.isRequired,
};

export default EventButtons;
