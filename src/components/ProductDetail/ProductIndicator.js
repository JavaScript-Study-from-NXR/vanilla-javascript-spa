import { Icon } from "../assets/icons";

/**
 * 상품 로딩 인디케이터 컴포넌트
 * @param {string} loadText
 * @returns {string} HTML 문자열
 */
function ProductIndicator(loadText = "상품을 불러오는 중...") {
  return `
  <div class="text-center py-4">
    <div class="inline-flex items-center">
      ${Icon.Loading()}
      <span class="text-sm text-gray-600">${loadText}</span>
    </div>
  </div>
  `;
}

export { ProductIndicator };
