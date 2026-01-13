import { createObserver } from "./createObserver";

/** FLUX 패턴
 * @param {Function} reducer - (state, action) => newState 형태의 reducer 함수
 * @param {*} initialState - 초기 상태
 * @returns {Object} { getState, dispatch, subscribe }
 */
// reducer를 실행시키는 곳
export const createStore = (reducer, initialState) => {
  const { subscribe, notify } = createObserver();

  let state = initialState;

  const getState = () => state;

  const dispatch = (action) => {
    const newState = reducer(state, action);
    if (newState !== state) {
      state = newState;
      notify();
    }
  };

  return { getState, dispatch, subscribe };
};
