import appStore, { appActions } from "../store/index.js";
import { getProduct } from "../api/productApi.js";
import { showToast } from "../utils/toast.js";
import { getQueryParams } from "../utils/queryParams.js";

// 쿼리 파라미터 빌드
const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      searchParams.set(key, value);
    }
  });
  return searchParams.toString();
};

// 쿼리 파라미터 업데이트
export const createUpdateQueryParam = (router) => {
  return (updates) => {
    const params = getQueryParams();
    Object.assign(params, updates);
    router.push(`/?${buildQueryString(params)}`);
  };
};

// 상품 카드에서 장바구니 추가
export const handleAddToCartFromCard = async (productId) => {
  try {
    const state = appStore.getState();
    let product = state.products.find((p) => p.productId === productId);

    if (!product) {
      product = await getProduct(productId);
    }

    if (product) {
      appActions.addToCart(product, 1);
      console.log("장바구니에 추가되었습니다!");
    }
  } catch (error) {
    console.error("장바구니 추가 실패:", error);
    showToast("상품을 장바구니에 추가하는데 실패했습니다", "error");
  }
};

// 상세페이지 수량 감소
export const handleQuantityDecrease = () => {
  const input = document.querySelector("#quantity-input");
  if (input) {
    const currentValue = parseInt(input.value, 10);
    if (currentValue > parseInt(input.min, 10)) {
      input.value = currentValue - 1;
    }
  }
};

// 상세페이지 수량 증가
export const handleQuantityIncrease = () => {
  const input = document.querySelector("#quantity-input");
  if (input) {
    const currentValue = parseInt(input.value, 10);
    const maxValue = parseInt(input.max, 10);
    if (currentValue < maxValue) {
      input.value = currentValue + 1;
    }
  }
};

// 상세페이지에서 장바구니 추가
export const handleAddToCart = async (target) => {
  const productId = target.dataset.productId;
  const quantityInput = document.querySelector("#quantity-input");
  const quantity = quantityInput ? parseInt(quantityInput.value, 10) : 1;

  console.log(`장바구니에 상품 추가: ${productId}, 수량: ${quantity}`);

  try {
    const state = appStore.getState();
    let product = state.detailProduct?.productId === productId ? state.detailProduct : null;

    if (!product) {
      product = await getProduct(productId);
    }

    if (product) {
      appActions.addToCart(product, quantity);
      console.log("장바구니에 추가되었습니다!");
    }
  } catch (error) {
    console.error("장바구니 추가 실패:", error);
  }
};

// 클릭 이벤트 핸들러 설정 (분리하면 좋음 컴포넌트 안에서 관리할 수 있게)
export const setupClickHandlers = (router, updateQueryParam) => {
  document.addEventListener("click", (e) => {
    const handlers = [
      {
        selector: ".category1-filter-btn",
        handler: (target) =>
          updateQueryParam({
            category1: target.dataset.category1,
            category2: "",
          }),
      },
      {
        selector: ".category2-filter-btn",
        handler: (target) => updateQueryParam({ category2: target.dataset.category2 }),
      },
      {
        selector: '[data-breadcrumb="all"]',
        handler: () => updateQueryParam({ category1: "", category2: "" }),
      },
      {
        selector: '[data-breadcrumb="category1"]',
        handler: (target) =>
          updateQueryParam({
            category1: target.dataset.value,
            category2: "",
          }),
      },
      {
        selector: ".add-to-cart-btn",
        handler: async (target, e) => {
          e.stopPropagation();
          const productId = target.dataset.productId;
          await handleAddToCartFromCard(productId);
        },
      },
      {
        selector: ".product-card",
        handler: (target) => {
          const productId = target.dataset.productId;
          if (productId) {
            router.push(`/product/${productId}`);
          }
        },
      },
      {
        selector: ".related-product-card",
        handler: (target) => {
          const productId = target.dataset.productId;
          if (productId) {
            router.push(`/product/${productId}`);
          }
        },
      },
      {
        selector: ".go-to-product-list",
        handler: () => {
          router.push("/");
        },
      },
      {
        selector: ".breadcrumb-link",
        handler: (target) => {
          const category1 = target.dataset.category1;
          const category2 = target.dataset.category2;
          if (category2) {
            router.push(`/?category1=${category1}&category2=${category2}`);
          } else if (category1) {
            router.push(`/?category1=${category1}`);
          }
        },
      },
      {
        selector: "#quantity-decrease",
        handler: () => handleQuantityDecrease(),
      },
      {
        selector: "#quantity-increase",
        handler: () => handleQuantityIncrease(),
      },
      {
        selector: "#add-to-cart-btn",
        handler: (target) => handleAddToCart(target),
      },
      {
        selector: "#cart-icon-btn",
        handler: () => appActions.openCartModal(),
      },
      {
        selector: "#cart-modal-close-btn",
        handler: () => appActions.closeCartModal(),
      },
      {
        selector: "#cart-modal-select-all-checkbox",
        handler: (target) => {
          if (target.checked) {
            appActions.selectAllCart();
          } else {
            appActions.deselectAllCart();
          }
        },
      },
      {
        selector: ".cart-item-checkbox",
        handler: (target) => appActions.toggleCartSelection(target.dataset.productId),
      },
      {
        selector: ".cart-item-image",
        handler: (target) => {
          appActions.closeCartModal();
          router.push(`/product/${target.dataset.productId}`);
        },
      },
      {
        selector: ".cart-item-title",
        handler: (target) => {
          appActions.closeCartModal();
          router.push(`/product/${target.dataset.productId}`);
        },
      },
      {
        selector: ".quantity-decrease-btn",
        handler: (target) => {
          const productId = target.dataset.productId;
          const state = appStore.getState();
          const item = state.cart.find((i) => i.productId === productId);
          if (item && item.quantity > 1) {
            appActions.updateCartQuantity(productId, item.quantity - 1);
          }
        },
      },
      {
        selector: ".quantity-increase-btn",
        handler: (target) => {
          const productId = target.dataset.productId;
          const state = appStore.getState();
          const item = state.cart.find((i) => i.productId === productId);
          if (item) {
            appActions.updateCartQuantity(productId, item.quantity + 1);
          }
        },
      },
      {
        selector: ".cart-item-remove-btn",
        handler: (target) => appActions.removeCartItem(target.dataset.productId),
      },
      {
        selector: "#cart-modal-remove-selected-btn",
        handler: () => appActions.removeSelectedCartItems(),
      },
      {
        selector: "#cart-modal-clear-cart-btn",
        handler: () => appActions.clearCart(),
      },
      {
        selector: "#cart-modal-checkout-btn",
        handler: () => {
          alert("구매하기 기능은 준비 중입니다!");
        },
      },
    ];

    for (const { selector, handler } of handlers) {
      const target = e.target.closest(selector);
      if (target) {
        handler(target, e);
        return;
      }
    }
  });
};

// Change 이벤트 핸들러 설정
export const setupChangeHandlers = (updateQueryParam) => {
  document.addEventListener("change", (e) => {
    const changeHandlers = {
      "limit-select": (value) => updateQueryParam({ limit: value }),
      "sort-select": (value) => updateQueryParam({ sort: value }),
    };

    const handler = changeHandlers[e.target.id];
    if (handler) {
      handler(e.target.value);
    }
  });
};

// Keypress 이벤트 핸들러 설정
export const setupKeypressHandlers = (updateQueryParam) => {
  document.addEventListener("keypress", (e) => {
    if (e.target.id === "search-input" && e.key === "Enter") {
      const searchValue = e.target.value.trim();
      updateQueryParam({ search: searchValue });
    }
  });
};

// Keydown 이벤트 핸들러 설정
export const setupKeydownHandlers = () => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const state = appStore.getState();
      if (state.cartModalOpen) {
        appActions.closeCartModal();
      }
    }
  });
};
