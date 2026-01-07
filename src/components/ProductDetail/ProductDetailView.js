import { useEffect, useState } from "../../core/MyReact";
import { BreadScrumb, CButton } from "../_common";
import { ROUTE_ADDRESS } from "../../routes";
import { Icon } from "../assets/icons";
import { CartButton } from "../Cart";
import { ProductRating } from ".";

/**
 * @typedef {Object} Product
 * @property {string} title
 * @property {string} link
 * @property {string[]} images
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
 */
function ProductDetailView({ product }) {
  const BreadScrumbItems = [
    CButton({
      mode: "link",
      to: ROUTE_ADDRESS.home,
      className: "breadcrumb-link",
      children: "홈",
    }),
    CButton({
      mode: "link",
      to: `${ROUTE_ADDRESS.home}?category1=${product.category1}`,
      className: "breadcrumb-link",
      children: product.category1,
    }),
    CButton({
      mode: "link",
      to: `${ROUTE_ADDRESS.home}?category1=${product.category1}&category2=${product.category2}`,
      className: "breadcrumb-link",
      children: product.category2,
    }),
  ];

  const [quantity, setQuantity] = useState("detail-quantity", 1);

  const handleQuantityChange = (e) => {
    const target = e.target.closest("[data-quantity]");
    if (!target) return;
    const action = target.dataset.quantity;
    if (action === "increase") {
      setQuantity((prev) => Math.min(prev + 1, Number(product.stock)));
      return;
    }
    if (action === "decrease") {
      setQuantity((prev) => Math.max(prev - 1, 1));
      return;
    }
  };
  const handleQuantityChangeFromInput = (e) => {
    const target = e.target.closest("#quantity-input");
    const value = Number(target.value);

    if (isNaN(value)) return;
    if (value < 1) {
      target.value = 1;
      setQuantity(1);
      return;
    }
    if (value > product.stock) {
      // target.value = product.stock;
      setQuantity(product.stock);
      return;
    }
    setQuantity(value);
  };

  useEffect(() => {
    window.addEventListener("click", handleQuantityChange);
    // window.addEventListener("input", handleQuantityChangeFromInput);
    window.addEventListener("change", handleQuantityChangeFromInput);
    // window.addEventListener("click", handleAddToCart);
    return () => {
      window.removeEventListener("click", handleQuantityChange);
      // window.removeEventListener("input", handleQuantityChangeFromInput);
      window.removeEventListener("change", handleQuantityChangeFromInput);
      // window.removeEventListener("click", handleAddToCart);
    };
  }, []);

  return `
    <!-- 브레드크럼 -->
    <nav class="mb-4">
    ${BreadScrumb({
      items: BreadScrumbItems,
      className: "flex items-center space-x-2 text-sm text-gray-600 mb-6 cursor-pointer",
      separator: Icon.RightArrow(),
    })}
    </nav>
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
              "data-quantity": "decrease",
            })}
            <input type="number" value="${quantity}" id="quantity-input" min="1" max="${product.stock ?? 10}" data-quantity="input" class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 
              focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            ${CartButton({
              id: "quantity-increase",
              className:
                "w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100",
              children: Icon.Plus(),
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
          "data-product-quantity": quantity,
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
  `;
}

export { ProductDetailView };
