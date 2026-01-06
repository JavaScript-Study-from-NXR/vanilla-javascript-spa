/**
 * @typedef {Object} ButtonProps
 * @property {string} [mode] - 버튼 모드 (예: "link", "default" 등)
 * @property {string} [id] - 버튼의 고유 ID
 * @property {string} [type] - 버튼 타입 (예: 'button', 'submit', 'reset')
 * @property {string} [children] - 버튼 내부에 표시될 내용
 * @property {string} [onClick] - 클릭 이벤트 핸들러
 * @property {string} [className] - 버튼에 적용할 CSS 클래스
 * @property {string} [to] - 링크 모드일 경우 이동할 경로
 * @property {Object} [rest] - 기타 추가 속성들(예: data-*, aria-* 등)
 */

import { Link } from "../../routes";

/**
 * 버튼 공통 컴포넌트
 * @param {ButtonProps} ButtonProps
 * @returns
 */
function Button({ mode = "default", id, type, children = "", onClick = "", className = "", to = "", ...rest }) {
  switch (mode) {
    case "link":
      if (!to) {
        throw new Error("CButton: link 모드일 경우 to 속성이 필요합니다.");
      }
      return `
      ${Link({
        to,
        children,
        className,
        ...rest,
      })}
      `;
    case "default":
      return `
    <button ${type ? `type="${type}"` : ""}  ${className ? `class="${className}"` : ""} ${onClick ? `onclick="${onClick}"` : ""} ${id ? `id="${id}"` : ""} ${Object.entries(
      rest,
    )
      .map(([key, value]) => `${key}=${value}`)
      .join(" ")}>${children}</button>
    `;
    default:
      throw new Error(`CButton: 알 수 없는 mode 타입입니다. link, default만 가능 - ${mode}`);
  }
}

export { Button };
