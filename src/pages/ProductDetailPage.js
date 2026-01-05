import { getProduct, getProducts } from "../api/productApi";
import AddCartButton from "../components/button/AddCartButton";
import RelatedProducts from "../components/productDetail.js/RelatedProducts";
import RouteToProductListButton from "../components/productDetail.js/RouteToProductListButton";
import Counter from "../components/common/Counter";
import BreadCrumb from "../components/common/BreadCrumb";
import Rating from "../components/common/Rating";
import productDetailSkeleton from "../components/skeleton/ProductDetailSkeleton";
import ErrorPage from "./ErrorPage";

const getDetailPage = (data, relatedItems) => `
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 브레드크럼 -->
        <nav class="mb-4">
        ${BreadCrumb(["홈", data.category1, data.category2])}
        </nav>
        <!-- 상품 상세 정보 -->
        <div class="bg-white rounded-lg shadow-sm mb-6">
          <!-- 상품 이미지 -->
          <div class="p-4">
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img src=${data.image} alt=${data.title} class="w-full h-full object-cover product-detail-image">
            </div>
            <!-- 상품 정보 -->
            <div>
              <p class="text-sm text-gray-600 mb-1"></p>
              <h1 class="text-xl font-bold text-gray-900 mb-3">${data.title}</h1>
              <!-- 평점 및 리뷰 -->
              <div class="flex items-center mb-3">
                ${Rating(data.rating)}
                <span class="ml-2 text-sm text-gray-600">${data.rating.toFixed(1)} (${data.reviewCount}개 리뷰)</span>
              </div>
              <!-- 가격 -->
              <div class="mb-4">
                <span class="text-2xl font-bold text-blue-600">${data.lprice}</span>
              </div>
              <!-- 재고 -->
              <div class="text-sm text-gray-600 mb-4">
                재고 ${data.stock}개
              </div>
              <!-- 설명 -->
              <div class="text-sm text-gray-700 leading-relaxed mb-6">
              ${data.description}
              </div>
            </div>
          </div>
          <!-- 수량 선택 및 액션 -->
          <div class="border-t border-gray-200 p-4">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-medium text-gray-900">수량</span>
              ${Counter()}
            </div>
            <!-- 액션 버튼 -->
            ${AddCartButton("large")}
          </div>
        </div>
        <!-- 상품 목록으로 이동 -->
        <div class="mb-6">
          ${RouteToProductListButton()}
        </div>
        <!-- 관련 상품 -->
        <!--category2를 기준으로 관련 상품 찾기-->
        ${RelatedProducts(relatedItems)}
      </main>
  `;

export default function ProductDetailPage(id) {
  async function fetchProductDetail() {
    const container = document.getElementById("product-detail-container");
    if (!container) return;
    try {
      const data = await getProduct(id);

      const relatedItemsResponse = await getProducts({
        category1: data.category1,
        category2: data.category2,
        limit: 4,
      });
      const relatedItems = relatedItemsResponse.products
        .filter((item) => item.productId !== data.productId)
        .slice(0, 2);
      // 데이터 로딩이 완료되면 html 교체
      container.innerHTML = getDetailPage(data, relatedItems);
    } catch (e) {
      console.log(e);
      container.innerHTML = ErrorPage();
    }
  }
  setTimeout(fetchProductDetail, 0);

  return `<div class="min-h-screen bg-gray-50" id="product-detail-container">
  ${productDetailSkeleton()}
  </div>`;
}
