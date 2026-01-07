import { Link, ROUTE_ADDRESS } from "../../routes";

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

function RelatedProducts({ relatedProducts }) {
  return `
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
  `;
}

export { RelatedProducts };
