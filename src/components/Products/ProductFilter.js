import { getCategories } from "../../api/productApi";
import { useEffect, useState } from "../../core/MyReact";
import { useFetch } from "../../hooks";
import { ROUTE_ADDRESS } from "../../routes";
import { BreadScrumb, CButton } from "../_common";
import { Icon } from "../assets/icons";
import { ProductGrid } from "./ProductGrid";

export function ProductFilter() {
  // console.log(window.location.search);
  // 검색할 필터들 선언
  const [filterParams, setFilterParams] = useState("product-filter-params", () => {
    const { search } = window.location;
    const data = {
      limit: 20,
      category1: "",
      category2: "",
      search: "",
      sort: "price_asc",
    };
    if (search) {
      search
        .slice(1)
        .split("&")
        .forEach((d) => {
          const [key, value] = d.split("=");
          if (!(key in data)) return;
          data[key] = value;
        });
    }
    return data;
  });
  // 검색 입력창 관련
  // const [searchInput, setSearchInput] = useState("product-filter-search-input", "");

  // breadscrumb 관련
  const [bsItems] = useState("product-filter-bread-scrumb", [
    CButton({
      mode: "link",
      to: ROUTE_ADDRESS.home,
      className: "text-xs hover:text-blue-800 hover:underline",
      children: "전체",
      "data-breadscrumb": "reset",
    }),
  ]);
  const handleSearchInput = (e) => {
    // console.log("Search Input:", e);
    const target = e.target;
    // setSearchInput(target.value);

    const handleLocation = (newState) => {
      window.location.search =
        "?" +
        Object.entries(newState)
          .map(([key, value]) => `${key}=${value}`)
          .join("&");
    };

    if (target.id === "limit-select") {
      setFilterParams((prev) => {
        const newState = { ...prev, limit: target.selectedOptions[0].value };
        handleLocation(newState);
        return newState;
      });
      return;
    }
    if (target.id === "sort-select") {
      setFilterParams((prev) => {
        const newState = { ...prev, sort: target.selectedOptions[0].value };
        handleLocation(newState);
        return newState;
      });
      return;
    }
    if (target.id === "search-input") {
      setFilterParams((prev) => {
        const newState = { ...prev, search: target.value };
        handleLocation(newState);
        return newState;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("change", handleSearchInput);

    return () => {
      window.removeEventListener("change", handleSearchInput);
    };
  }, []);

  const { data: categories, isLoading: catLoading } = useFetch({
    key: "filter-category",
    defaultData: null,
    fetchFunc: () => getCategories(),
  });
  // console.log(bsItems);
  return `
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
    <!-- 검색창 -->
    <div class="mb-4">
      <div class="relative">
        <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="${filterParams.search}" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          ${Icon.Search({})}
        </div>
      </div>
    </div>
    <!-- 필터 옵션 -->
    <div class="space-y-3">
      <!-- 카테고리 필터 -->
      <div class="space-y-2">
      <div class="flex items-center gap-2">
      <label class="text-sm text-gray-600">카테고리:</label>
      ${BreadScrumb({
        items: bsItems ?? [],
        separator: `<span class="text-xs text-gray-500">&gt;</span>`,
      })}
        </div>
        <!-- 1depth 카테고리 -->
        <div class="flex flex-wrap gap-2">
        ${
          catLoading
            ? `<div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>`
            : Object.keys(categories ?? {})
                .map((c) =>
                  CButton({
                    mode: "default",
                    children: c,
                    className:
                      "category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50",
                    "data-category1": c,
                  }),
                )
                .join("\n")
        }
          
          </div>
        <!-- 2depth 카테고리 -->
      </div>
      <!-- 기존 필터들 -->
      <div class="flex gap-2 items-center justify-between">
        <!-- 페이지당 상품 수 -->
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-600">개수:</label>
          <select id="limit-select"
                  class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <option value="10" ${filterParams.limit == 10 ? 'selected=""' : ""}>
              10개
            </option>
            <option value="20" ${filterParams.limit == 20 ? 'selected=""' : ""}>
              20개
            </option>
            <option value="50" ${filterParams.limit == 50 ? 'selected=""' : ""}>
              50개
            </option>
            <option value="100" ${filterParams.limit == 100 ? 'selected=""' : ""}>
              100개
            </option>
          </select>
        </div>
        <!-- 정렬 -->
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-600">정렬:</label>
          <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                        focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <option value="price_asc" ${filterParams.sort === "price_asc" ? 'selected=""' : ""}>가격 낮은순</option>
            <option value="price_desc" ${filterParams.sort === "price_desc" ? 'selected=""' : ""}>가격 높은순</option>
            <option value="name_asc" ${filterParams.sort === "name_asc" ? 'selected=""' : ""}>이름순</option>
            <option value="name_desc" ${filterParams.sort === "name_desc" ? 'selected=""' : ""}>이름 역순</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <!-- 상품 목록 -->
    <div class="mb-6">
      <div>
        <!-- 상품 그리드 -->
        ${ProductGrid({ params: filterParams })}
      </div>
    </div>
  `;
}
