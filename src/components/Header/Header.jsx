import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import useStore from '../../store';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const {
    setSelectedPlace,
    setPlaceDetailInfo,
    setMapCenter,
    setMapLevel,
    setIsLoginModalOpen,
    setSavedSearchTerm,
  } = useStore();

  const handleInputChange = e => setSearchTerm(e.target.value);

  /**
   * 빈문자로 검색하지 않는다면 searchpage로 이동
   * 검색어는 전역으로 관리 => Welcome 컴포넌트에서 사용
   * 검색창은 빈칸으로 재설정
   */
  const handleSubmit = e => {
    e.preventDefault();
    if (searchTerm.length < 1) return;
    setSavedSearchTerm(searchTerm);
    navigate('/searchpage');
    setSearchTerm('');
  };

  /**
   * 로고를 클릭하면 루트 페이지로 돌아감
   * 선택된 장소를 제거
   * 카카오맵을 중앙으로 설정
   */
  const handleLogoClick = () => {
    navigate('/');
    setSelectedPlace(null);
    setPlaceDetailInfo(null);
    setMapCenter({ lat: 37.5665, lng: 126.978 });
    setMapLevel(6);
  };

  /**
   * 로그인 되었다면 mypage로 이동
   * 로그인 되어있지 않다면 로그인 모달 오픈
   */
  const handleLikeBtnClick = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    userInfo ? navigate('/mypage') : setIsLoginModalOpen(true);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logoAndSearchCon}>
        <div className={styles.logo} onClick={handleLogoClick}>
          <img src='/logo.svg' alt='' />
        </div>
        <form onSubmit={handleSubmit}>
          <input type='text' value={searchTerm} onChange={handleInputChange} />
          <button type='submit' className={styles.searchBtn}>
            <img src='/search.svg' alt='검색' />
          </button>
        </form>
      </div>
      <div className={styles.likeBtnCon} onClick={handleLikeBtnClick}>
        <div className={styles.likeBtn}>
          <img src='/likeIcon.svg' alt='' />
        </div>
        <span>MY</span>
      </div>
    </div>
  );
};

export default Header;
