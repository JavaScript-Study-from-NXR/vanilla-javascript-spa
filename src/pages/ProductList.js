import { ProductCounts } from "../components/Products/ProductCounts";
import { ProductFilter } from "../components/Products/ProductFilter";
import { ProductGrid } from "../components/Products/ProductGrid";
import ProductData from "../mocks/items.json";

function ProductList() {
  return `
  <main class="max-w-md mx-auto px-4 py-4">
    ${ProductFilter()}
    <!-- 상품 목록 -->
    <div class="mb-6">
      <div>
        <!-- 상품 개수 정보 -->
        ${ProductCounts(340)}
        <!-- 상품 그리드 -->
        ${ProductGrid(ProductData)}
        <div class="text-center py-4 text-sm text-gray-500">
          모든 상품을 확인했습니다
        </div>
      </div>
    </div>
  </main>
  `;
}

export default ProductList;
