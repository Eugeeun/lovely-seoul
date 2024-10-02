import { useEffect, useState } from 'react';
import useStore from '../store';

const useSortedHotPlaceLists = () => {
  const { hotPlaceLists, savedUserInfo } = useStore();
  const [sortedHotPlaceLists, setSortedHotPlaceLists] = useState([]);

  useEffect(() => {
    setSortedHotPlaceLists(hotPlaceLists);
  }, [hotPlaceLists]);

  useEffect(() => {
    const ageGroupIndex = savedUserInfo?.age ? Math.floor(savedUserInfo.age / 10) - 1 : null;
    const newSortedHotPlaceLists = [...hotPlaceLists];

    if (ageGroupIndex !== null && ageGroupIndex < newSortedHotPlaceLists.length) {
      const [targetPlace] = newSortedHotPlaceLists.splice(ageGroupIndex, 1);
      newSortedHotPlaceLists.unshift(targetPlace);
    }

    setSortedHotPlaceLists(newSortedHotPlaceLists);
  }, [savedUserInfo, hotPlaceLists]);

  return sortedHotPlaceLists;
};

export default useSortedHotPlaceLists;
