import { RouteConfig } from ".";
import { useState, useEffect } from "../core/MyReact";

function Routers(configs) {
  /**
   * 경로 변경 이벤트 추가 함수
   * @param {()=>void} pathChangeCallback
   */
  const _addEventPathnameChange = (pathChangeCallback) => {
    const _originPushRouter = history.pushState;
    const _originReplaceRouter = history.replaceState;

    const _pathnameChangeEvent = "pathNameChange";

    const _notifyRouteChange = () => {
      window.dispatchEvent(new Event(_pathnameChangeEvent));
    };

    history.pushState = function (...args) {
      _originPushRouter.apply(this, args);
      _notifyRouteChange();
    };

    history.replaceState = function (...args) {
      _originReplaceRouter.apply(this, args);
      _notifyRouteChange();
    };

    window.removeEventListener("popstate", _notifyRouteChange);
    window.addEventListener("popstate", _notifyRouteChange);
    window.removeEventListener(_pathnameChangeEvent, pathChangeCallback);
    window.addEventListener(_pathnameChangeEvent, pathChangeCallback);
  };

  /**
   * 라우터 이동 함수
   * @param {string} path - 이동할 경로
   */
  const _routerPush = (path) => {
    if (path === window.location.pathname) return;
    history.pushState({}, "", path);
  };

  // const _routerReplace = (path) => {
  //   if (path === window.location.pathname) return;
  //   window.history.replaceState({}, "", path);
  // };

  /**
   * 현재 경로에 맞는 컴포넌트를 가져오는 함수
   * @returns {Promise<string>} - 경로에 맞는 컴포넌트
   */
  const _getComponentByPathname = async () => {
    const pathname = window.location.pathname;
    const pathComponents = pathname.slice(1).replace("index.html", "").split("/");
    const matchedPath = Object.keys(configs).find((path) => {
      const configCompos = path.slice(1).split("/");
      if (configCompos.length !== pathComponents.length) {
        return false;
      }

      return configCompos.every((c, i) => {
        if (c.startsWith("{") && c.endsWith("}")) {
          return true;
        }
        if (c === pathComponents[i]) {
          return true;
        }
        return false;
      });
    });

    const _loadedComponent = configs[matchedPath] || configs["/404"];
    try {
      const rendingComponnt = await _loadedComponent();
      return rendingComponnt;
    } catch (e) {
      console.error("getComponentByPathname error:", e);
      return `<div>${e}</div>`;
    }
  };

  // @TODO(completed) async issue: need to fix async loading component issue
  /**
   * 라우터 컴포넌트, 경로에 맞는 컴포넌트 렌더링
   * @returns {string} - 렌더링할 컴포넌트
   */
  const RouteMain = () => {
    const [renderComponent, setRenderComponent] = useState(() => () => "");
    // const renderState = {
    //   renderComponent: "",
    // }
    // const renderComponentState = new Proxy();
    const _changePathnameCallback = async () => {
      const component = await _getComponentByPathname();
      setRenderComponent(() => component);
    };
    useEffect(() => {
      console.log("useEffect run");
      _changePathnameCallback();
      return () => {};
    }, []);
    _addEventPathnameChange(_changePathnameCallback);

    return renderComponent();
  };

  /**
   * 라우터 이동 컴포넌트
   * @param {string} to - 이동할 경로
   * @param {string} children - 링크 텍스트 또는 HTML
   * @param {string} className - 링크에 적용할 class
   * @returns {string} - 생성된 앵커 태그의 HTML 문자열
   */
  const Link = (to, children, className = "") => {
    const _clickLink = () => {
      _routerPush(to);
    };
    window._clickLink = _clickLink;
    return `
    <a class="${className}" onclick="_clickLink()">
    ${children}
    </a>
    `;
  };

  return {
    RouteMain,
    Link,
  };
}

export const { RouteMain, Link } = Routers(RouteConfig);
