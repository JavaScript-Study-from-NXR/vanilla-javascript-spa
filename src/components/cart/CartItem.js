import Counter from "../common/Counter";

export default function CartItem() {
  return `
  <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="85067212996">
    <!-- 선택 체크박스 -->
    <label class="flex items-center mr-3">
      <input type="checkbox" checked="" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
    focus:ring-blue-500" data-product-id="85067212996">
    </label>
    <!-- 상품 이미지 -->
    <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
      <img src="https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg" alt="PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="85067212996">
    </div>
    <!-- 상품 정보 -->
    <div class="flex-1 min-w-0">
      <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="85067212996">
        PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장
      </h4>
      <p class="text-sm text-gray-600 mt-1">
        220원
      </p>
      <!-- 수량 조절 -->
      ${Counter({ size: "m" })}
      
    </div>
    <!-- 가격 및 삭제 -->
    <div class="text-right ml-3">
      <p class="text-sm font-medium text-gray-900">
        440원
      </p>
      <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="85067212996">
        삭제
      </button>
    </div>
  </div>`;
}
