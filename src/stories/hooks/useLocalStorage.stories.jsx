import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

export const useLocalStorageHook = () => {
  const [name, setName] = useState('');
  const [storedName, setStoredName] = useLocalStorage('name', '');

  const handleChange = e => {
    setName(e.target.value);
  };

  const handleClick = () => {
    setStoredName(name);
  };

  return (
    <div>
      <label>
        이름:
        <input type='text' value={name} onChange={handleChange} />
      </label>
      <button onClick={handleClick}>저장</button>
      <p>저장된 이름: {storedName}</p>
    </div>
  );
};

export default {
  title: 'Hooks/useLocalStorage',
  component: useLocalStorageHook,
};
