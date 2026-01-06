/**
 * 장바구니 아이콘
 * @param {number} productCount - 장바구니에 담긴 상품 개수
 * @returns 장바구니 아이콘 SVG 문자열
 */
function CartIcon(productCount = 0, className = "w-6 h-6") {
  return `
  <svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
  </svg>
  ${
    productCount > 0
      ? `<span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
      ${productCount}
    </span>`
      : ""
  }
  `;
}

export { CartIcon };
