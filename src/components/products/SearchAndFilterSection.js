import SearchBar from "../common/SearchBar";

import { getCategories } from "../../api/productApi";
import CategoryFilterList from "../common/CategoryFilterList";

export default function SearchAndFilterSection() {
  async function fetchCategories() {
    const container = document.getElementById("category-filter-container");
    if (!container) return;

    const categories = await getCategories();
    // const category1List = Object.keys(categories);
    container.innerHTML = CategoryFilterList(categories);
  }

  setTimeout(fetchCategories, 0);
  return `
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            <!-- 검색창 -->
            ${SearchBar()}
            <!-- 필터 옵션 -->
            <div class="space-y-3" >
              <!-- 카테고리 필터 -->
              <div id="category-filter-container"></div>
              <!-- 기존 필터들 -->
              <div class="flex gap-2 items-center justify-between">
                <!-- 페이지당 상품 수 -->
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">개수:</label>
                  <select id="limit-select"
                          class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option value="10">
                      10개
                    </option>
                    <option value="20" selected="">
                      20개
                    </option>
                    <option value="50">
                      50개
                    </option>
                    <option value="100">
                      100개
                    </option>
                  </select>
                </div>
                <!-- 정렬 -->
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">정렬:</label>
                  <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                               focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option value="price_asc" selected="">가격 낮은순</option>
                    <option value="price_desc">가격 높은순</option>
                    <option value="name_asc">이름순</option>
                    <option value="name_desc">이름 역순</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
  `;
}
