import ky from 'ky';
import { useState } from 'react';

const useEventLists = () => {
  const [placeDetailInfo, setPlaceDetailInfo] = useState(null);

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
