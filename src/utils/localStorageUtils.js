/**
 * 로컬 스토리지에 값을 저장하는 함수
 * @param {string} key - 저장할 키
 * @param {any} value - 저장할 값 (객체일 경우 JSON.stringify로 변환)
 */
export const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('로컬 스토리지에 저장하는 중 오류 발생:', error);
  }
};

/**
 * 로컬 스토리지에서 값을 불러오는 함수
 * @param {string} key - 불러올 키
 * @returns {any} - 불러온 값 (없으면 null 반환)
 */
export const getItem = key => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error('로컬 스토리지에서 불러오는 중 오류 발생:', error);
    return null;
  }
};

/**
 * 로컬 스토리지에서 값을 제거하는 함수
 * @param {string} key - 제거할 키
 */
export const removeItem = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('로컬 스토리지에서 제거하는 중 오류 발생:', error);
  }
};

/**
 * 로컬 스토리지의 모든 값을 제거하는 함수
 */
export const clear = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('로컬 스토리지 비우는 중 오류 발생:', error);
  }
};
