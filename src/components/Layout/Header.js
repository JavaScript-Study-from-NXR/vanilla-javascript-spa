import { useEffect, useState } from "../../core/MyReact";
import { CButton, Logo } from "../_common";
import { Icon } from "../assets/icons";

export function Header() {
  const [isDetailPage, setIsDetailPage] = useState("header-is-detail-page", false);
  useEffect(() => {
    const pathname = window.location.pathname;
    const pathCompo = pathname.slice(1).split("/");
    if (pathCompo.length === 2 && pathCompo[0] === "product") {
      setIsDetailPage(true);
    } else {
      setIsDetailPage(false);
    }
  }, [window.location.pathname]);
  return `
  <header class="bg-white shadow-sm sticky top-0 z-40">
    <div class="max-w-md mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        ${
          isDetailPage
            ? `
        <div class="flex items-center space-x-3">
          ${CButton({
            type: "button",
            children: Icon.BackArrow(),
            onClick: "window.history.back()",
            className: "p-2 text-gray-700 hover:text-gray-900 transition-colors",
          })}
            
            <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
          </div>
        `
            : Logo()
        }
        <div class="flex items-center space-x-2">
          <!-- 장바구니 아이콘 -->
          <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
            ${Icon.Cart()}
          </button>
        </div>
      </div>
    </div>
  </header>
  `;
}
