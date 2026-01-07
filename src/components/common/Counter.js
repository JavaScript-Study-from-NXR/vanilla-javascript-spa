export default function Counter({ size = "l" } = {}) {
  const isM = size === "m";

  const buttonSize = isM ? "w-7 h-7" : "w-8 h-8";
  const iconSize = isM ? "w-3 h-3" : "w-4 h-4";
  const inputSize = isM ? "w-12 h-7 text-sm" : "w-16 h-8 text-sm";
  const marginTop = isM ? "mt-2" : "";

  return `
    <div class="flex items-center ${marginTop}">
      <button id="quantity-decrease"
        class="${buttonSize} flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100">
        <svg class="${iconSize}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
        </svg>
      </button>

      <input
        type="number"
        id="quantity-input"
        value="1"
        min="1"
        max="107"
        class="${inputSize} text-center border-t border-b border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />

      <button id="quantity-increase"
        class="${buttonSize} flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100">
        <svg class="${iconSize}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
    </div>
  `;
}
