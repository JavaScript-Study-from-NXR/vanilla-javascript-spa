import { eventBus } from "../store/index.js";
import { showToast } from "../utils/toast.js";

// 이벤트버스 초기화
export const initEventBus = () => {
  eventBus.on("products:appended", (data) => {
    console.log(`${data.count}개 상품 추가됨 (총 ${data.total}개)`);
  });

  eventBus.on("error", (data) => {
    console.error("에러 발생:", data.message);
    showToast(data.message || "오류가 발생했습니다", "error");
  });

  eventBus.on("detail:loaded", (data) => {
    console.log(`상품 상세 페이지 로드됨: ${data.productId}`);
  });

  eventBus.on("cart:added", (data) => {
    console.log(`장바구니에 추가됨: 상품 ID ${data.productId}, 수량 ${data.quantity}`);
    showToast("장바구니에 추가되었습니다", "success");
  });

  eventBus.on("cart:removed", (data) => {
    if (data.count) {
      console.log(`${data.count}개 상품이 장바구니에서 삭제됨`);
      showToast(`선택된 상품들이 삭제되었습니다 (${data.count}개)`, "info");
    } else {
      console.log(`상품 ID ${data.productId} 장바구니에서 삭제됨`);
      showToast("상품이 삭제되었습니다", "info");
    }
  });

  eventBus.on("cart:cleared", () => {
    console.log("장바구니 전체 비우기");
    showToast("장바구니를 비웠습니다", "info");
  });
};
