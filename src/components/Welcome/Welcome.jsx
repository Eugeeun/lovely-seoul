import styles from './Welcome.module.scss';
import useStore from '../../store';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getItem } from '../../utils/localStorageUtils';

const Welcome = () => {
  const { savedUserInfo, setSavedUserInfo, placeDetailInfo, savedSearchTerm } = useStore();
  const location = useLocation();

  /**
   * 로컬스토리지에 유저가 저장되어있다면 상태 업데이트
   */
  useEffect(() => {
    const storedUserInfo = getItem('userInfo');
    if (storedUserInfo) setSavedUserInfo(storedUserInfo);
  }, [setSavedUserInfo]);

  /**
   * 현재 상태에 따른 Welcome 메세지 변화
   */
  const getMessage = () => {
    if (location.pathname === '/detailpage' && placeDetailInfo) {
      return {
        front: '',
        strong: placeDetailInfo.AREA_NM,
        back: '은 지금!',
        desc: '주변 장소들도 확인해보세요!',
      };
    }
    if (location.pathname === '/mypage') {
      return {
        front: '',
        strong: `${savedUserInfo?.name}님이 `,
        back: '찜한 목록이에요!',
        desc: '저희가 한눈에 보실 수 있도록 모아봤어요!',
      };
    }
    if (location.pathname === '/searchpage') {
      return {
        front: '',
        strong: `${savedSearchTerm}(으)로 `,
        back: '검색한 결과에요!',
        desc: '저희가 한눈에 보실 수 있도록 모아봤어요!',
      };
    }

    const userGreeting = savedUserInfo
      ? `${savedUserInfo.name}님! 현재 ${savedUserInfo.age}대에게  `
      : `현재 가장 `;
    return {
      front: userGreeting,
      strong: '인기가 많은 ',
      back: '곳이에요!',
      desc: '해당 장소에 인기 있는 연령대와 차이가 있을 수 있어요',
    };
  };

  const { front, strong, back, desc } = getMessage();

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
