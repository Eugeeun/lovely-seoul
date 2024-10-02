import KakaoMap from './components/KakaoMap/KakaoMap';
import useFetch from './hooks/useFetch';
import Loading from './components/Loading/Loading';
import useStore from './store';
import { useEffect } from 'react';
import styles from './App.module.scss';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import { Routes, Route } from 'react-router-dom';
import MyPage from './pages/MyPage/MyPage';
import DetailPage from './pages/DetailPage/DetailPage';
import MainPage from './pages/MainPage/MainPage';
import SearchPage from './pages/SearchPage/SearchPage';
import useMaxVisitPlaces from './hooks/useMaxVisitPlaces';

const getAllPlaceListUrl =
  'https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=1&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=all&sort=true';

function App() {
  const { data: placeLists, error, isLoading } = useFetch(getAllPlaceListUrl);
  const { isLoginModalOpen, setIsLoginModalOpen } = useStore();

  useEffect(() => {
    setIsLoginModalOpen(!localStorage.getItem('userInfo'));
  }, []);

  useMaxVisitPlaces(placeLists);

  if (isLoading) return <Loading loading={true} />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.app}>
      <Header handleModalOpen={setIsLoginModalOpen} />
      <div className={styles.contentsCon}>
        <div className={styles.listCon}>
          <Welcome />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/detailpage' element={<DetailPage />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/searchpage' element={<SearchPage />} />
          </Routes>
        </div>
        <div className={styles.kakaoMapCon}>
          <KakaoMap placeLists={placeLists.row} />
        </div>
      </div>
      {isLoginModalOpen && (
        <div className={styles.loginCon}>
          <Login
            handleClose={() => {
              setIsLoginModalOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
