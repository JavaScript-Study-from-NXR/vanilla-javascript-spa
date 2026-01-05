export default function AddCartButton(size) {
  //size : large, small (default)
  if (size === "large") {
    return `<button id="add-to-cart-btn" data-product-id="85067212996" class="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
                 hover:bg-blue-700 transition-colors font-medium">
              장바구니 담기
            </button>`;
  }
  return `
  <button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
                         hover:bg-blue-700 transition-colors add-to-cart-btn" data-product-id="86940857379">
                    장바구니 담기
                  </button>
  `;
}
