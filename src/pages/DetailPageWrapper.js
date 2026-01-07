import { createLifecycleComponent } from "../utils/createLifecycleComponent.js";
import appStore from "../store/index.js";
import DetailPage from "./DetailPage.js";

// 상세페이지 컴포넌트 생성
export const createDetailPageComponent = () => {
  let unsubscribe = null;
  const initialState = appStore.getState();
  let previousDetailLoading = initialState.detailLoading;
  let previousDetailError = initialState.detailError;
  let previousDetailProduct = initialState.detailProduct;
  let previousRelatedProducts = initialState.relatedProducts;
  let previousCartCount = initialState.cartCount;

  return createLifecycleComponent(
    {
      mount: () => {
        unsubscribe = appStore.subscribe((state) => {
          if (state.currentRoute !== "detail") return;

          const shouldRerender =
            state.detailLoading !== previousDetailLoading ||
            state.detailError !== previousDetailError ||
            state.detailProduct !== previousDetailProduct ||
            state.relatedProducts !== previousRelatedProducts ||
            state.cartCount !== previousCartCount;

          if (shouldRerender) {
            previousDetailLoading = state.detailLoading;
            previousDetailError = state.detailError;
            previousDetailProduct = state.detailProduct;
            previousRelatedProducts = state.relatedProducts;
            previousCartCount = state.cartCount;

            document.querySelector("#root").innerHTML = render();
          }
        });
      },

      unmount: () => {
        if (unsubscribe) {
          unsubscribe();
        }
      },
    },
    render,
  );

  function render() {
    const state = appStore.getState();
    return DetailPage({
      loading: state.detailLoading,
      error: state.detailError,
      product: state.detailProduct,
      relatedProducts: state.relatedProducts,
      cartCount: state.cartCount,
    });
  }
};
