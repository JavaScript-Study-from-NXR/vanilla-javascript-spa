import ProductList from "../components/products/ProductList";
import SearchAndFilterSection from "../components/products/SearchAndFilterSection";
import { getProducts } from "../api/productApi";
import ProductListSkeleton from "../components/skeleton/ProductListSkeleton";
import ErrorPage from "./ErrorPage";

const getProductsPage = (data) => `
<main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        ${SearchAndFilterSection()}
        <!-- 상품 목록 -->
        <div class="mb-6">
          ${ProductList(data)}
        </div>
      </main>
`;
export default async function ProductsPage() {
  async function fetchProductList() {
    const container = document.getElementById("products-container");
    if (!container) return;
    try {
      const data = await getProducts();
      // 데이터 로딩이 완료되면 html 교체
      container.innerHTML = getProductsPage(data);
    } catch {
      container.innerHTML = ErrorPage();
    }
  }

  //DOM이 다 그려진 후에 fetchProductList르ㄹ실행하도록 ..
  // -> 그 전에 실행되면 id="products-container"를 못찾음
  setTimeout(fetchProductList, 0);
  return `
    <div class="min-h-screen bg-gray-50" id="products-container">
      ${ProductListSkeleton()}
    </div>
  `;
}
