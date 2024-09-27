import React from 'react';
import styles from './ListCard.module.scss';

const ListCard = () => {
  return (
    <div className={styles.listCard}>
      <div className={styles.listCardImg}>
        {/* // 이미지는 제목을 받아서 URL로 찍으면 됨 */}
        <img src='/dummyImg.svg' alt='' />
      </div>
      <div className={styles.detailInfo}>
        {/* // 여기는 제목이 될 거고 */}
        <h3 className={styles.title}>광화문 광장</h3>
        <div className={styles.location}>
          <div className={styles.locationIcon}>
            <img src='/locationIcon.svg' alt='' />
          </div>
          {/* // TODO: 위치는 인자로 바로 받지 못하므로 생각해야 함 */}
          <p>서울특별시 종로구 세종대로 172 (세종로)</p>
        </div>
        <p className={styles.desc}>
          {/* // 이것도 api에서 제공하는 정보 */}
          사람들이 몰려있을 가능성이 크고 붐빈다고 느낄 수 있어요. 인구밀도가 높은 구간에서는 도보
          이동시 부딪힘이 발생할 수 있어요.
        </p>
        <div className={styles.genderRatio}>
          <div className={styles.maleRatio}>
            <div className={styles.maleIcon}>
              <img src='/maleIcon.jpg' alt='' />
            </div>
            {/* // 이것도 api 제공 정보 */}
            <span>50.0</span>
          </div>
          <div className={styles.femaleRatio}>
            <div className={styles.femaleIcon}>
              <img src='/femaleIcon.jpg' alt='' />
            </div>
            {/* // 이것도 api 제공 정보 */}
            <span>50.0</span>
          </div>
        </div>
        <div className={styles.conditionCon}>
          {/* // 이것도 api가 제공하는 정보 */}
          <span className={styles.density}>매우 혼잡</span>
          {/* // TODO 이건 10대부터 60대까지 계산해서 넣으면 됨 
          // api가 제공하는 정보임*/}
          <span className={styles.age}>20대한테 인기 많아요</span>
        </div>
      </div>
      <div>
        <img src='/likeIcon.svg' alt='' />
      </div>
    </div>
  );
};

// TODO: 116개의 도시 데이터를 어떻게 바인딩할까..
// 1. 인구데이터만 있는 것을 기반으로 정렬 후 뽑힌 장소만 API 호출

export default ListCard;
