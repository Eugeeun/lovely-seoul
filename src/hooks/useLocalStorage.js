import { useState } from 'react';

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
