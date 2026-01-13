/**
 * 로컬스토리지 추상화 함수
 * @param {string} key - 스토리지 키
 * @param {Storage} storage - 기본값은 localStorage
 * @returns {Object} { get, set, reset }
 */

export const createStorage = (key, storage = window.localStorage) => {
  const get = () => {
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`${key}는 존재하지 않는 키입니다.`, error);
    }
  };
  const set = (value) => {
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`${key}에 값을 저장하는데 실패했습니다.`, error);
    }
  };

  const reset = () => {
    try {
      storage.removeItem(key);
    } catch (error) {
      console.error(`${key}에 값을 삭제하는데 실패했습니다.`, error);
    }
  };
  return { get, set, reset };
};
