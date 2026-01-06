function CartButton(productId) {
  return `
  <!-- 장바구니 버튼 -->
  <button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
          hover:bg-blue-700 transition-colors add-to-cart-btn" data-product-id="${productId}">
    장바구니 담기
  </button>
  `;
}

export { CartButton };
