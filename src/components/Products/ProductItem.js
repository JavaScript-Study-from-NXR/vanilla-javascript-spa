import { CartButton } from "../Cart";

/**
 * @typedef {Object} Product
 * @property {string} title
 * @property {string} link
 * @property {string} image
 * @property {string} lprice
 * @property {string} hprice
 * @property {string} mallName
 * @property {string} productId
 * @property {string} productType
 * @property {string} mallName
 * @property {string} description
 * @property {string} rating
 * @property {string} reviewCount
 * @property {string} stock
 *
 */

/**
 * 상품 아이템 컴포넌트
 * @param {Product} product
 * @returns {string} HTML 문자열
 */
export function ProductItem(product) {
  return `
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
          data-product-id="${product.productId}">
    <!-- 상품 이미지 -->
    <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
      <img src="${product.image}"
            alt="${product.name}"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            loading="lazy">
    </div>
    <!-- 상품 정보 -->
    <div class="p-3">
      <div class="cursor-pointer product-info mb-3">
        <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
          ${product.title}
        </h3>
        <p class="text-xs text-gray-500 mb-2">${product.brand}</p>
        <p class="text-lg font-bold text-gray-900">
          ${Number(product.lprice).toLocaleString()}원
        </p>
      </div>
      <!-- 장바구니 버튼 -->
      ${CartButton({
        productId: product.productId,
        children: "장바구니 담기",
        "data-product-quantity": 1,
        "data-router-ignore": "true",
      })}
    </div>
  </div>
  `;
}
