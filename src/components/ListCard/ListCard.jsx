import React from 'react';
import styles from './ListCard.module.scss';

const ListCard = () => {
  return (
    <div className={styles.listCard}>
      <div className={styles.listCardImg}>
        <img src='/dummyImg.svg' alt='' />
      </div>
      <div className={styles.detailInfo}>
        <h3 className={styles.title}>광화문 광장</h3>
        <div className={styles.location}>
          <div className={styles.locationIcon}>
            <img src='/locationIcon.svg' alt='' />
          </div>
          <p>서울특별시 종로구 세종대로 172 (세종로)</p>
        </div>
        <p className={styles.desc}>
          사람들이 몰려있을 가능성이 크고 붐빈다고 느낄 수 있어요. 인구밀도가 높은 구간에서는 도보
          이동시 부딪힘이 발생할 수 있어요.
        </p>
        <div className={styles.genderRatio}>
          <div className={styles.maleRatio}>
            <div className={styles.maleIcon}>
              <img src='/maleIcon.jpg' alt='' />
            </div>
            <span>50.0</span>
          </div>
          <div className={styles.femaleRatio}>
            <div className={styles.femaleIcon}>
              <img src='/femaleIcon.jpg' alt='' />
            </div>
            <span>50.0</span>
          </div>
        </div>
        <div className={styles.conditionCon}>
          <span className={styles.density}>매우 혼잡</span>
          <span className={styles.age}>20대한테 인기 많아요</span>
        </div>
      </div>
      <div>
        <img src='/likeIcon.svg' alt='' />
      </div>
    </div>
  );
};

export default ListCard;
