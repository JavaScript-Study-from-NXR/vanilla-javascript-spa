import { renderCategoryList } from "../components/common/CategoryFilterList";
import { fetchProductList } from "../pages/ProductsPage";

//중복 바인딩 방지 (이벤트 여러번 동작하는 것 방지)
let isBound = false;

export function bindProductFilterEvents() {
  if (isBound) return;
  isBound = true;

  document.addEventListener("change", (e) => {
    // limit
    if (e.target.id === "limit-select") {
      const params = new URLSearchParams(window.location.search);
      params.set("limit", e.target.value);
      params.set("page", "1");

      history.pushState(null, "", `?${params.toString()}`);
      fetchProductList();
      return;
    }

    // sort
    if (e.target.id === "sort-select") {
      const params = new URLSearchParams(window.location.search);
      params.set("sort", e.target.value);
      params.set("page", "1");

      history.pushState(null, "", `?${params.toString()}`);
      fetchProductList();
    }
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-category1]");
    if (!btn) return;

    const params = new URLSearchParams(window.location.search);

    // 1depth 카테고리 세팅
    params.set("category1", btn.dataset.category1);
    params.set("page", "1");

    // 2depth 카테고리 세팅
    if (btn.dataset.category2) {
      params.set("category2", btn.dataset.category2);
    } else {
      // 1depth를 클릭하면 category2 제거
      params.delete("category2");
    }

    history.pushState(null, "", `?${params.toString()}`);
    //상품 목록, 카테고리 리스트 재렌더
    fetchProductList();
    renderCategoryList();
  });
}
