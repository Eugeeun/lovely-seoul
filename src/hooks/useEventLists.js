import ky from 'ky';
import useStore from '../store';

// 선택된 마커의 상세정보를 받아오는 훅
const useEventLists = () => {
  const { placeDetailInfo, setPlaceDetailInfo } = useStore();

  const fetchEventLists = async marker => {
    const apiUrl = `/api/fetchEventLists?areaName=${marker.area_nm}`;
    try {
      const data = await ky.get(apiUrl).json();
      setPlaceDetailInfo(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return { placeDetailInfo, fetchEventLists };
};

export default useEventLists;
