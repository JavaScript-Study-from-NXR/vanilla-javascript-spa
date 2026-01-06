import { Link, ROUTE_ADDRESS } from "../../routes";

function Logo() {
  return `
  <h1 class="text-xl font-bold text-gray-900">
    ${Link({
      to: ROUTE_ADDRESS.home,
      children: "쇼핑몰",
      className: "",
    })}
  </h1>
  `;
}

export { Logo };
