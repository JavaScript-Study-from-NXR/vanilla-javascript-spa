import { createHomePageComponent } from "../pages/HomePageWrapper.js";
import { createDetailPageComponent } from "../pages/DetailPageWrapper.js";
import NotFoundPage from "../pages/NotFoundPage.js";
import { appActions } from "../store/index.js";
import { loadHomePageData, loadDetailPageData } from "../services/productService.js";

// 현재 페이지 컴포넌트와 요청 ID 관리
let currentPageComponent = null;
let currentRequestId = 0;

export const routes = [
  {
    path: "/",
    name: "home",
    handler: async () => {
      if (currentPageComponent?.destroy) {
        currentPageComponent.destroy();
      }

      appActions.setCurrentRoute("home");
      currentPageComponent = createHomePageComponent();
      document.querySelector("#root").innerHTML = currentPageComponent.render();

      currentRequestId++;
      await loadHomePageData(currentRequestId, () => currentRequestId);
    },
  },
  {
    path: "/product/:id",
    name: "detail",
    handler: async (params) => {
      if (currentPageComponent?.destroy) {
        currentPageComponent.destroy();
      }

      appActions.startDetailLoading();
      appActions.setCurrentRoute("detail");
      currentPageComponent = createDetailPageComponent();
      document.querySelector("#root").innerHTML = currentPageComponent.render();

      await loadDetailPageData(params.id);
    },
  },
  {
    path: "*",
    name: "notFound",
    handler: () => {
      if (currentPageComponent?.destroy) {
        currentPageComponent.destroy();
      }

      appActions.setCurrentRoute("404");
      document.querySelector("#root").innerHTML = NotFoundPage();
    },
  },
];
