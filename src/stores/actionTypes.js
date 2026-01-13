/** 상품 관련 액션 타입들 */
// 도메인 + 상태변화 구조

export const PRODUCT_ACTIONS = {
  SET_PRODUCTS: "products/setProducts",
  ADD_PRODUCTS: "products/addProducts",
  SET_LOADING: "products/setLoading",
  SET_ERROR: "products/setError",

  // 카테고리
  SET_CATEGORIES: "products/setCategories",

  // 상품 상세
  SET_CURRENT_PRODUCT: "products/setCurrentProduct",
  SET_RELATED_PRODUCTS: "products/setRelatedProducts",

  // 리셋
  RESET_FILTERS: "products/resetFilters",
  SETUP: "products/setup",

  // status 관리
  SET_STATUS: "products/setStatus",
};

export const CART_ACTIONS = {
  // 기본 crud
  ADD_ITEM: "cart/addItem",
  REMOVE_ITEM: "cart/removeItem",
  UPDATE_QUANTITY: "cart/updateQuantity",
  CLEAR_CART: "cart/clearCart",
};
