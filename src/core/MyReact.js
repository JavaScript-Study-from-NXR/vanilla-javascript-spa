import { debounceFrame } from "../utils";

function MyReact() {
  /**
   * 컴포넌트 상태 관리용 옵션 객체
   * == 상태 관련 ==
   * state: 컴포넌트 상태를 저장할 배열 - any[]
   * currentStateKey: 현재 상태 키 - number
   * == 렌더링 관련 ==
   * renderCount: 렌더링 횟수 - number
   * rootComponent: 렌더링할 루트 컴포넌트 함수 - () => string || null
   * root: 실제 DOM에 렌더링할 루트 요소 - HTMLElement | null
   * == 부수효과 관련 ==
   * effectDeps: 부수효과 의존성 배열 - any[][]
   * effectCleanups: 부수효과 정리 함수 배열 - (function | undefined)[]
   * pendingEffects: 렌더링 후 실행할 부수효과 함수 배열 - function[]
   * currentEffectKey: 현재 부수효과 키 - number
   */
  const _options = {
    //  == 상태 관련 ==
    states: [],
    currentStateKey: 0,
    //  == 렌더링 관련 ==
    rootComponent: null,
    renderCount: -1,
    root: null,
    //  == 부수효과 관련 ==
    effectDeps: [],
    effectCleanups: [],
    pendingEffects: [],
    currentEffectKey: 0,
  };

  /**
   * 실제 렌더링 함수
   * root에 rootElement 함수에서 반환된 내용을
   */
  const _render = debounceFrame(() => {
    const { root, rootComponent } = _options;
    if (!root || !rootComponent) return;
    root.innerHTML = rootComponent();
    _options.currentStateKey = 0;
    _options.renderCount++;
    console.log(_options.renderCount + " render");

    // 렌더링 후에 부수효과 실행
    const pendingEffects = _options.pendingEffects;
    _options.pendingEffects = [];
    for (const run of pendingEffects) {
      run();
    }
  });

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
   * @returns {[any, (newValue:any)=>void]} 상태 값과 상태 변경 함수 반환
   * @example {
   *  const [count, setCount] = useState(0);
   * }
   */
  const useState = (initialValue) => {
    const { states, currentStateKey: key } = _options;
    // 초기 상태 설정
    if (states.length === key) {
      if (typeof initialValue === "function") {
        states.push(initialValue());
      } else {
        states.push(initialValue);
      }
    }
    // 현재 상태와 상태 변경 함수 반환
    const state = states[key];
    const setState = (newValue) => {
      if (typeof newValue === "function") {
        states[key] = newValue(states[key]);
      } else {
        states[key] = newValue;
      }
      _render();
    };
    // 다음 상태 키로 이동
    _options.currentStateKey++;

    return [state, setState];
  };

  // @TODO : 여러 위치에서 useEffect 호출 시 문제 발생하는지 테스트 필요
  // @TODO : 여러 위치에서 useEffect 호출 시 별도 effectKey 관리
  /**
   * 부수효과 관리 훅, 렌더링 이후 실행
   * @param {function} effect
   * @param {any[]} deps
   * @example
   * useEffect(() => {
   *  console.log("useEffect called");
   *  return () => {
   *   console.log("cleanup called");
   *  }
   * },[depsArray]);
   */
  const useEffect = (effect, deps) => {
    const { effectDeps, effectCleanups, currentEffectKey: key } = _options;

    const prevDeps = effectDeps[key];
    const hasNoDeps = deps === undefined;
    const nextDeps = deps ?? null;

    let isChanged = true;
    if (!hasNoDeps && prevDeps) {
      isChanged = nextDeps.some((dep, i) => {
        console.log(dep, prevDeps[i]);
        return !Object.is(dep, prevDeps[i]);
      });
    }

    effectDeps[key] = nextDeps;
    if (isChanged) {
      _options.pendingEffects.push(() => {
        const prevCleanup = effectCleanups[key];
        if (typeof prevCleanup === "function") {
          prevCleanup();
        }

        const cleanup = effect();
        effectCleanups[key] = typeof cleanup === "function" ? cleanup : undefined;
      });
    }
  };

  return {
    render,
    useState,
    useEffect,
  };
}

export const { render, useState, useEffect } = MyReact();
