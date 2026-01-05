export const RouteConfig = {
  "/": () => import("../pages/ProductList").then((module) => module.default()),
  "/product/{productId}": () => import("../pages/ProductDetail").then((module) => module.default()),
  "/404": () => import("../pages/NotFound").then((module) => module.default()),
};
