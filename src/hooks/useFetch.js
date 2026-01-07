import { useEffect, useState } from "../core/MyReact";

/**
 * 데이터페칭 트랜잭션 관리 훅
 * @param {any} defaultData 데이터 기본 값
 * @param {async () => void} fetchFunc 페칭함수
 * @param {(data:any) => void} onSuccess 페칭 성공 시 수행할 함수
 * @param {(error:unknown) => void} onError 페칭 실패 시 수행할 함수
 * @returns
 */
function useFetch({ defaultData = null, fetchFunc = async () => {}, onSuccess = () => {}, onError = () => {}, key }) {
  if (!key) {
    throw new Error("useFetch key is can not be empty. key: ", key);
  }
  const [trigger, setTrigger] = useState(`use-fetch-trigger-${key}`, 0);
  const [isLoading, setIsLoading] = useState(`use-fetch-is-loading-${key}`, false);
  const [data, setData] = useState(`use-fetch-data-${key}`, defaultData);

  useEffect(() => {
    const fetchAction = async () => {
      try {
        setIsLoading(true);
        const data = await fetchFunc();
        setData(data);
        if (typeof onSuccess === "function") {
          onSuccess(data);
        }
      } catch (e) {
        console.error(e);
        if (typeof onError === "function") {
          onError(e);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchAction();
  }, [trigger, "from useFetch"]);

  return {
    isLoading,
    data,
    setTrigger,
  };
}

export { useFetch };
