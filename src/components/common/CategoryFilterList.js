import BreadCrumb from "./BreadCrumb";

function getParams() {
  return Object.fromEntries(new URLSearchParams(window.location.search));
}

let cachedCategories = null;

// 현재 params기준으로 breadcrumb item 세팅
function getBreadcrumbItems(params) {
  const items = ["전체"];
  if (params.category1) items.push(params.category1);
  if (params.category2) items.push(params.category2);
  return items;
}

function getCategoryButtonClass(isActive) {
  if (isActive) {
    return "category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-blue-100 border-blue-300 text-blue-800";
  }
  return "category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50";
}

// 선택한 카테고리 depth에 따라 다르게 렌더링
export function renderCategoryList() {
  if (!cachedCategories) return;

  const params = getParams();
  const container = document.getElementById("category-container");
  const breadcrumbContainer = document.getElementById("breadcrumb-container");

  if (breadcrumbContainer) {
    breadcrumbContainer.innerHTML = BreadCrumb(getBreadcrumbItems(params));
  }

  if (!container) return;

  // no selection -> show 1depth
  if (!params.category1 && !params.category2) {
    const category1List = Object.keys(cachedCategories);
    container.innerHTML = category1List
      .map(
        (category1) => `
          <button data-category1="${category1}" class="${getCategoryButtonClass(false)}">
            ${category1}
          </button>
        `,
      )
      .join("");
    return;
  }

  if (params.category1) {
    const category2Obj = cachedCategories[params.category1] || {};
    const category2List = Object.keys(category2Obj);

    container.innerHTML = category2List
      .map(
        (category2) => `
          <button
            data-category1="${params.category1}"
            data-category2="${category2}"
            class="${getCategoryButtonClass(params.category2 === category2)}"
          >
            ${category2}
          </button>
        `,
      )
      .join("");
  }
}

export default function CategoryFilterList(categories) {
  //카테고리 목록 캐시 (api 재호출 방지)
  cachedCategories = categories;
  setTimeout(renderCategoryList, 0);

  return `
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <label class="text-sm text-gray-600">카테고리:</label>
        <div id="breadcrumb-container">${BreadCrumb(getBreadcrumbItems(getParams()))}</div>
      </div>
      <!-- 카테고리 -->
      <div class="flex flex-wrap gap-2" id="category-container"></div>
    </div>
  `;
}
