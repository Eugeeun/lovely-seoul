import PropTypes from 'prop-types';
import styles from './Popup.module.scss';

const PopupEvent = ({ info, handleClose }) => {
  return (
    <div className={`${styles.popupCard} ${styles.wide}`}>
      <div className={styles.popupCardImg}>
        <img src={info.THUMBNAIL} alt={info.EVENT_NM} />
      </div>
      <span className={styles.popupTitle}>{info.EVENT_NM}</span>
      <a href={info.URL} className={styles.outerLink} target='blank'></a>
      <button className={styles.closeBtn} onClick={handleClose}>
        닫기
      </button>
    </div>
  );
};

PopupEvent.propTypes = {
  info: PropTypes.shape({
    THUMBNAIL: PropTypes.string.isRequired,
    EVENT_NM: PropTypes.string.isRequired,
    URL: PropTypes.string.isRequired,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default PopupEvent;
