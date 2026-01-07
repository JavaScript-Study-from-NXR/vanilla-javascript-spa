import { createStore } from "../core/store.js";

// UI 상태 관련 스토어
const uiStore = createStore({
  currentRoute: null,
});

// UI 상태 관련 액션
export const uiActions = {
  // 현재 라우트 설정
  setCurrentRoute(route) {
    uiStore.setState({ currentRoute: route });
  },
};

export default uiStore;
