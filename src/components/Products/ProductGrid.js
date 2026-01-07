import { ProductItem } from "./ProductItem";
import { Link, ROUTE_ADDRESS } from "../../routes";
import { useEffect, useState } from "../../core/MyReact";
import { getProducts } from "../../api/productApi";
import { ProductCounts } from "./ProductCounts";
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
 *
 */

/**
 * 상품 아이템 그리드 컴포넌트
 * @param {Product[]} products
 * @param {} params
 * @returns {string} HTML 문자열
 */
export function ProductGrid({ params = { limit: 20, search: "", category1: "", category2: "", sort: "price_asc" } }) {
  const [products, setProdcuts] = useState("product-grid-products", []);
  const [pagination, setPagination] = useState("product-grid-pagination", {
    page: 1,
    limit: 20,
    total: 0,
    totalPage: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [isLoading, setIsLoading] = useState("product-grid-is-loading", false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts(params);
      const { products, pagination } = data;
      setProdcuts(products);
      setPagination(pagination);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return `
  <!-- 상품 개수 정보 -->
    ${isLoading ? "" : ProductCounts({ productCount: pagination.total })}
  <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
    ${products
      .map((product) =>
        Link({
          to: ROUTE_ADDRESS.productDetail(product.productId),
          children: ProductItem(product),
          className: "",
        }),
      )
      .join("\n")}
      ${
        pagination?.hasNext
          ? ""
          : `<div class="text-center py-4 text-sm text-gray-500">
          모든 상품을 확인했습니다
        </div>`
      }
  </div>
  `;
}
