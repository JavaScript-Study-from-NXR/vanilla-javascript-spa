import { Icon } from "../components/assets/icons";
import { Link, ROUTE_ADDRESS } from "../routes";
import { ProductRating } from "../components/ProductDetail";
import { BreadScrumb, CButton } from "../components/_common";
import Products from "../mocks/items.json";
import { useEffect, useState } from "../core/MyReact";

/**
 * @typedef {Object} Product
 * @property {string} title
 * @property {string} link
 * @property {string[]} images
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

function ProductDetail() {
  console.log("ProductDetail 렌더링");
  const productId = window.location.pathname.split("/").pop();
  const product = Products.find((item) => item.productId === productId);

  const relatedProducts = Products.filter((prod) => {
    return prod.category1 === product.category1 && prod.productId !== productId;
  });

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const target = e.target.closest("[data-quantity]");
    if (!target) return;
    const action = target.dataset.quantity;
    if (action === "increase") {
      setQuantity((prev) => Math.min(prev + 1, product.stock || 10));
      return;
    }
    if (action === "decrease") {
      setQuantity((prev) => Math.max(prev - 1, 1));
      return;
    }
    if (action === "input") {
      const value = parseInt(e.target.value, 10);
      if (isNaN(value)) return;
      if (value < 1) return;
      if (value > product.stock) return;
      setQuantity(value);
    }
  };

  const handleAddToCart = (e) => {
    const target = e.target.closest("#add-to-cart-btn");
    if (!target) return;
    const prodId = target.dataset.productId;
    console.log(`상품 ID: ${prodId} 을(를) ${quantity}개 장바구니에 담았습니다.`);
  };

  useEffect(() => {
    window.addEventListener("click", handleQuantityChange);
    window.addEventListener("click", handleAddToCart);
    return () => {
      window.removeEventListener("click", handleQuantityChange);
      window.removeEventListener("click", handleAddToCart);
    };
  }, [quantity]);

  const BreadScrumbItems = {
    홈: ROUTE_ADDRESS.home,
    "생활/건강": `${ROUTE_ADDRESS.home}?category1=생활%2F건강`,
    건강식품: `${ROUTE_ADDRESS.home}?category1=생활%2F건강&category2=건강식품`,
  };

  return `
  <main class="max-w-md mx-auto px-4 py-4">
  <!-- 브레드크럼 -->
    ${BreadScrumb({
      items: BreadScrumbItems,
      className: "flex items-center space-x-2 text-sm text-gray-600 mb-6 cursor-pointer",
    })}
    <!-- 상품 상세 정보 -->
    <div class="bg-white rounded-lg shadow-sm mb-6">
      <!-- 상품 이미지 -->
      <div class="p-4">
        <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
          <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover product-detail-image">
        </div>
        <!-- 상품 정보 -->
        <div>
          <p class="text-sm text-gray-600 mb-1">${product.brand || ""}</p>
          <h1 class="text-xl font-bold text-gray-900 mb-3">${product.title}</h1>
          <!-- 평점 및 리뷰 -->
          <div class="flex items-center mb-3">
            <div class="flex items-center">
              ${ProductRating(product.rating)}
            </div>
            <span class="ml-2 text-sm text-gray-600">${Number(product.rating || 0).toFixed(1)} (${product.reviewCount || 0}개 리뷰)</span>
          </div>
          <!-- 가격 -->
          <div class="mb-4">
            <span class="text-2xl font-bold text-blue-600">${Number(product.lprice).toLocaleString()}원</span>
          </div>
          <!-- 재고 -->
          <div class="text-sm text-gray-600 mb-4">
            재고 ${product.stock || 0}개
          </div>
          <!-- 설명 -->
          <div class="text-sm text-gray-700 leading-relaxed mb-6">
            ${product.description || ""}
          </div>
        </div>
      </div>
      <!-- 수량 선택 및 액션 -->
      <div class="border-t border-gray-200 p-4">
        <div class="flex items-center justify-between mb-4">
          <span class="text-sm font-medium text-gray-900">수량</span>
          <div class="flex items-center" >
            ${CButton({
              id: "quantity-decrease",
              className:
                "w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100",
              children: Icon.Minus(),
              // onClick: "decreaseQuantity()",
              "data-quantity": "decrease",
            })}
            <input type="number" value="${quantity}" id="quantity-input" min="1" max="${product.stock ?? 10}" data-quantity="input" class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 
              focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            ${CButton({
              id: "quantity-increase",
              className:
                "w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100",
              children: Icon.Plus(),
              // onClick: "increaseQuantity()",
              "data-quantity": "increase",
            })}
          </div>
        </div>
        <!-- 액션 버튼 -->
        ${CButton({
          id: "add-to-cart-btn",
          children: "장바구니 담기",
          className:
            "w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium",
          "data-product-id": product.productId,
        })}
      </div>
    </div>
    <!-- 상품 목록으로 이동 -->
    <div class="mb-6">
    ${CButton({
      mode: "link",
      to: ROUTE_ADDRESS.home,
      className:
        "block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition-colors go-to-product-list",
      children: "상품 목록으로 돌아가기",
    })}
      
    </div>
    <!-- 관련 상품 -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
        <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
      </div>
      <div class="p-4">
        <div class="grid grid-cols-2 gap-3 responsive-grid">
          ${
            relatedProducts.length > 0
              ? relatedProducts
                  .map((prod) =>
                    Link({
                      to: ROUTE_ADDRESS.productDetail(prod.productId),
                      children: RelatedProductCard({ product: prod }),
                      className: "",
                    }),
                  )
                  .join("")
              : `<p class="text-sm text-gray-600 col-span-2">관련 상품이 없습니다.</p>`
          }
        </div>
      </div>
    </div>
  </main>
  `;
}

export default ProductDetail;

function RelatedProductCard({ product }) {
  return `
  <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="86940857379">
    <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
      <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover" loading="lazy">
    </div>
    <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">${product.title}</h3>
    <p class="text-sm font-bold text-blue-600">${Number(product.lprice).toLocaleString()}원</p>
  </div>
  `;
}
