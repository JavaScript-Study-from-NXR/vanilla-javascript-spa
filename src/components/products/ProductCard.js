import AddCartButton from "../button/AddCartButton";
export default function ProductCard(product) {
  const { brand, image, lprice, mallName, productId, title } = product;
  return `
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"  data-product-id="${productId}"
  data-navigate='detail'     
  data-product-id="${productId}">
    <!-- 상품 이미지 -->
    <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
      <img src=${image}
            alt=${title}
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            loading="lazy">
    </div>
    <!-- 상품 정보 -->
    <div class="p-3">
      <div class="cursor-pointer product-info mb-3">
        <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
          ${title}
        </h3>
        <p class="text-xs text-gray-500 mb-2">${brand || mallName}</p>
        <p class="text-lg font-bold text-gray-900">
          ${lprice}
        </p>
      </div>
      <!-- 장바구니 버튼 -->
      ${AddCartButton()}
    </div>
  </div>
              
  `;
}
