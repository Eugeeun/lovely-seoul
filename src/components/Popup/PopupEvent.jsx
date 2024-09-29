import React from 'react';
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

export default PopupEvent;
