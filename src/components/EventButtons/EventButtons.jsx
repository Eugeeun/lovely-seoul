import React from 'react';
import styles from './EventButtons.module.scss';

const EventButtons = ({ setShowEvents }) => {
  return (
    <div className={styles.buttonCon}>
      <button onClick={() => setShowEvents(false)} className={styles.button}>
        <img src='/place-pin.png' alt='현재 장소' />
        <span>현재 장소</span>
      </button>
      <button onClick={() => setShowEvents(true)} className={styles.button}>
        <img src='/event-pin.png' alt='주변 문화 행사' />
        <span>주변 문화 행사</span>
      </button>
    </div>
  );
};

export default EventButtons;
