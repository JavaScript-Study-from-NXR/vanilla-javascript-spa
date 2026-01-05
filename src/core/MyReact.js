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

  return {
    render,
  };
}

export const { render } = MyReact();
