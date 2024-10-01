import styles from './Welcome.module.scss';
import useStore from '../../store';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Welcome = () => {
  const { savedUserInfo, setSavedUserInfo, placeDetailInfo } = useStore();
  const location = useLocation();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setSavedUserInfo(JSON.parse(storedUserInfo));
    }
  }, [setSavedUserInfo]);

  const welcomeMsgFactory = () => {
    if (placeDetailInfo) {
      return {
        front: '',
        strong: placeDetailInfo.AREA_NM,
        back: '은 지금!',
        desc: '가장 한산한 시간대를 확인해보세요!',
      };
    } else if (location.pathname === '/mypage') {
      return {
        front: ``,
        strong: `${savedUserInfo.name}님이 `,
        back: `찜한 목록이에요!`,
        desc: `저희가 한눈에 보실 수 있도록 모아봤어요!`,
      };
    } else if (savedUserInfo) {
      return {
        front: `${savedUserInfo.name}님! 현재 ${savedUserInfo.age}대에게 `,
        strong: `인기가 많은 `,
        back: `곳이에요!`,
        desc: `저희가 한눈에 보실 수 있도록 모아봤어요!`,
      };
    } else {
      return {
        front: `현재 가장 `,
        strong: `인기가 많은 `,
        back: `곳이에요!`,
        desc: '저희가 한눈에 보실 수 있도록 모아봤어요!',
      };
    }
  };
  const { front, strong, back, desc } = welcomeMsgFactory();

  return (
    <div className={styles.welcomeCon}>
      <h2>
        {front}
        <strong>{strong}</strong>
        {back}
      </h2>
      <span>{desc}</span>
    </div>
  );
};

export default Welcome;
