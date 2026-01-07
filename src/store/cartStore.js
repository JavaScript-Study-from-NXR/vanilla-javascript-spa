import { createStore } from "../core/store.js";
import { cartStorage } from "../utils/localStorage.js";

// 로컬스토리지에서 초기 장바구니 데이터 로드
const initialCart = cartStorage.getCart();
const initialCartCount = cartStorage.getCartCount();

// 장바구니 관련 스토어
const cartStore = createStore({
  cart: initialCart, // { productId, name, price, image, quantity }
  cartCount: initialCartCount,
  cartModalOpen: false,
  cartSelectedIds: [],
});

// 장바구니 관련 액션
export const cartActions = {
  // 장바구니에 추가
  addToCart(product, quantity = 1) {
    const state = cartStore.getState();
    const existingItem = state.cart.find((item) => item.productId === product.productId);

    let newCart;
    if (existingItem) {
      // 이미 있으면 수량 증가
      newCart = state.cart.map((item) =>
        item.productId === product.productId ? { ...item, quantity: item.quantity + quantity } : item,
      );
    } else {
      // 없으면 새로 추가
      newCart = [
        ...state.cart,
        {
          productId: product.productId,
          name: product.title,
          price: product.lprice,
          image: product.image,
          quantity,
        },
      ];
    }

    cartStore.setState({
      cart: newCart,
      cartCount: newCart.length,
    });

    // 로컬스토리지에 저장
    cartStorage.setCart(newCart);

    return { productId: product.productId, quantity };
  },

  // 장바구니 모달 열기
  openCartModal() {
    cartStore.setState({ cartModalOpen: true });
  },

  // 장바구니 모달 닫기
  closeCartModal() {
    cartStore.setState({ cartModalOpen: false, cartSelectedIds: [] });
  },

  // 장바구니 항목 선택 토글
  toggleCartSelection(productId) {
    const state = cartStore.getState();
    const isSelected = state.cartSelectedIds.includes(productId);

    cartStore.setState({
      cartSelectedIds: isSelected
        ? state.cartSelectedIds.filter((id) => id !== productId)
        : [...state.cartSelectedIds, productId],
    });
  },

  // 전체 선택
  selectAllCart() {
    const state = cartStore.getState();
    const allIds = state.cart.map((item) => item.productId);
    cartStore.setState({ cartSelectedIds: allIds });
  },

  // 전체 선택 해제
  deselectAllCart() {
    cartStore.setState({ cartSelectedIds: [] });
  },

  // 수량 변경
  updateCartQuantity(productId, quantity) {
    const state = cartStore.getState();
    const newCart = state.cart.map((item) =>
      item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
    );

    cartStore.setState({ cart: newCart });

    // 로컬스토리지에 저장
    cartStorage.setCart(newCart);
  },

  // 항목 삭제
  removeCartItem(productId) {
    const state = cartStore.getState();
    const newCart = state.cart.filter((item) => item.productId !== productId);

    cartStore.setState({
      cart: newCart,
      cartCount: newCart.length,
      cartSelectedIds: state.cartSelectedIds.filter((id) => id !== productId),
    });

    // 로컬스토리지에 저장
    cartStorage.setCart(newCart);

    return { productId };
  },

  // 선택 항목 삭제
  removeSelectedCartItems() {
    const state = cartStore.getState();
    const selectedCount = state.cartSelectedIds.length;
    const newCart = state.cart.filter((item) => !state.cartSelectedIds.includes(item.productId));

    cartStore.setState({
      cart: newCart,
      cartCount: newCart.length,
      cartSelectedIds: [],
    });

    // 로컬스토리지에 저장
    cartStorage.setCart(newCart);

    return { count: selectedCount };
  },

  // 전체 비우기
  clearCart() {
    cartStore.setState({
      cart: [],
      cartCount: 0,
      cartSelectedIds: [],
    });

    // 로컬스토리지에서 제거
    cartStorage.clearCart();
  },
};

export default cartStore;
