export function addCartEvents() {
  document.addEventListener("click", (e) => {
    const cartButton = e.target.closest("#add-to-cart-btn");
    if (!cartButton) return;

    const detailPage = cartButton.closest("#product-detail-container");
    const productsPage = cartButton.closest(".product-card");
    if (detailPage) {
      //id 가져오기
      const pageContainer = document.getElementById("product-detail-container");
      const productId = pageContainer.dataset.productId;
      //수량 가져오기
      const counterButton = document.querySelector(".product-detail-counter");
      const input = counterButton.querySelector("#quantity-input");
      const quantity = Number(input.value);

      addToCart({ productId, quantity });
    }

    if (productsPage) {
      //페이지 이동 동작 막기
      e.stopPropagation();
      //id 가져오기
      const productId = productsPage.dataset.productId;
      console.log(productId);

      addToCart({ productId, quantity: 1 });
    }
  });
}

function addToCart({ productId, quantity }) {
  const raw = localStorage.getItem("cart");
  const cart = raw ? JSON.parse(raw) : [];

  const existing = cart.find((item) => item.productId === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
