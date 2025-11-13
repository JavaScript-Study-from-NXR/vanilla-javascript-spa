export function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    limit: Number(params.get("limit")) || 20,
    sort: params.get("sort") || "price_asc",
    search: params.get("search") || "",
    category1: params.get("category1") || "",
    category2: params.get("category2") || "",
    page: Number(params.get("page")) || 1,
  };
}

export function updateQueryParams(newParams) {
  const BASE_URL = import.meta.env.BASE_URL || "/";
  const params = new URLSearchParams(window.location.search);
  Object.entries(newParams).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });

  // BASE_PATH를 제외한 경로 가져오기
  let pathname = window.location.pathname;
  if (BASE_URL !== "/" && pathname.startsWith(BASE_URL)) {
    pathname = pathname.slice(BASE_URL.length) || "/";
  }

  const newUrl = `${BASE_URL === "/" ? pathname : BASE_URL.replace(/\/$/, "") + pathname}?${params.toString()}`;
  window.history.pushState({}, "", newUrl);
}
