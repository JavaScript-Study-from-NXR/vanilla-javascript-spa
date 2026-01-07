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
  const detailCounter = btn.closest(".product-detail-counter");

  // cart 페이지
  if (cartItem) {
    const input = cartItem.querySelector("#quantity-input");
    const value = Number(input.value);

    if (value > 1) input.value = value - 1;

    // cartStore.updateQuantity(...)
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
  const detailCounter = btn.closest(".product-detail-counter");

  // cart 페이지
  if (cartItem) {
    const input = cartItem.querySelector("#quantity-input");
    const value = Number(input.value);

    input.value = value + 1;

    // cartStore.updateQuantity(...)
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
