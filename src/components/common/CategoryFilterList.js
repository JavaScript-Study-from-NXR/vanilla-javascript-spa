import BreadCrumb from "./BreadCrumb";

export default function CategoryFilterList(categories) {
  const category1List = Object.keys(categories);
  const params = Object.fromEntries(new URLSearchParams(window.location.search));
  function getBreadcrumbItems() {
    const items = ["전체"];

    if (params.category1) {
      items.push(params.category1);
    }

    if (params.category2) {
      items.push(params.category2);
    }

    return items;
  }

  function getCategoryButtonClass(category) {
    if (params.category2 === category) {
      return "category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-blue-100 border-blue-300 text-blue-800";
    }
    return "category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50";
  }

  function getCategory2List() {
    return Object.keys(categories[params.category1]);
  }

  function renderCategoryList() {
    const container = document.getElementById("category-container");
    // 선택된 카테고리가 없을 때 :depth 1 보여주기
    if (!params.category1 && !params.category2) {
      //1depth 카테고리
      container.innerHTML = category1List
        .map(
          (
            category,
          ) => `<button data-navigate="/products?category1=${encodeURIComponent(category)}" data-category1="${category}" class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
        ${category}
        </button>`,
        )
        .join("");
    }

    //2depth 카테고리
    container.innerHTML = getCategory2List()
      .map(
        (
          category,
        ) => `<button data-navigate="/products?category1=${encodeURIComponent(params.category1)}&category2=${encodeURIComponent(category)}" data-category1="${category}" class="${getCategoryButtonClass(category)}">
        ${category}
      </button>`,
      )
      .join("");
    return;
  }

  setTimeout(renderCategoryList, 0);

  return `
  <div class="space-y-2" >
    <div class="flex items-center gap-2">
      <label class="text-sm text-gray-600">카테고리:</label>
      ${BreadCrumb(getBreadcrumbItems())}
    </div>
    <!-- 카테고리 -->
    <div class="flex flex-wrap gap-2" id="category-container">
    </div>
  </div>
  `;
}
//      <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
