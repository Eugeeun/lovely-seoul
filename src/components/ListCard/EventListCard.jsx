import PropTypes from 'prop-types';
import styles from './ListCard.module.scss';

const EventListCard = ({ event }) => {
  return (
    <div className={`${styles.listCard} ${styles.shadow}`} style={{ cursor: 'default' }}>
      <div className={styles.listCardImg}>
        <img src={event.THUMBNAIL} alt='' />
      </div>
      <div className={`${styles.detailInfo} ${styles.eventStyle}`}>
        <h3 className={styles.title}>{event.EVENT_NM}</h3>
        <div className={styles.location}>
          <div className={styles.locationIcon}>
            <img src='/locationIcon.svg' alt='' />
          </div>
          <p>{event.EVENT_PLACE}</p>
        </div>
        <div className={styles.date}>
          <div className={styles.dateIcon}>
            <img src='/dateIcon.svg' alt='' />
          </div>
          <p>{event.EVENT_PERIOD}</p>
        </div>
      </div>
      <a className={styles.lookUp} href={event.URL} target='blank'>
        <span>자세히보기</span>
        <div>
          <img src='/detailBtn.png' alt='' />
        </div>
      </a>
      <div style={{ width: '24px' }}></div>
    </div>
  );
};

EventListCard.propTypes = {
  event: PropTypes.shape({
    THUMBNAIL: PropTypes.string.isRequired,
    EVENT_NM: PropTypes.string.isRequired,
    EVENT_PLACE: PropTypes.string.isRequired,
    EVENT_PERIOD: PropTypes.string.isRequired,
    URL: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventListCard;
