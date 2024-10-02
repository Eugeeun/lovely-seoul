import { useState } from 'react';

/**
 * --------------------------------------------------
 * 1 컴포넌트 1 상태가 적절
 * 여러 컴포넌트가 1 상태를 공유하면 prop drilling이 일어남
 * 전역 상태 관리로 해결할 수 있지만
 * 문제점은 key를 여러개 사용하면 로컬 스토리지엔 다르게 저장되지만
 * storedValue는 계속 값이 덮어써짐
 * 그러면 이전 값을 가져올 수 없음
 *
 * => utils에 localStorageUtils를 만들어 해결
 * 여러 컴포넌트가 같은 키로 로컬스토리지에 접근 가능
 * 전역 상태처럼 사용 가능
 * --------------------------------------------------
 */

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const prevValue = localStorage.getItem(key);
      return JSON.parse(prevValue) || initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = typeof value === 'function' ? value(storedValue) : value;
      localStorage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
export default useLocalStorage;
