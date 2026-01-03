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
      history.pushState(null, "", `product/${target.dataset.productId}`);
      router();
    } else {
      // 주소를 교체 해준다
      history.pushState(null, "", target.dataset.navigate);
      router();
    }
  });

  //popstate 이벤트가 발생했을 때 router 호출
  window.addEventListener("popstate", () => {
    router();
  });
}
