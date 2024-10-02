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

  const handleSubmit = e => {
    e.preventDefault();
    setSavedSearchTerm(searchTerm);
    navigate('/searchpage');
    setSearchTerm('');
  };

  const handleLogoClick = () => {
    navigate('/');
    setSelectedPlace(null);
    setPlaceDetailInfo(null);
    setMapCenter({ lat: 37.5665, lng: 126.978 });
    setMapLevel(6);
  };

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
