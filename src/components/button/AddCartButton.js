export default function AddCartButton(size = "small") {
  const isLarge = size === "large";

  const sizeClass = isLarge ? "w-full py-3 px-4 text-base font-medium" : "w-full py-2 px-3 text-sm";

  return `
    <button
      id="add-to-cart-btn"
      class="bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${sizeClass}"
    >
      장바구니 담기
    </button>
  `;
}
