import { createStore } from "../core/store.js";

// 상품 관련 스토어
const productStore = createStore({
  // 상품 목록
  products: [],
  loading: false,
  error: null,

  // 카테고리
  categories: {},

  // 무한스크롤
  currentPage: 1,
  hasMore: true,
  totalCount: 0,
  isInfiniteScrolling: false,

  // 상세페이지
  detailProduct: null,
  detailLoading: false,
  detailError: null,
  relatedProducts: [],
});

// 상품 관련 액션
export const productActions = {
  // 로딩 시작
  startLoading() {
    productStore.setState({ loading: true, error: null, products: [] });
  },

  // 상품 설정 (첫 로드)
  setProducts(products, pagination = {}) {
    productStore.setState({
      products,
      loading: false,
      error: null,
      totalCount: pagination.total || 0,
      hasMore: pagination.hasNext || false,
      currentPage: pagination.page || 1,
      isInfiniteScrolling: false,
    });
  },

  // 상품 추가 (무한스크롤)
  appendProducts(newProducts, pagination = {}) {
    const state = productStore.getState();
    productStore.setState({
      products: [...state.products, ...newProducts],
      hasMore: pagination.hasNext || false,
      currentPage: pagination.page || state.currentPage + 1,
      isInfiniteScrolling: false,
      totalCount: pagination.total || state.totalCount,
    });

    return {
      count: newProducts.length,
      total: pagination.total,
    };
  },

  // 에러 설정
  setError(error) {
    productStore.setState({
      loading: false,
      error,
      isInfiniteScrolling: false,
    });

    return { message: error.message || "오류가 발생했습니다" };
  },

  // 카테고리 설정
  setCategories(categories) {
    productStore.setState({ categories });
  },

  // 상태 초기화 (필터 변경 시)
  resetProducts() {
    productStore.setState({
      products: [],
      currentPage: 1,
      hasMore: true,
      totalCount: 0,
    });
  },

  // 무한스크롤 시작
  startInfiniteScroll() {
    productStore.setState({ isInfiniteScrolling: true });
  },

  // 상세페이지 로딩 시작
  startDetailLoading() {
    productStore.setState({
      detailLoading: true,
      detailError: null,
      detailProduct: null,
      relatedProducts: [],
    });
  },

  // 상세페이지 데이터 설정
  setDetailProduct(product, relatedProducts = []) {
    productStore.setState({
      detailProduct: product,
      relatedProducts,
      detailLoading: false,
      detailError: null,
    });

    return { productId: product.productId };
  },

  // 상세페이지 에러 설정
  setDetailError(error) {
    productStore.setState({
      detailLoading: false,
      detailError: error,
      detailProduct: null,
    });

    return { message: error.message || "상품 정보를 불러올 수 없습니다" };
  },
};

export default productStore;
