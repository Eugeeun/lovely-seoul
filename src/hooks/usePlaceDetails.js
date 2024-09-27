import { useEffect } from 'react';
import useStore from '../store';
import { detailPlaceLists } from '../utils/detailPlaceLists';

export const usePlaceDetails = placeLists => {
  const { setDetailedPlaceLists, setLoading, setError } = useStore();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const geocoder = new window.kakao.maps.services.Geocoder();
      try {
        const details = await detailPlaceLists(placeLists, geocoder);
        setDetailedPlaceLists(details);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (placeLists) {
      fetchDetails();
    }
  }, [placeLists, setDetailedPlaceLists, setLoading, setError]);
};
