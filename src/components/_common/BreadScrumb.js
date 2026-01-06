/**
 * @typedef {Object} BreadScrumbItems
 * @property {string} text - 항목 텍스트
 * @property {string} link - 항목 링크
 */
/**
 * @typedef {Object} BreadScrumbProps
 * @property {BreadScrumbItems[]} items - 항목 배열
 * @property {string} [separator] - 구분자
 * @property {string} [className] - 추가할 CSS 클래스
 * @property {Object} [rest] - 기타 추가 속성들(예: data-*, aria-* 등)
 */
/**
 * BreadCrumb 컴포넌트
 * @param {BreadScrumbProps} props
 * @returns {string} HTML 문자열
 */
import { CButton } from ".";
import { Icon } from "../assets/icons";

function BreadScrumb({ items, separator, className = "flex items-center space-x-2 text-sm text-gray-600", ...rest }) {
  return `
  <nav class="mb-4">
    <div class="${className}" 
      ${Object.entries(rest)
        .map(([key, value]) => `${key}=${value}`)
        .join(" ")}
    >
      ${Object.entries(items)
        .map(
          ([text, link]) => `
          ${CButton({
            mode: "link",
            to: link,
            className: "breadcrumb-link",
            children: text,
          })}
        `,
        )
        .join(`${separator ?? Icon.BackArrow()}`)}
    </div>
  </nav>
  `;
}

export { BreadScrumb };
