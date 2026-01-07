import { router } from "./router";

export function navigation() {
  // 헤더의 버튼을 클릭했을 때 이벤트 실행
  document.addEventListener("click", (e) => {
    // data-navigate라는 커스텀 속성을 만들어서 사용
    const target = e.target.closest("[data-navigate]");
    if (!target) return;
    // back 버튼을 클릭했을 때
    if (target.dataset.navigate === "back") {
      history.back();
    } else if (target.dataset.navigate === "detail") {
      if (e.target.closest("#add-to-cart-btn")) return;
      history.pushState(null, "", `product/${target.dataset.productId}`);
      router();
    } else {
      // 주소를 교체 해준다
      history.pushState(null, "", target.dataset.navigate);
      router();
    }
  });

  //breadcrumb
  document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-breadcrumb-index]");
    if (!target) return;
    //1번 인덱스->category1
    if (target.dataset.breadcrumbIndex === "1") {
      history.pushState(null, "", `/products?category1=${target.dataset.breadcrumbName}`);
      router();
    }
  });

  //popstate 이벤트가 발생했을 때 router 호출
  window.addEventListener("popstate", () => {
    router();
  });
}
