import { RouteConfig } from ".";
import { useState, useEffect } from "../core/MyReact";

function Routers(configs) {
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

    window.removeEventListener(_pathnameChangeEvent, pathChangeCallback);
    window.addEventListener(_pathnameChangeEvent, pathChangeCallback);
  };

  const _routerPush = (path) => {
    if (path === window.location.pathname) return;
    window.history.pushState({}, "", path);
  };

  // const _routerReplace = (path) => {
  //   if (path === window.location.pathname) return;
  //   window.history.replaceState({}, "", path);
  // };

  const _getComponentByPathname = async () => {
    const pathname = window.location.pathname;
    const _loadedComponent = configs[pathname] || configs["/404"];
    try {
      const rendingComponnt = await _loadedComponent();
      return rendingComponnt;
    } catch (e) {
      console.error("getComponentByPathname error:", e);
      return `<div>${e}</div>`;
    }
  };

  // @TODO(completed) async issue: need to fix async loading component issue
  const RouteMain = () => {
    const [renderComponent, setRenderComponent] = useState("");

    useEffect(() => {
      const _changePathnameCallback = async () => {
        const component = await _getComponentByPathname();
        setRenderComponent(component);
      };
      _changePathnameCallback();
      _addEventPathnameChange(_changePathnameCallback);
    }, []);

    return renderComponent;
  };

  const Link = (to, children, className) => {
    const $a = document.createElement("a");
    $a.innerHTML = children;
    $a.classList.add(...className.split(" "));
    const _clickLink = (e) => {
      e.preventDefault();
      _routerPush(to);
    };
    $a.onclick = _clickLink;
    return $a.outerHTML;
  };

  return {
    RouteMain,
    Link,
  };
}

export const { RouteMain, Link } = Routers(RouteConfig);
