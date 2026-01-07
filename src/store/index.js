import { createEventBus } from "../core/eventBus.js";
import productStore, { productActions } from "./productStore.js";
import cartStore, { cartActions } from "./cartStore.js";
import uiStore, { uiActions } from "./uiStore.js";

// 글로벌 이벤트 버스
export const eventBus = createEventBus();

// 통합 스토어 - 모든 스토어의 상태를 결합
export const appStore = {
  // 모든 스토어의 상태를 결합하여 반환
  getState() {
    return {
      ...productStore.getState(),
      ...cartStore.getState(),
      ...uiStore.getState(),
    };
  },

  // 모든 스토어에 대한 구독 설정
  subscribe(listener) {
    const unsubscribeProduct = productStore.subscribe(() => {
      listener(this.getState());
    });

    const unsubscribeCart = cartStore.subscribe(() => {
      listener(this.getState());
    });

    const unsubscribeUi = uiStore.subscribe(() => {
      listener(this.getState());
    });

    // 모든 구독 해제 함수 반환
    return () => {
      unsubscribeProduct();
      unsubscribeCart();
      unsubscribeUi();
    };
  },

  // 디버깅용 - 개별 스토어 접근
  stores: {
    product: productStore,
    cart: cartStore,
    ui: uiStore,
  },
};

// 통합 액션 - 이벤트 버스를 포함한 모든 액션
export const appActions = {
  // 상품 관련 액션
  startLoading() {
    productActions.startLoading();
  },

  setProducts(products, pagination) {
    productActions.setProducts(products, pagination);
  },

  appendProducts(newProducts, pagination) {
    const result = productActions.appendProducts(newProducts, pagination);
    eventBus.emit("products:appended", result);
  },

  setError(error) {
    const result = productActions.setError(error);
    eventBus.emit("error", result);
  },

  setCategories(categories) {
    productActions.setCategories(categories);
  },

  resetProducts() {
    productActions.resetProducts();
  },

  startInfiniteScroll() {
    productActions.startInfiniteScroll();
  },

  startDetailLoading() {
    productActions.startDetailLoading();
  },

  setDetailProduct(product, relatedProducts) {
    const result = productActions.setDetailProduct(product, relatedProducts);
    eventBus.emit("detail:loaded", result);
  },

  setDetailError(error) {
    const result = productActions.setDetailError(error);
    eventBus.emit("error", result);
  },

  // 장바구니 관련 액션
  addToCart(product, quantity) {
    const result = cartActions.addToCart(product, quantity);
    eventBus.emit("cart:added", result);
  },

  openCartModal() {
    cartActions.openCartModal();
  },

  closeCartModal() {
    cartActions.closeCartModal();
  },

  toggleCartSelection(productId) {
    cartActions.toggleCartSelection(productId);
  },

  selectAllCart() {
    cartActions.selectAllCart();
  },

  deselectAllCart() {
    cartActions.deselectAllCart();
  },

  updateCartQuantity(productId, quantity) {
    cartActions.updateCartQuantity(productId, quantity);
  },

  removeCartItem(productId) {
    const result = cartActions.removeCartItem(productId);
    eventBus.emit("cart:removed", result);
  },

  removeSelectedCartItems() {
    const result = cartActions.removeSelectedCartItems();
    eventBus.emit("cart:removed", result);
  },

  clearCart() {
    cartActions.clearCart();
    eventBus.emit("cart:cleared");
  },

  // UI 관련 액션
  setCurrentRoute(route) {
    uiActions.setCurrentRoute(route);
  },
};

export default appStore;
