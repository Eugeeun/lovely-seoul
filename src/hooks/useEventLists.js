import ky from 'ky';
import useStore from '../store';

// 선택된 마커의 상세정보를 받아오는 훅
const useEventLists = () => {
  const { placeDetailInfo, setPlaceDetailInfo } = useStore();

  const fetchEventLists = async marker => {
    const apiUrl = `http://openapi.seoul.go.kr:8088/${
      import.meta.env.VITE_CITY_DATA_API_KEY
    }/json/citydata/1/5/${marker.area_nm}`;
    try {
      const data = await ky.get(apiUrl).json();
      setPlaceDetailInfo(data['CITYDATA']);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return { placeDetailInfo, fetchEventLists };
};

export default useEventLists;
