// 전역 핸들러 저장소
// 이벤트 타입 -> 셀렉터 -> 핸들러 구조

const eventHandlers = {};

//  "click": {                                                       │
// │  ".add-to-cart-btn": handler1,                                  │
// │  "#cart-icon-btn": handler2,                                    │
// │  ".product-image": handler3,                                    │                                                   │
// │ },

// 전역 이벤트 처리 함수
const handleGlobalEvents = (e) => {
  const handlers = eventHandlers[e.type];
  if (!handlers) return;

  // 각 선택자에 대해 확인
  for (const [selector, handler] of Object.entries(handlers)) {
    const targetElement = e.target.closest(selector);
    // 일치하는 요소가 있으면 핸들러 실행
    if (targetElement) {
      try {
        handler(e);
      } catch (error) {
        console.error(error);
      }
    }
  }
};

// 전역 이벤트 리스너 등록 함수

export const registerGlobalEvents = () => {
  let initiallized = false;
  return () => {
    if (initiallized) {
      console.log("이미 이벤트 리스너가 등록되어 있습니다.");
      return;
    }
    console.log("이벤트 리스너 등록중");
    Object.keys(eventHandlers).forEach((eventType) => {
      document.body.addEventListener(eventType, handleGlobalEvents);
      console.log(`${eventType} 이벤트 리스너 등록됨`);
    });

    initiallized = true;
    console.log("이벤트 리스너 등록 완료");
  };
};

/**
 * 이벤트 위임을 통한 이벤트 핸들러 추가
 * @param {string} eventType - 이벤트 타입 (click. change등)
 * @param {string} selector - CSS 선택자
 * @param {Function} handler - 이벤트 핸들러 함수
 */

export const addEvent = (eventType, selector, handler) => {
  if (!eventHandlers[eventType]) {
    eventHandlers[eventType] = {};
  }

  // 일치하는 이벤트타입, 셀렉터에 핸들러 등록
  eventHandlers[eventType][selector] = handler;
  console.log(`이벤트 등록 : ${eventType} - ${selector}`);
};
