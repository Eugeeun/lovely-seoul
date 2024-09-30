import React from 'react';
import styles from './Popup.module.scss';

const Popup = ({ title, handleClose }) => {
  return (
    <div className={styles.popupCard}>
      <div className={styles.popupCardImg}>
        <img src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${title}.jpg`} alt={title} />
      </div>
      <span className={styles.popupTitle}>{title}</span>
      <button className={`${styles.closeBtn} ${styles.bottom}`} onClick={handleClose}>
        닫기
      </button>
    </div>
  );
};

export default Popup;
