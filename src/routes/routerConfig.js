import { routes } from "./index.js";

// 라우터 설정
export const setupRoutes = (router) => {
  routes.forEach((route) => {
    if (route.path === "*") {
      // 404 라우트
      router.setNotFound(route.handler);
    } else {
      // 일반 라우트
      router.addRoute(route.path, route.handler);
    }
  });
};
