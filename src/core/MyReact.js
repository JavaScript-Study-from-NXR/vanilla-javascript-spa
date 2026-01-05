function MyReact() {
  /**
   * 컴포넌트 상태 관리용 옵션 객체
   * state: 컴포넌트 상태를 저장할 배열 - any[]
   * currentStateKey: 현재 상태 키 - number
   * rootComponent: 렌더링할 루트 컴포넌트 함수 - () => string || null
   * root: 실제 DOM에 렌더링할 루트 요소 - HTMLElement | null
   */
  const _options = {
    states: [],
    currentStateKey: 0,
    rootComponent: null,
    root: null,
  };

  /**
   * 실제 렌더링 함수
   * root에 rootElement 함수에서 반환된 내용을
   */
  const _render = () => {
    const { root, rootComponent } = _options;
    if (!root || !rootComponent) return;
    root.innerHTML = rootComponent();
  };

  /**
   * 렌더링 트리거 함수
   * @param {()=>string} rootComponent - 루트에 렌더링할 컴포넌트 함수
   * @param {HTMLElement} root - 실제 DOM에 렌더링할 루트 요소
   */
  const render = (rootComponent, root) => {
    _options.rootComponent = rootComponent;
    _options.root = root;
    _render();
  };

  /**
   * 상태 관리 훅
   * @param {any} initialValue
   * @returns {[any, (newValue:any)=>void} 상태 값과 상태 변경 함수 반환
   * @example {
   *  const [count, setCount] = useState(0);
   * }
   */
  const useState = (initialValue) => {
    const { states, currentStateKey: key } = _options;
    const state = states[key];

    if (states.length === key) {
      if (typeof initialValue === "function") {
        states.push(initialValue());
      } else {
        states.push(initialValue);
      }
    }
    const setState = (newValue) => {
      states[key] = newValue;
      _render();
    };
    _options.currentStateKey++;
    return [state, setState];
  };

  return {
    render,
    useState,
  };
}

export const { render, useState } = MyReact();
