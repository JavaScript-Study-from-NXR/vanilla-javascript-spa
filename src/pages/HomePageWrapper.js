import { createLifecycleComponent } from "../utils/createLifecycleComponent.js";
import appStore from "../store/index.js";
import HomePage from "./HomePage.js";
import ProductList from "../components/product/ProductList.js";
import { getQueryParams } from "../utils/queryParams.js";
import { setupInfiniteScroll } from "../managers/infiniteScrollManager.js";

// 이벤트 리스너 설정
const setupEventListeners = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const elements = {
    "#limit-select": urlParams.get("limit") || "20",
    "#sort-select": urlParams.get("sort") || "price_asc",
    "#search-input": urlParams.get("search") || "",
  };

  Object.entries(elements).forEach(([selector, value]) => {
    const element = document.querySelector(selector);
    if (element) {
      element.value = value;
    }
  });
};

// ProductList 업데이트
const updateProductList = (state) => {
  const productListContainer = document.querySelector(".mb-6");

  if (productListContainer) {
    productListContainer.outerHTML = ProductList({
      loading: state.loading,
      error: state.error,
      products: state.products,
      totalCount: state.totalCount,
      isInfiniteScrolling: state.isInfiniteScrolling,
      hasMore: state.hasMore,
    });
  }
};

// 홈페이지 컴포넌트 생성
export const createHomePageComponent = () => {
  let unsubscribe = null;
  let infiniteScroll = null;
  const initialState = appStore.getState();
  let previousLoading = initialState.loading;
  let previousError = initialState.error;
  let previousIsInfiniteScrolling = initialState.isInfiniteScrolling;
  let previousProducts = initialState.products;
  let previousCartCount = initialState.cartCount;

  return createLifecycleComponent(
    {
      mount: () => {
        setupEventListeners();
        infiniteScroll = setupInfiniteScroll();

        unsubscribe = appStore.subscribe((state) => {
          if (state.currentRoute !== "home") return;

          if (
            state.loading !== previousLoading ||
            state.error !== previousError ||
            state.cartCount !== previousCartCount
          ) {
            previousLoading = state.loading;
            previousError = state.error;
            previousCartCount = state.cartCount;
            document.querySelector("#root").innerHTML = render();
            setupEventListeners();

            if (infiniteScroll) {
              infiniteScroll.stop();
            }
            infiniteScroll = setupInfiniteScroll();
            return;
          }

          const isInfiniteScrollingChanged = state.isInfiniteScrolling !== previousIsInfiniteScrolling;
          const isProductsChanged = state.products !== previousProducts;

          if (isInfiniteScrollingChanged || isProductsChanged) {
            previousIsInfiniteScrolling = state.isInfiniteScrolling;
            previousProducts = state.products;

            updateProductList(state);

            if (infiniteScroll) {
              infiniteScroll.stop();
              infiniteScroll.start();
            }
          }
        });
      },

      unmount: () => {
        if (infiniteScroll) {
          infiniteScroll.stop();
          infiniteScroll = null;
        }
        if (unsubscribe) {
          unsubscribe();
        }
      },
    },
    render,
  );

  function render() {
    const state = appStore.getState();
    const params = getQueryParams();
    const category2List =
      params.category1 && state.categories[params.category1] ? Object.keys(state.categories[params.category1]) : [];

    return HomePage({
      loading: state.loading,
      error: state.error,
      products: state.products,
      categories: state.categories,
      selectedCategory1: params.category1,
      selectedCategory2: params.category2,
      category2List,
      totalCount: state.totalCount,
      isInfiniteScrolling: state.isInfiniteScrolling,
      hasMore: state.hasMore,
      cartCount: state.cartCount,
    });
  }
};
