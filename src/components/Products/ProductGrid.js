import { ProductItem } from "./ProductItem";
import { Link, ROUTE_ADDRESS } from "../../routes";
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
 *
 */

/**
 * 상품 아이템 그리드 컴포넌트
 * @param {Product[]} products
 * @returns {string} HTML 문자열
 */
export function ProductGrid(products) {
  return `
  <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
    ${products.map((product) => Link(ROUTE_ADDRESS.productDetail(product.productId), ProductItem(product))).join("\n")}
  </div>
  `;
}
