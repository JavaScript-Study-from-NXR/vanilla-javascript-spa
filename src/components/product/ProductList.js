import ErrorState from "../common/ErrorState";
import LoadingSpinner from "../common/LoadingSpinner";
import ProductCardSkeleton from "../common/ProductCardSkeleton";
import ProductCard from "./ProductCard";

export default function ProductList({ loading, error, products }) {
  if (loading) {
    return /*html*/ `
      <div class="mb-6">
        <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
          ${Array.from({ length: 4 })
            .map(() => ProductCardSkeleton())
            .join("")}
        </div>
        ${LoadingSpinner({ message: "상품을 불러오는 중..." })}
      </div>
    `;
  }
  if (error) {
    return /*html*/ `
      <div class="mb-6">
        ${ErrorState({
          description: error.message || "네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요.",
        })}
      </div>
    `;
  }
  return /*html*/ `
    <div class="mb-6">
      <div>
        <div class="mb-4 text-sm text-gray-600">
          총 <span class="font-medium text-gray-900">${products.length}</span>의 상품
        </div>
        <!-- 상품 그리드 -->
        <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
        ${products.map((product) => ProductCard({ product })).join("")}
        </div>
        <div class="text-center py-4 text-sm text-gray-500">모든 상품을 확인했습니다</div>
      </div>
    </div>
  `;
}
