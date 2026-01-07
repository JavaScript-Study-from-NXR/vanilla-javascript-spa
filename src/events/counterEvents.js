export function initCounterEvents() {
  document.addEventListener("click", (e) => {
    const decreaseBtn = e.target.closest("#quantity-decrease");
    const increaseBtn = e.target.closest("#quantity-increase");

    if (decreaseBtn) handleDecrease(decreaseBtn);
    if (increaseBtn) handleIncrease(increaseBtn);
  });
}

function handleDecrease(btn) {
  const cartItem = btn.closest(".cart-item");
  const productId = cartItem.dataset.productId;
  const detailCounter = btn.closest(".product-detail-counter");

  // cart 페이지
  if (cartItem) {
    const input = cartItem.querySelector("#quantity-input");
    const value = Number(input.value);
    const nextValue = value - 1;
    input.value = nextValue;

    if (value > 1) input.value = value - 1;

    //로컬 스토리지에서 개수 수정
    updateCartQuantity(productId, nextValue);

    return;
  }

  // detail 페이지
  if (detailCounter) {
    const input = detailCounter.querySelector("#quantity-input");
    const value = Number(input.value);

    if (value > 1) input.value = value - 1;
    return;
  }
}

function handleIncrease(btn) {
  const cartItem = btn.closest(".cart-item");
  const productId = cartItem.dataset.productId;

  const detailCounter = btn.closest(".product-detail-counter");

  // cart 페이지
  if (cartItem) {
    const input = cartItem.querySelector("#quantity-input");
    const value = Number(input.value);
    const nextValue = value + 1;
    input.value = nextValue;

    //로컬 스토리지에서 개수 수정
    updateCartQuantity(productId, nextValue);
    return;
  }

  // detail 페이지
  if (detailCounter) {
    const input = detailCounter.querySelector("#quantity-input");
    const value = Number(input.value);

    input.value = value + 1;
    return;
  }
}

function updateCartQuantity(productId, nextQuantity) {
  console.log("ddd");
  const raw = localStorage.getItem("cart");
  if (!raw) return;

  const cart = JSON.parse(raw);

  const target = cart.find((item) => item.productId === productId);
  if (!target) return;

  target.quantity = nextQuantity;

  localStorage.setItem("cart", JSON.stringify(cart));
}
