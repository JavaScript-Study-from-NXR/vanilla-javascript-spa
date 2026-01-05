export default function BreadCrumb(list) {
  return `
    <div class="flex items-center space-x-2 text-sm text-gray-600">
      ${list
        .map(
          (item, index) => `
            ${
              index !== 0
                ? `
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                `
                : ""
            }

            ${
              index === 0
                ? `<div href="/products" data-navigate="/products" class="hover:text-blue-600 transition-colors cursor-pointer">
                    ${item}
                   </div>`
                : `<button
                    class="breadcrumb-link hover:text-blue-600 transition-colors"
                    data-breadcrumb-index="${index}"
                    data-breadcrumb-name="${item}"
                  
                  >
                    ${item}
                  </button>`
            }
          `,
        )
        .join("")}
    </div>
  `;
}
