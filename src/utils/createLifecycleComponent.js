/**
 * 팩토리 함수 (config를 기반으로 객체를 만들어서 반환)
 * @param {Object} lifecycle - 생명주기 설정 : 언제 뭐할래?
 * @param {Function} renderFn - 렌더 함수 : 화면에 렌더링 할 HTML 생성
 */

// 얕은 비교 함수
const shallowEqual = (a, b) => {
  if (Object.is(a, b)) return true;
  // 객체나 배열이 아닌 경우 false
  if (typeof a !== "object" || a !== null || typeof b !== "object" || b !== null) {
    return false;
  }
  // 각 키 값 뽑아옴
  const keyA = Object.keys(a);
  const keyB = Object.keys(b);
  if (keyA.length !== keyB.length) return false;
  return keyA.every((key) => Object.is(a[key], b[key]));
};
export function createLifecycleComponent(lifecycle, renderFn) {
  const { mount, watchs = [], unmount } = lifecycle;
  // 이전 값들을 기억할 수 있는 Map 생성 (배열보다 빠르게 찾을 수 있음)
  let previousValues = new Map();
  // 화면에 나타나 있는지 여부 체크 (false -> 첫 마운트)
  let isMounted = false;

  return {
    // 컴포넌트 마운트 : 처음 마운트 되었을 떄 설정
    // render : 화면 그리기
    render() {
      const html = renderFn(); // 인자로 받아온 renderFn 실행 : 반환값은 html - 저장만 함 (실제돔 반영 X)

      // 첫 마운트 시 (의존성 배열) - 실제 돔 반영하는중
      if (!isMounted && mount) {
        setTimeout(() => {
          // 하던 작업이 있다면 마무리 후 실행 (돔에 추가한 다음에 mount)
          mount();
          isMounted = true; // 마운트 됐다.
        }, 0);
      }
      // 감지할 목록 리스트 (useEffect) - 의존성 배열 체킹해서 previous값 관리해 (바꼇으면 콜백 실행)
      watchs.forEach((watch, index) => {
        const { target, callback, compare = shallowEqual } = watch;
        const currentValue = target();
        const previousValue = previousValues.get(index);

        if (previousValue !== undefined && !compare(currentValue, previousValue)) {
          setTimeout(() => callback(), 0); // 변경 확인 됐으니까 콜백 실행해
        }
        // 값 바뀌엇으면 previousValues 배열도 업데이트 해야함
        previousValues.set(index, currentValue);
      });
      return html; // 이제 리턴 (UI 반영)
    },
    // 컴포넌트 언마운트
    // destroy
    destroy() {
      if (unmount) {
        unmount();
      }
      isMounted = false;
      previousValues.clear();
    },
  };
}
