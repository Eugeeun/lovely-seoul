import { useEffect, useState } from 'react';
import useStore from '../store';

// 로그인 되어있는 유저라면 그 나이대에 맞는 핫플을 맨 위로 보이게 하는 훅
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
