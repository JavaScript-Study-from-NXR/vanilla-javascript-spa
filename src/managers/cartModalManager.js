import appStore, { appActions } from "../store/index.js";
import CartModal from "../components/CartModal.js";

// 장바구니 모달 렌더링
const renderCartModal = () => {
  const state = appStore.getState();
  const modalRoot = document.querySelector("#modal-root");

  if (!modalRoot) {
    const newModalRoot = document.createElement("div");
    newModalRoot.id = "modal-root";
    newModalRoot.className = "fixed inset-0 z-50 overflow-y-auto";
    newModalRoot.style.display = "none";
    document.body.appendChild(newModalRoot);
    return;
  }

  if (state.cartModalOpen) {
    modalRoot.style.display = "block";
    modalRoot.innerHTML = /*html*/ `
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity cart-modal-overlay" id="cart-modal-overlay"></div>
      ${CartModal({ items: state.cart, selectedIds: state.cartSelectedIds })}
    `;

    // 모달 오버레이 클릭 시 닫기
    const overlay = document.querySelector("#cart-modal-overlay");
    overlay?.addEventListener("click", () => appActions.closeCartModal());
  } else {
    modalRoot.style.display = "none";
    modalRoot.innerHTML = "";
  }
};

// 장바구니 모달 설정
export const setupCartModal = () => {
  // 초기 모달 루트 생성
  const modalRoot = document.createElement("div");
  modalRoot.id = "modal-root";
  modalRoot.className = "fixed inset-0 z-50 overflow-y-auto";
  modalRoot.style.display = "none";
  document.body.appendChild(modalRoot);

  // 장바구니 상태 변경 구독
  appStore.subscribe(() => {
    renderCartModal();
  });
};
