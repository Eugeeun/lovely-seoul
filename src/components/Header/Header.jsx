import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import useStore from '../../store';

const Header = ({ handleMatchedData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { setSelectedPlace, setPlaceDetailInfo } = useStore();

  const handleInputChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(searchTerm);
  };

  const handleLogoClick = e => {
    console.log('logo clicked!');
    navigate('/');
    setSelectedPlace(null);
    setPlaceDetailInfo(null);
    handleMatchedData(null);
  };

  // TODO
  // 카카오맵 서울시청을 중앙으로
  // 오버레이 닫기

  // TODO
  // 마이페이지 기능 추가

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
      <div className={styles.likeBtnCon} onClick={() => navigate('/mypage')}>
        <div className={styles.likeBtn}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12.5098 20.8101C12.1807 20.9301 11.6388 20.9301 11.3097 20.8101C8.50317 19.8201 2.23193 15.6901 2.23193 8.6901C2.23193 5.6001 4.64171 3.1001 7.61281 3.1001C9.37418 3.1001 10.9323 3.9801 11.9098 5.3401C12.8872 3.9801 14.455 3.1001 16.2067 3.1001C19.1778 3.1001 21.5876 5.6001 21.5876 8.6901C21.5876 15.6901 15.3164 19.8201 12.5098 20.8101Z'
              stroke='#ffffff'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <span>MY</span>
      </div>
    </div>
  );
};

export default Header;
