import { createInfiniteScroll } from "../core/infiniteScroll.js";
import appStore, { appActions } from "../store/index.js";
import { loadMoreProducts } from "../services/productService.js";

// 무한 스크롤 설정
export const setupInfiniteScroll = () => {
  const infiniteScroll = createInfiniteScroll({
    rootMargin: "100px",
    onLoadMore: async () => {
      const state = appStore.getState();

      if (!state.hasMore || state.isInfiniteScrolling) {
        return;
      }

      appActions.startInfiniteScroll();

      try {
        await loadMoreProducts(state.currentPage);
      } catch (error) {
        console.error("추가 상품 로드 실패:", error);
        // isInfiniteScrolling을 false로 설정 (에러 처리)
        appStore.stores.product.setState({ isInfiniteScrolling: false });
      }
    },
  });

  infiniteScroll.start();
  infiniteScroll.updateStatus({ hasMore: appStore.getState().hasMore });

  return infiniteScroll;
};
