// SPA 라우팅을 위한 라우터
export const createRouter = () => {
  const routes = [];
  let notFoundHandler = null;

  // BASE_PATH 가져오기 (Vite에서 설정한 base)
  // 끝의 / 제거하여 정규화
  const BASE_PATH = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

  // pathname에서 BASE_PATH 제거 (경로 가져오기)
  const getRouterPath = (pathname) => {
    if (BASE_PATH === "" || !pathname.startsWith(BASE_PATH)) {
      return pathname;
    }
    const path = pathname.slice(BASE_PATH.length);
    return path || "/";
  };

  // URL과 라우트 매칭
  const matchRoute = (pathname) => {
    const routerPath = getRouterPath(pathname); // ex. /product/123

    for (const route of routes) {
      const matches = routerPath.match(route.regex);

      if (matches) {
        const params = {};
        route.paramNames.forEach((name, i) => {
          params[name] = matches[i + 1];
        });
        return { handler: route.handler, params };
      }
    }
    return null;
  };

  // 라우트 변경 처리
  const handleRouteChange = () => {
    const matchedRoute = matchRoute(window.location.pathname);

    if (matchedRoute) {
      matchedRoute.handler(matchedRoute.params);
    } else if (notFoundHandler) {
      notFoundHandler();
    }
  };

  // 뒤로가기/앞으로가기 대응
  window.addEventListener("popstate", handleRouteChange);

  return {
    // 라우트 등록
    addRoute: (path, handler) => {
      // 라우트 등록 시점에 정규식과 파라미터 이름을 미리 전처리
      const paramNames = [];
      const pattern = path.replace(/:(\w+)/g, (_, name) => {
        paramNames.push(name);
        return "([^/]+)";
      });
      const regex = new RegExp(`^${pattern}$`);

      routes.push({ path, handler, regex, paramNames });
    },

    // 404 핸들러 등록
    setNotFound: (handler) => {
      notFoundHandler = handler;
    },

    // 페이지 이동
    push: (path) => {
      // BASE_PATH를 포함한 전체 경로로 변환
      const fullPath = BASE_PATH === "" ? path : BASE_PATH + path;
      window.history.pushState(null, "", fullPath);
      handleRouteChange();
    },

    // 라우터 시작
    start: () => {
      handleRouteChange();
    },
  };
};

// 링크 클릭 이벤트를 라우터로 연결하는 헬퍼
export const setupLinkHandler = (router) => {
  document.addEventListener("click", (e) => {
    // data-link 속성이 있는 요소만 처리
    const link = e.target.closest("[data-link]");

    if (link) {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (href) {
        router.push(href);
      }
    }
  });
};
