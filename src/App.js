import { createRouter, setupLinkHandler } from "./core/router.js";
import { setupRoutes } from "./routes/routerConfig.js";
import { initEventBus } from "./managers/eventBusManager.js";
import { setupCartModal } from "./managers/cartModalManager.js";
import {
  setupClickHandlers,
  setupChangeHandlers,
  setupKeypressHandlers,
  setupKeydownHandlers,
  createUpdateQueryParam,
} from "./handlers/eventHandlers.js";

// 전역 이벤트 위임 설정
const setupGlobalEventDelegation = (router) => {
  const updateQueryParam = createUpdateQueryParam(router);

  setupClickHandlers(router, updateQueryParam);
  setupChangeHandlers(updateQueryParam);
  setupKeypressHandlers(updateQueryParam);
  setupKeydownHandlers();
};

// 앱 초기화
export const initApp = () => {
  const router = createRouter();

  // 라우터 설정
  setupRoutes(router);
  setupLinkHandler(router);

  // 전역 이벤트 설정
  setupGlobalEventDelegation(router);

  // 장바구니 모달 설정
  setupCartModal();

  // 이벤트 버스 초기화
  initEventBus();

  // 라우터 시작
  router.start();
};
