import { useEffect } from "../core/MyReact";

/**
 * debounce 훅
 * @param {()=>void} callback 디바운스 적용할 함수
 * @param {number} delay 디바운스 딜레이 타임
 */
function useDebounce(callback, delay = 100) {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, []);
}

export { useDebounce };
